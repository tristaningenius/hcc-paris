import { gsap, Power1 } from 'gsap';
import { useState, useEffect, useRef } from 'react';
import { ResponsiveLoading } from '../global';
import { Icon } from 'components/elements';

export function LoyaltyCard({ customerEmail, customerIdNum }) {
  const [loyaltyPoint, setloyaltyPoint] = useState(0);
  const [loyaltyOptions, setLoyaltyOptions] = useState(null);
  const [loyaltyCode, setLoyaltyCode] = useState([]);
  const [pending, setPending] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const list = listRef.current;
    const expandArrow = expandArrowRef.current;
    if (collapsed) {
      gsap.to(expandArrow, {
        rotate: 0,
        duration: 0.3,
        ease: Power1.easeIn,
      });
      gsap.to(list, {
        height: 0,
        duration: 0.3,
        ease: Power1.easeIn,
      });
    } else {
      gsap.to(expandArrow, {
        rotate: 180,
        duration: 0.3,
        ease: Power1.easeIn,
      });
      gsap.to(list, {
        height: 'auto',
        duration: 0.3,
        ease: Power1.easeOut,
      });
    }
  }, [collapsed]);

  const listRef = useRef(null);
  const expandArrowRef = useRef(null);

  const baseUrl = 'https://loyalty.yotpo.com/api/v2/';
  const merchantAuth = 'guid=g7Y90zVqDos8wOqzMPKFrg&api_key=x4MgxmLlCGxChnDHCVpI1Qtt';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}customers?${merchantAuth}&customer_email=${customerEmail}&customer_external_id=${customerIdNum}&country_iso_code=null&with_referral_code=false&with_history=true`,
        options
      );
      const data = await response.json();
      setloyaltyPoint(data.points_balance);
    } catch (err) {
      console.error('error', err);
    }
  };

  const fetchRedemptionOptions = async () => {
    try {
      const response = await fetch(`${baseUrl}redemption_options?${merchantAuth}`, options);
      const data = await response.json();
      setLoyaltyOptions(data);
    } catch (err) {
      console.error('error', err);
    }
  };

  const redeemPoints = async (customerEmail, customerIdNum, redemptionId, index) => {
    setPending(index);
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    };

    try {
      const response = await fetch(
        `${baseUrl}redemptions?${merchantAuth}&customer_email=${customerEmail}&customer_external_id=${customerIdNum}&redemption_option_id=${redemptionId}`,
        options
      );
      const data = await response.json();
      const code = data.code;
      setLoyaltyCode([index, code]);
      setPending(null);
    } catch (err) {
      console.error('error', err);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [loyaltyCode]);

  useEffect(() => {
    fetchRedemptionOptions();
  }, []);

  return (
    <div className="w-full rounded-xl bg-secondary-600 p-4 text-tertiary-100">
      <div
        onClick={() => setCollapsed(!collapsed)}
        onKeyDown={() => setCollapsed(!collapsed)}
        aria-label="Basculer l'affichage des options de fidélité"
        role="button"
        tabIndex="0"
        className="flex items-center justify-between"
      >
        <p className="text-xl">{loyaltyPoint} Points de fidélités</p>
        <div ref={expandArrowRef}>
          <Icon icon="expand_less" color="fill-tertiary-200" size="32" />
        </div>
      </div>
      <div ref={listRef} className="overflow-hidden">
        <ul className="flex flex-col gap-2 pt-4">
          {loyaltyOptions?.map((option, index) => {
            const { cost_text: cost, name, id, amount } = option;
            return (
              <li key={id} className="overflow-hidden rounded-lg border border-tertiary-200" id={id}>
                {loyaltyCode[0] === index ? (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(loyaltyCode[1]);
                    }}
                    className="flex h-full min-h-[3rem] w-full items-center justify-between bg-tertiary-200 px-4 py-2 text-xl font-medium text-secondary-600 hover:text-primary-600 active:text-primary-800"
                  >
                    <p className="font-semibold">{loyaltyCode[1]}</p>
                    <p className="font-[teko] uppercase underline">Copier le code</p>
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="mt-1 font-[teko] text-3xl uppercase">{name}</span>
                      <span className="opacity-90">{cost}</span>
                    </div>
                    {loyaltyPoint > amount ? (
                      <div>
                        {pending === index ? (
                          <ResponsiveLoading />
                        ) : (
                          <RedeemButton
                            redeem={redeemPoints}
                            customerEmail={customerEmail}
                            customerIdNum={customerIdNum}
                            id={id}
                            index={index}
                            pending={pending}
                          />
                        )}
                      </div>
                    ) : (
                      <p className="text-lg">{-(loyaltyPoint - amount)} points restants !</p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {loyaltyCode[1] && <p className="mt-4 text-xl">Ce code de réduction viens de vous être envoyé par Email.</p>}
      </div>
    </div>
  );
}

function RedeemButton({ redeem, customerEmail, customerIdNum, id, index, pending }) {
  return (
    <button
      onClick={() => redeem(customerEmail, customerIdNum, id, index)}
      disabled={pending}
      className="font-[teko] text-xl font-medium uppercase text-tertiary-100 underline hover:text-tertiary-600 active:text-tertiary-800"
    >
      recevoir le code
    </button>
  );
}

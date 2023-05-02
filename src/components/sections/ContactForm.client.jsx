import {Link} from '@shopify/hydrogen';
import {useEffect, useState} from 'react';
import emailjs from '@emailjs/browser';

import {Button, ErrorsLabel, Section, Heading, Icon} from '~/components';
import {getInputStyleClasses} from '~/lib/styleUtils';

export function ContactForm({customerData}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [succesMessage, setSuccesMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const customerMail = customerData?.customer?.email;
  const customerName = customerData?.customer?.firstName;

  useEffect(() => {
    if (customerData?.customer) {
      setName(customerName);
      setEmail(customerMail);
    }
  }, [customerMail, customerName, customerData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    emailjs
      .send(
        'service_ukx4tu1',
        'template_8rn2c4l',
        templateParams,
        'AGHp1N_02SuQKPk22',
      )
      .then(
        (result) => {
          result && setSuccesMessage(true);
        },
        (error) => {
          error && setErrorMessage(true) & setSuccesMessage(false);
        },
      );

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Section gap="large" noDivide maxW>
      <Heading as="h1" noBorder>
        Nous contacter
      </Heading>
      <p>
        <Link
          className="font-medium underline hover:text-primary-600 active:text-primary-800"
          to="/faqs"
        >
          Notre FAQS n`&apos;a pas répondu à votre question ?
        </Link>
        &nbsp;Nous somme là pour vous aider. Envoyez nous un message et nous
        vous répondrons dans les plus brefs délais.
      </p>
      {succesMessage && (
        <div className="flex items-center gap-4 bg-secondary-600 p-4">
          <Icon size="40" icon="check_circle" color="fill-tertiary-100" />
          <p className="text-lg text-tertiary-100">
            Votre message a été envoyé à notre service client et sera traité
            dans les 48 heures.
          </p>
        </div>
      )}
      {errorMessage && (
        <ErrorsLabel>
          Une erreur est survenue. Vous pouvez nous contacter par Email à &nbsp;
          <a
            className="break-words underline"
            href="mailto:contact@hhcparis.fr"
          >
            contact@hhcparis.fr
          </a>
          &nbsp;ou par téléphone&nbsp;
          <a className="break-words underline" href="tel:+33601032897">
            +33601032897
          </a>
          .
        </ErrorsLabel>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Votre Nom"
          aria-label="Votre Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={getInputStyleClasses()}
        />

        <input
          type="email"
          required
          placeholder="Votre Email"
          aria-label="Votre Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={getInputStyleClasses()}
        />

        <textarea
          value={message}
          required
          placeholder="Votre message..."
          aria-label="Votre message..."
          onChange={(e) => setMessage(e.target.value)}
          className={`${getInputStyleClasses()} max-h-96 min-h-[8rem]`}
        />

        <Button type="submit">Envoyer</Button>
      </form>
    </Section>
  );
}

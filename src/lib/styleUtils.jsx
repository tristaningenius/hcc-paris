export const INPUT_STYLE_CLASSES =
  'h-14 bg-[#FCF8EE] border p-3 w-full placeholder:font-normal placeholder:text-trans-50  focus:border-primary-500 focus:border-2 focus:outline-0';

export const getInputStyleClasses = (isError) => {
  return `${INPUT_STYLE_CLASSES} ${
    isError ? 'border-danger-600 text-danger-600' : 'border-trans-50'
  }`;
};

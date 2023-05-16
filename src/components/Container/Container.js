import ClassName from 'models/classname';

const Container = ({ children, className }) => {
  const containerClassName = new ClassName();

  containerClassName.addIf(className, className);

  return <div className={containerClassName.toString()}>{children}</div>;
};

export default Container;

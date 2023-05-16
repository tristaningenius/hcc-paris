import Container from 'components/Container';

const Header = ({ children }) => {
  return (
    <header>
      <Container>{children}</Container>
    </header>
  );
};

export default Header;

import React from 'react';

function Footer(): React.JSX.Element {
  return (
    <footer className="footer page__section">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;

import React from "react";
import PropTypes from 'prop-types';
import ShootingStars from "./ShootingStars";

function AuthLayout({ children }) {
  return (
    <>
      <header className="auth--header">
        A super simple todo app.
        <ShootingStars />
      </header>
      <main className="auth--main">{children}</main>
    </>
  );
}



AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;

import React from "react";
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

export default AuthLayout;

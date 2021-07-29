import React from "react";

import styles from "./sign-in-form.module.css";

const SignInForm: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <input type="text" placeholder="Name" className={`${styles["input"]}`} />
      <input
        type="password"
        placeholder="Password"
        className={`${styles["input"]}`}
      />
      <button className={`${styles["button"]}`}>Sign in</button>
      <button className={`${styles["button"]} ${styles["join"]}`}>
        Button
      </button>
    </div>
  );
};

export default SignInForm;

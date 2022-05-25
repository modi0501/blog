import { useMutation } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import Error from "../Error/Error";
import { AUTH_TOKEN, USER_EMAIL, USER_NAME } from "../../constants";
import styles from "./Signin.module.css";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "./graphql";

const Signin = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN)) navigate("/");
  });
  const [signin, { data, error, loading }] = useMutation(SIGNIN, {
    variables: {
      input: formState,
    },
    errorPolicy: "all",
    onCompleted: ({ signin }) => {
      localStorage.setItem(AUTH_TOKEN, signin.token.token);
      localStorage.setItem(USER_NAME, signin.user.name);
      localStorage.setItem(USER_EMAIL, signin.user.email);
      navigate("/");
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signin();
        }}
        className={styles.SigninForm}
      >
        {error && <Error message={error.message} />}
        <p>Sign In</p>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          className={styles.SigninFormField}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
          className={styles.SigninFormField}
        />
        <br />
        <button className={styles.SigninFormButton}>Signin</button>
      </form>
    </div>
  );
};

export default Signin;

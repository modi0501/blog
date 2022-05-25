import { useMutation } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import Error from "../Error/Error";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { AUTH_TOKEN } from "../../constants";
import { SIGNUP } from "./graphql";

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN)) navigate("/");
  });
  const [signup, { data, error, loading }] = useMutation(SIGNUP, {
    variables: {
      input: formState,
    },
    errorPolicy: "all",
    onCompleted: ({ signup }) => {
      navigate("/");
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
        className={styles.SignupForm}
      >
        {error && <Error message={error.message} />}
        <p>Register here</p>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
          required
          className={styles.SignupFormField}
        />
        <br />
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          required
          className={styles.SignupFormField}
        />
        <br />
        <input
          type="password"
          required
          placeholder="Enter a strong password"
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
          className={styles.SignupFormField}
        />
        <br />
        <button className={styles.SignupFormButton}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;

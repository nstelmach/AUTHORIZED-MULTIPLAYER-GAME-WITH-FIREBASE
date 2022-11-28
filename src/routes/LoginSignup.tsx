import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginSignup.module.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

export type LoginSignupProps = {
  name: string;
  isCheckbox: boolean;
  isLogin: boolean;
  question: string;
  link: string;
  path: string;
};

function LoginSignup({
  name,
  isCheckbox,
  isLogin,
  question,
  link,
  path,
}: LoginSignupProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signup, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      {
        isLogin
          ? await login(emailRef.current?.value!, passwordRef.current?.value!)
          : await signup(emailRef.current?.value!, passwordRef.current?.value!);
      }
      navigate("/");
    } catch {
      {
        isLogin
          ? setError("Failed to log in")
          : setError("Failed to create an account");
      }
    }
    setLoading(false);
  }

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>{name}</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <div className={classes.inputWrapper}>
          <Input
            className={classes.input}
            id="email"
            placeholder="Email"
            type="email"
            required
            ref={emailRef}
          />

          <Input
            className={classes.input}
            id="password"
            placeholder="Password"
            type="password"
            required
            ref={passwordRef}
          />
          {/* {isCheckbox && (
            <div className={classes.wrapperCheck}>
              <input className={classes.checkbox} type="checkbox"></input>
              <label className={classes.label}>Remember Me</label>
            </div>
          )} */}
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            disabled={loading}
            type="submit"
            className={classes.button}
            text={name}
          />
          <div className={classes.questionWrapper}>
            <div className={classes.subtitles}>{question}</div>
            <Link className={`${classes.subtitles} ${classes.link}`} to={path}>
              {link}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;

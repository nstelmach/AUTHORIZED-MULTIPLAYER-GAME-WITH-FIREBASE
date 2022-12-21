import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginSignup.module.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import useSearchParams from "../../hooks/useSearchParams";

export type LoginSignupProps = {
  name: string;
  isLogin: boolean;
  question: string;
  link: string;
  path: string;
};

function LoginSignup({
  name,
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
  const { user } = useAuth();

  const { redirect, player } = useSearchParams();

  const performRedirect = useCallback(() => {
    if (!redirect) return navigate("/");
    if (!player) return navigate(`/${redirect}`);
    return navigate(`/${redirect}?player=${player}`);
  }, [navigate, player, redirect]);

  useEffect(() => {
    if (user) performRedirect();
  }, [performRedirect, user]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      isLogin
        ? await login(emailRef.current?.value!, passwordRef.current?.value!)
        : await signup(emailRef.current?.value!, passwordRef.current?.value!);

      isLogin ? performRedirect() : navigate("/");
    } catch (error) {
      isLogin
        ? setError("Failed to log in")
        : setError("Failed to create an account");
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
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            disabled={loading}
            type="submit"
            className={classes.button}
            text={name}
            isLoading={loading}
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

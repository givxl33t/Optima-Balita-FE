import { useEffect } from "react";
import LoginForm from "../components/FormLogin";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};
export default LoginPage;

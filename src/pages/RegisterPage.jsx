import { useEffect } from "react";
import RegisterForm from "../components/FormRegister";

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};
export default RegisterPage;

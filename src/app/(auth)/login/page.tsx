import LoginForm from "@/components/Forms/LoginForm";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Welcome back, Please Login to continue",
};

const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default Login;

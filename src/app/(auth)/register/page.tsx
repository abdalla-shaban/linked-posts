import { Container } from "@mui/material";
import RegisterForm from "@/components/Forms/RegsiterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Nice to meet you, Just register to join with us",
};
const Register = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default Register;

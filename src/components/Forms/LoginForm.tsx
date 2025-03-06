"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { AuthLoginBody } from "@/interfaces";
import { login } from "@/lib/store/slices/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Alert,
  Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Enter Vaild Email"),
  password: Yup.string().required("Password is Required"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, success, isLoading } = useAppSelector((state) => state.auth);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleLogin = (values: AuthLoginBody) => {
    dispatch(login(values)).then((response) => {
      setOpenSnackbar(true);
      if (response.payload.token) {
        setTimeout(() => router.push("/"), 200);
      }
    });
  };

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema,
      onSubmit: handleLogin,
    });

  return (
    <>
      {error || success ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? "error" : "success"}
            variant="outlined"
            sx={{ width: "100%" }}
          >
            {error ? error : success}
          </Alert>
        </Snackbar>
      ) : null}
      <Stack
        sx={{
          flexDirection: { md: "row" },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            backgroundImage: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: { xs: "1rem 1rem 0 0", md: "1rem 0 0 1rem" },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              component={"h1"}
              sx={{
                fontSize: { xs: 24, md: 48, lg: 60 },
                fontWeight: "bold",
              }}
            >
              Welcome Back !
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 28 } }}>
              Please Login to Continue
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: { xs: "0 0 1rem 1rem", md: "0 1rem 1rem 0" },
            flex: 1,
          }}
        >
          <Typography
            variant="h3"
            component={"h2"}
            sx={{
              mb: 3,
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: { xs: 24, md: 38 },
            }}
          >
            Login
          </Typography>

          <Stack spacing={3} component={"form"} onSubmit={handleSubmit}>
            <TextField
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              label="Email"
              name="email"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel
                htmlFor="password-label"
                error={touched.password && !!errors.password}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="password-label"
                name="password"
                error={touched.password && !!errors.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={touched.password && !!errors.password}>
                {touched.password && errors.password}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ py: 1.5, fontSize: 16 }}
            >
              Login
            </Button>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1.5}
            mt={4}
          >
            <Typography sx={{ fontSize: 14 }}>
              Don't Have an Account ?
            </Typography>
            <Link
              style={{ color: "#3674B5", fontWeight: "600", fontSize: 14 }}
              href="/register"
            >
              Register Now
            </Link>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default LoginForm;

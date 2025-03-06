"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { AuthSignUpBody } from "@/interfaces";
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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import { MouseEvent, useState } from "react";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { signup } from "@/lib/store/slices/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .min(3, "Name Muste be at Least 3 chars"),
  email: Yup.string().required("Email is Required").email("Enter Vaild Email"),
  password: Yup.string().required("Password is Required"),
  rePassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password")], "Password must match Confirm Password"),
  dateOfBirth: Yup.mixed<Dayjs>()
    .required("Date of Birth is Required")
    .test("is-valid", "Invalid date", (value) =>
      value ? dayjs(value).isValid() : false
    ),
  gender: Yup.string().required("Gender is Required").oneOf(["male", "female"]),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
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
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownRePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpRePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleSignup = (values: AuthSignUpBody) => {
    values.dateOfBirth = dayjs(values.dateOfBirth).format("MM/DD/YYYY");
    dispatch(signup(values)).then((response) => {
      setOpenSnackbar(true);
      if (response.payload) {
        setTimeout(() => router.push("/login"), 200);
      }
    });
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSignup,
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
                lineHeight: 1.2,
                mb: { md: 3 },
              }}
            >
              Nice to meet you :)
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 28 } }}>
              Just register to join with us
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
            Register
          </Typography>

          <Stack spacing={3} component={"form"} onSubmit={handleSubmit}>
            <TextField
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
            />
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
              fullWidth
            />
            <FormControl fullWidth variant="outlined">
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
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="repassword-label"
                error={touched.rePassword && !!errors.rePassword}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="repassword-label"
                name="rePassword"
                error={touched.rePassword && !!errors.rePassword}
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showRePassword ? "text" : "password"}
                label="Confirm Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showRePassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowRePassword}
                      onMouseDown={handleMouseDownRePassword}
                      onMouseUp={handleMouseUpRePassword}
                      edge="end"
                    >
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={touched.rePassword && !!errors.rePassword}>
                {touched.rePassword && errors.rePassword}
              </FormHelperText>
            </FormControl>
            <DatePicker
              label="Date of Birth"
              value={values.dateOfBirth ? dayjs(values.dateOfBirth) : null}
              name="dateOfBirth"
              onChange={(value) => setFieldValue("dateOfBirth", value)}
              slotProps={{
                textField: {
                  error: touched.dateOfBirth && !!errors.dateOfBirth,
                  helperText: touched.dateOfBirth && errors.dateOfBirth,
                  fullWidth: true,
                },
              }}
            />
            <FormControl>
              <FormLabel id="gender-input">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-input"
                name="gender"
                row
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              <FormHelperText error={touched.gender && !!errors.gender}>
                {touched.gender && errors.gender}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ py: 1.5, fontSize: 16 }}
            >
              Register
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
              Do You Have an Account ?
            </Typography>
            <Link
              style={{ color: "#3674B5", fontWeight: "600", fontSize: 14 }}
              href="/login"
            >
              Login Now
            </Link>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default RegisterForm;

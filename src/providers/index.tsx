"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/app/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRouterCacheProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </LocalizationProvider>
        </AppRouterCacheProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;

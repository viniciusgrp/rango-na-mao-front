import "@/app/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/api";
import { ThemeProvider } from "@emotion/react";
import lightTheme from "@/utils/themes";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider theme={lightTheme}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}

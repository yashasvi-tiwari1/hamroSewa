import "@sewa/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SnackbarProvider } from "notistack";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SnackbarProvider
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        {/*<ThemeProvider enableSystem={true} attribute={"class"}>*/}
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/*</ThemeProvider>*/}
      </SnackbarProvider>
    </>
  );
}

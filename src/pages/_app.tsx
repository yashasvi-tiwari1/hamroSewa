import '@sewa/styles/globals.css'
import type { AppProps } from 'next/app'
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "next-themes";
import 'swiper/css';


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
        <ToastContainer />

        <ThemeProvider enableSystem={true} attribute={"class"}>
          {getLayout(<Component {...pageProps} />)}

        </ThemeProvider>

      </>
  );
}


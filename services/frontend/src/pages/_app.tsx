import type { AppProps } from 'next/app';
import CommonProviders from '@/Providers/CommonProviders';
import DefaultLayout from '@/layouts/DefaultLayout';
import { defaultTheme } from '@/themes/defaultTheme';
import SafeHydrate from '@/Next/SafeHydrate';
import { CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <CommonProviders theme={defaultTheme}>
        <DefaultLayout>
          <CssBaseline />
          <Component {...pageProps} />
        </DefaultLayout>
      </CommonProviders>
    </SafeHydrate>
  );
}

import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  console.log(session)
  return (
    <SessionProvider session={session}>
          <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  );
}

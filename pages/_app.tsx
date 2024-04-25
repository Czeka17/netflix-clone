import '/styles/globals.css'
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import FontFaceObserver from 'fontfaceobserver'
import MovieContextProvider from '../context/MovieProvider'
export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps<{session: Session}>) {


  const [appLoading, setAppLoading] = useState(true);
  const [delayedTransition, setDelayedTransition] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      const font = new FontFaceObserver('Mulish');

      try {
        await font.load();
        setAppLoading(false);
        setTimeout(() => {
          setDelayedTransition(true);
        }, 300);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setAppLoading(false);
        setTimeout(() => {
          setDelayedTransition(true);
        }, 300);
      }
    };

    const fetchData = async () => {
      try {
        await loadFonts();
      } catch (error) {
        console.error('Error loading data:', error);
        setAppLoading(false);
        setTimeout(() => {
          setDelayedTransition(true);
        }, 300);
      }
    };

    fetchData();
  }, []);

  return (
    
    <SessionProvider session={session}>
        <MovieContextProvider>
        {!delayedTransition ? <div className={`transition-opacity duration-500 ${appLoading ? '' : 'opacity-0'}`}>
           <div className='flex justify-center items-center h-[100vh]'>
           <div className="max-w-[200px] max-h-[200px]">
        <img src="/logo.png"/>
        </div>
           </div>
          </div>
          :
         <div className={`transition-opacity duration-1000 ${appLoading ? 'opacity-0' : 'opacity-100'}`}>
           <Layout>
            <Component {...pageProps} />
          </Layout>
          </div>}
        </MovieContextProvider>
    </SessionProvider>
  );
}

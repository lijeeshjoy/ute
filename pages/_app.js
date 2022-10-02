import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import AOS from 'aos'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    let scrollRef = 0;
    AOS.init({
      once: true
    });
    AOS.refresh()
    window.addEventListener("scroll", function () {
      scrollRef <= 10 ? scrollRef++ : AOS.refresh();
    })
    return () => {
      window.removeEventListener("scroll", function () {
        AOS.refresh();
      });
    };
  }, [])
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as != router.asPath) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }, 100)
      }
      return true;
    });
  }, [router])

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp

import React, { useEffect, useState } from 'react'
import { AppBar } from '@mui/material'
import theme from '../theme';
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router';

const Header = (props) => {

  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  let lastSctoll;
  const getPosition = (e) => {
    var header = document.getElementById('header');
    if(window.innerWidth > 900 ){
      const offset = window.scrollY || document.documentElement.scrollTop;
      if(offset <= lastSctoll || window.scrollY == 0 ){
        header.style.display = 'initial'
        header.classList.add("navBarSlideIn")
        header.classList.remove("navBarSlideOut")
        isScrolled && setIsScrolled(false);
      }
      else{
        header.classList.remove("navBarSlideIn")
        header.classList.add("navBarSlideOut")
        setIsScrolled(true);
      }
      lastSctoll = offset;
    }
    else{
      header.style.display = 'none'
    }
  };

  useEffect(()=>{
    if(router.pathname == '/'){
      lastSctoll = window.scrollY;
      window.addEventListener("scroll",getPosition);
      return () => {
        window.removeEventListener("scroll",getPosition);
      };
    }
    else{
      var header = document.getElementById('header');
      header.style.display = ''
      header.classList.contains("navBarSlideOut") && header.classList.remove("navBarSlideOut")
      header.classList.contains("navBarSlideIn") && header.classList.remove("navBarSlideIn")
    }
  },[router])

  return (
    <>
      <AppBar
        id='header'
        sx={{
          background: '#fff',
          color: '#000',
          '@media all and (max-width:1240px)': {
            display: 'none'
          },
          '@media all and (min-width:1241px)': {
            display: 'block'
          },
          height: '65px',
          maxHeight: "65px",
          maxWidth: (theme) => theme.breakpoints.values.xl,
          right: 'auto !important'
        }}
        elevation={0}
        className={styles.MainNavigation}
        position='fixed'
      >
        <h1>Main Nav</h1>
      </AppBar>
      <AppBar
        id='mobile-header'
        sx={{
          height:'65px',
          maxHeight:'65px',
          background:'#fff',
          color:'#000',
          padding:'0',
          '@media all and (max-width:1240px)': {
            visibility:'visible',
            display: 'block'
          },
          '@media all and (min-width:1241px)': {
            visibility:'hidden',
            display: 'none'
          },
          zIndex:(theme)=>theme.zIndex.drawer + 1,
        }}
        elevation={0}
      >
        <h1>nav</h1>
      </AppBar>
    </>
  )
}

export default Header;

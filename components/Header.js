import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, CardMedia, Grid, IconButton, Link, SwipeableDrawer, Typography } from "@mui/material";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Layout.module.css";
// import { getHeaders } from "./GetHeaders";
import Cart from './Cart';
import MobileMenu from "./MobileMenu";
// import UserContext from "./UserContext";

const Header = (props) => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  // const { user, setUser, productMenuOpen, setProductCategoryNav, setSubCategoryArray } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);

  let lastScroll;
  const getPosition = (e) => {
    var header = document.getElementById("header")
    if (window.innerWidth > 900) {
      const offset = window.scrollY || document.documentElement.scrollTop;
      if (offset <= lastScroll || window.scrollY == 0) {
        header.style.display = "initial"
        header.classList.add("navBarSlideIn")
        header.classList.remove('navBarSlideOut')
        isScrolled && setIsScrolled(false);
      }
      else {
        header.classList.remove("navBarSlideIn")
        header.classList.add('navBarSlideOut')
        setIsScrolled(true);
      }
      lastScroll = offset;
    }
    else {
      header.style.display = "none"
    }
  };

  const [menuDrawer, setMenuDrawer] = useState(false);
  const toggleDrawer = (e, open) => {
    setMenuDrawer(open);
  };

  useEffect(() => {
    if (router.pathname == '/') {
      lastScroll = window.scrollY;
      window.addEventListener("scroll", getPosition);
      return () => {
        window.removeEventListener("scroll", getPosition);
      };
    }
    else {
      var header = document.getElementById("header")
      header.style.display = ""
      header.classList.contains('navBarSlideOut') && header.classList.remove('navBarSlideOut')
      header.classList.contains('navBarSlideIn') && header.classList.remove("navBarSlideIn")
    }
  }, [router]);

  // useEffect(() => {
  //   /* setUser(localStorage.getItem("user") || "Guest"); */
  //   if (localStorage.getItem("user") == undefined || localStorage.getItem("user") == null) {
  //     setUser("Guest");
  //   }
  //   if (user == null || user == undefined) {
  //     if (localStorage.getItem("user") == undefined || localStorage.getItem("user") == null) {
  //       setUser("Guest");
  //     }
  //     else {
  //       setUser(localStorage.getItem("user"));
  //     }
  //   }
  //   var tokencall;
  //   var client_id = publicRuntimeConfig.app.clientId;
  //   var redirect_uri = publicRuntimeConfig.app.pkceRedirectUri;

  //   if (window.localStorage.getItem("kmli") != undefined && JSON.parse(window.localStorage.getItem("kmli"))) {
  //     // alert("Success");
  //     tokencall = setInterval(async () => {
  //       if (
  //         localStorage.getItem("loggedin") &&
  //         window.location.pathname != "/login"
  //       ) {
  //         //exclude urls if possible in better way
  //         const res = await fetch(publicRuntimeConfig.app.pkceTokenEndpoint, {
  //           method: "POST",
  //           credentials: "include",
  //           headers: getHeaders(),
  //           body: JSON.stringify({
  //             clientId: client_id,
  //             responseType: "token",
  //             grantType: "refresh_token",
  //             redirectUri: redirect_uri,
  //             // authCode:,
  //             // codeVerifier:,

  //           }),
  //         }).then((res) =>
  //           res
  //             .json()
  //             .then((user) => ({
  //               user: user,
  //               status: res.status,
  //             }))
  //             .then((res) => {
  //               if (res.user.loginredirect != null && res.user.loginredirect) {
  //                 router.push("/login");
  //               } else {
  //                 if (res.status == 200 && res.user.error == null) {
  //                   window.localStorage.setItem("dvt", res.user.devicetoken);
  //                   window.localStorage.setItem("crt", res.user.csrftoken);
  //                   window.localStorage.setItem("loggedin", true);
  //                 } else {

  //                 }
  //               }
  //             })
  //         );
  //       }
  //       else {
  //         clearInterval(tokencall);
  //       }

  //     }, 300000);
  //   }
  // }, []);

  useEffect(() => {
    if (menuDrawer) {
      window.addEventListener("resize", checkDrawer);
      return () => {
        window.removeEventListener("resize", checkDrawer);
      };
    }
  }, [menuDrawer])

  const checkDrawer = (e) => {
    toggleDrawer(e, false)
  }

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);



  const MemorizedLogo = React.memo(() => {
    return (
      <CardMedia
        component="img"
        image="/ute.png"
        alt="ute salons"
        style={{ maxHeight: '45px', height: '45px', width: 'auto', margin: 'auto', }}
        className="logo"
      />
    )
  })

  return (
    <>
      {/*Desktop Header*/}
      <AppBar
        id="header"
        sx={{
          background: '#000',
          color: '#fff',
          '@media all and (max-width:1240px)': {
            display: 'none'
          },
          '@media all and (min-width:1241px)': {
            display: 'block'
          },
          height: '65px', maxHeight: '65px',
          maxWidth: (theme) => theme.breakpoints.values.xl,
          right: 'auto !important',
        }}
        elevation={0}
        className={styles.header}
      // position='fixed'
      >
        <Grid item sm={12} xs={12} md={12}
          id="header-grid"
          sx={{
            height: '65px', maxHeight: '65px', maxWidth: '94%', marginLeft: '4%', marginRight: '4%',
            padding: '0 !important'
          }}>
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{ height: '100%', margin: 0 }}
          >
            {/* Left Side of the Header */}
            <Grid item sx={{ padding: '0% !important', height: '100%' }}>
              <Grid
                container
                direction="row"
                spacing={4}
                justifyContent="flex-start"
                alignItems="center"
                sx={{ height: '100%', margin: 0 }}
              >
                <Grid item sx={{
                  height: 'auto', paddingTop: '0 !important',
                  paddingRight: '1.875rem !important', paddingLeft: '1.875rem !important'
                }} >
                  <Typography display='block'
                    sx={{
                      cursor: "pointer",
                      color: (router.pathname == "/") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                      "&:hover": {
                        color: 'rgb(243,101,35, 100%)'
                      },
                      '@media all and (min-width:1920px)': {
                        color: (router.pathname == "/") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                        "&:hover": {
                          color: 'rgb(243,101,35, 100%)'
                        },
                      }
                    }}
                    onClick={(e) => router.push("/")}
                  >
                    Home
                  </Typography>
                </Grid>
                <Grid item sx={{
                  height: 'auto', paddingTop: '0 !important',
                  paddingRight: '1.875rem !important', paddingLeft: '1.875rem !important'
                }} >
                  <Typography display='block'
                    sx={{
                      cursor: "pointer",
                      color: (router.pathname == "/about") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                      "&:hover": {
                        color: 'rgb(243,101,35, 100%)'
                      },
                      '@media all and (min-width:1920px)': {
                        color: (router.pathname == "/about") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                        "&:hover": {
                          color: 'rgb(243,101,35, 100%)'
                        },
                      }
                    }}
                    onClick={(e) => router.push("/about")}
                  >
                    About
                  </Typography>
                </Grid>

                <Grid item sx={{
                  height: 'auto', paddingTop: '0 !important',
                  paddingRight: '1.875rem !important', paddingLeft: '1.875rem !important'
                }} >
                  <Typography display='block'
                    sx={{
                      cursor: "pointer",
                      color: (router.pathname == "/bookings") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                      "&:hover": {
                        color: 'rgb(243,101,35, 100%)'
                      },
                      '@media all and (min-width:1920px)': {
                        color: (router.pathname == "/bookings") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                        "&:hover": {
                          color: 'rgb(243,101,35, 100%)'
                        },
                      }
                    }}
                    onClick={(e) => router.push("/bookings")}
                  >
                    Bookings
                  </Typography>
                </Grid>

              </Grid>
            </Grid>
            {/* Center of the Header */}
            <Grid item sx={{ height: 'auto', padding: '0% !important', }}>
              <Link href='/' >
                <MemorizedLogo />
              </Link>
            </Grid>
            {/* Right side of the Header */}
            <Grid item sx={{ height: 'auto', padding: '0% !important' }}>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item sx={{
                  height: 'auto',
                  paddingRight: '1.875rem !important', paddingLeft: '1.875rem !important',
                  maxWidth: '154px'
                }} >
                  <Typography display='block'
                    sx={{
                      cursor: "pointer",
                      color: (router.pathname == "/bookings") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                      "&:hover": {
                        color: 'rgb(243,101,35, 100%)'
                      },
                      '@media all and (min-width:1920px)': {
                        color: (router.pathname == "/bookings") ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                        "&:hover": {
                          color: 'rgb(243,101,35, 100%)'
                        },
                      }
                    }}
                    onClick={(e) => router.push("/contact-us")}
                  >
                    contact Us
                  </Typography>
                </Grid>

                <Grid item
                  sx={{
                    paddingRight: '1.875rem !important',
                    paddingLeft: '1.875rem !important',
                    // minWidth: '154px',
                    maxWidth: '154px'
                  }}>
                  <Typography
                    display='block'
                    align='left'
                    sx={{
                      cursor: "pointer",
                      color: (router.pathname == '/account' || router.pathname == '/login' || router.pathname == '/register')
                        ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                      "&:hover": {
                        color: 'rgb(243,101,35, 100%)'
                      },
                      '@media all and (min-width:1920px)': {
                        color: (router.pathname == '/account' || router.pathname == '/login' || router.pathname == '/register')
                          ? 'rgb(243,101,35, 100%)' : 'rgb(255,255,255, 100%)',
                        "&:hover": {
                          color: 'rgb(243,101,35, 100%)'
                        },
                      }
                    }}
                    onClick={(e) => user == 'Guest' ? router.push("/login") : router.push("/account")}
                  >
                    Log in
                    {/* {user == 'Guest' ? 'Log in' : user?.length > 11 ? user?.substring(0, 11) : user} */}
                  </Typography>
                </Grid>
                {/* <Grid item id="searchicon" md={1} alignSelf="flex-end" sx={{ paddingRight: '1.875rem !important', paddingLeft: '1.875rem !important', paddingBottom: '0.2rem !important' }}>
                  <SearchIcon />
                </Grid> */}
                <Grid item sx={{
                  height: 'auto',
                  paddingRight: '1.875rem !important', paddingLeft: '1.875rem !important',
                }} >
                  <Cart isScrolled={isScrolled} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      {/* Mobile Header */}
      <AppBar
        id="mobile-header"
        sx={{
          height: '65px', maxHeight: '65px',
          background: "#000",
          padding: "0",
          color: "#fff",
          '@media all and (max-width:1240px)': {
            visibility: 'visible',
            display: 'block',
          },
          '@media all and (min-width:1241px)': {
            visibility: 'hidden',
            display: 'none'
          },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={0}
      >
        <Grid item sm={12} xs={12} md={12} sx={{
          padding: '0 !important', maxWidth: '100%',
          height: '100%',
        }}>
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: '100%',
              margin: 0,
              '@media all and (max-width:600px)': {
                padding: '0rem 0.5rem'
              },
              '@media all and (min-width:601px)': {
                padding: '0rem 1rem'
              }
            }}
          >
            <Grid item xs={2} sm={2}>
              {menuDrawer == false ?
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label="menu"
                  onClick={(e) => toggleDrawer(e, !menuDrawer)}
                >
                  <MenuIcon color='#fff' />
                </IconButton> :

                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label="menu"
                  onClick={(e) => toggleDrawer(e, !menuDrawer)}
                >
                  <CloseIcon color='#fff' />
                </IconButton>}
            </Grid>
            <Grid item xs={7} sm={6}>
              <Link href='/' >
                <CardMedia
                  component="img"
                  image="/ute.png"
                  alt="ute"
                  style={{ objectFit: "fill", width: '120px', margin: 'auto', marginLeft: "3.5rem" }}
                  className="logo"
                />
              </Link>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Grid container alignItems='center' justifyContent='flex-end' spacing={0}
                sx={{ maxWidth: '100%' }}
              >
                {/* <Grid item sx={{ paddingTop: '0.2rem !important' }} >
                  <SearchIcon />
                </Grid> */}
                <Cart isScrolled={isScrolled} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={menuDrawer}
        onClose={(e) => toggleDrawer(e, false)}
        onOpen={(e) => toggleDrawer(e, true)}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              sm: '45%'
            },
            top: '65px',
            opacity: '1',
          },
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        ModalProps={{
          keepMounted: true,
        }}
        elevation={0}
      >
        <MobileMenu toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </>
  );
};
export default Header;


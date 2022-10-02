import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const theme = createTheme ({
    breakpoints:{
        values:{
            xs:0,
            sm:600,
            md:900,
            lg:1200,
            hd:1920,
            xl:2560,
        }
    }
})
export default theme
import { Container } from '@mui/material';
import Header from "./Header";


const Layout = ({ children }) => {
    return (
        <>
            <Container maxWidth="xl" sx={{ padding: '0 !important', height: '100%' }}>
                <Header />
                <div id="layout-div" style={{ overflow: 'clip' }}>
                    {children}
                </div>
            </Container>
        </>
    )
}
export default Layout;
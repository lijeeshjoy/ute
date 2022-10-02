import React from 'react'
import { Container } from '@mui/material'
import Header from './Header'


const Layout = ({ children }) => {
    return (
        <Container maxWidth="xl" sx={{ padding: '0 !important', height: '100%' }}>
            <Header />
            <div>
                {children}
            </div>
        </Container>
    )
}
export default Layout;
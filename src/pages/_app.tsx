import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import axios from "axios";

interface Pages {
    Component: any;
    pageProps: any;
}

const MyApp = ({ Component, pageProps }: Pages) => {
    const router = useRouter();
    useEffect(() => {
        let isLoggedIn = false;
        if (typeof window !== 'undefined') {
            isLoggedIn = localStorage.getItem('date-le-accessToken') !== null;
        }
        if (!isLoggedIn && router.pathname !== '/login') {
            router.push('/login');
        }
    }, [router, router.pathname]);

    axios.defaults.baseURL = 'http://localhost:8000';
    // axios.defaults.baseURL = 'https://date-le-backend-production.up.railway.app';

    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;

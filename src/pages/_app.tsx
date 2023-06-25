import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

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

    return <Component {...pageProps} />;
};

export default MyApp;

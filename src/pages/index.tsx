import React from 'react';
import Link from 'next/link';


const Index = () => {
    return (
        <div>
            <h1>Index Page</h1>
            <Link href="/login">Login</Link>
        </div>
    );
};

export default Index;

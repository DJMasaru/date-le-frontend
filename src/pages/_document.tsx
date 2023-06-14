import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <style>
                        {`
                            @import url(https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap);

                            h1 {
                                font-family: Kaisei Decol;
                                font-size: 50px;
                            }
                            
                        `}
                    </style>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

import LoginBtn from "../../components/loginButton";
import RegisterBtn from "../../components/registerButton";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

const index = () => {
    return (
        <div>
            <ChakraProvider>
                <LoginBtn/>
                <RegisterBtn/>
            </ChakraProvider>
        </div>
    );
};


export default index;
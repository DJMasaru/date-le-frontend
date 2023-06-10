import LoginBtn from "../../components/loginButton";
import RegisterBtn from "../../components/registerButton";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Input,Stack,Flex } from '@chakra-ui/react';
import {useState} from "react";
import {ChangeEvent} from "react";



const LoginPage =()=> {
    const [email, setEmail] = useState<string>(""); // ログインIDのstate
    const [password, setPassword] = useState<string>(""); // パスワードのstate

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <ChakraProvider>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                >
                    <h1>でーとる</h1>
                    <p>〜今日は誰とデートする？〜</p>
                    <Stack spacing={3}>
                        <Input placeholder='メールアドレス' size='md'　value={email} onChange={handleEmailChange}/>
                        <Input placeholder='パスワード' size='md'　value={password} onChange={handlePasswordChange}/>
                    </Stack>
                    <LoginBtn email={email} password={password} />
                    <RegisterBtn/>
                    <p>パスワードを忘れた方はこちら</p>
                </Flex>
            </ChakraProvider>
        </div>
    );
};

export default LoginPage;
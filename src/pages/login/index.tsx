import LoginBtn from "../../components/loginButton";
import RegisterBtn from "../../components/registerButton";
import React, {useState,ChangeEvent} from "react";
import { Input, Stack, Flex, Box, FormControl, FormErrorMessage } from '@chakra-ui/react';
import GuestLogin from "@/components/guestLogin";
const LoginPage =()=> {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [message, setMessage] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // バリデーション関数
    const validateEmail = () => {
        if (!email) {
            setEmailError("メールアドレスを入力してください。");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = () => {
        if (!email) {
            setPasswordError("パスワードを入力してください。");
        } else {
            setPasswordError("");
        }
    };

    //『ログイン』ボタンで実行されたhttpリクエストのエラーレスポンスを受けたときに格納される
    const handleStateChange = (newMessage:any) => {
        setMessage(newMessage);
    };

    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <h1>でーとる</h1>
                <p>〜今日は誰とデートする？〜</p>
                <Stack spacing={3}>
                    <FormControl isInvalid={!!emailError}>
                        <Input placeholder='メールアドレス' size='md'　value={email} onChange={handleEmailChange} onBlur={validateEmail}/>
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!passwordError}>
                        <Input placeholder='パスワード' size='md'　value={password} onChange={handlePasswordChange} onBlur={validatePassword}/>
                        <FormErrorMessage>{passwordError}</FormErrorMessage>
                    </FormControl>
                </Stack>
                <Flex justifyContent="space-between">
                    <LoginBtn email={email} password={password} onStateChange={handleStateChange}/>
                    <RegisterBtn/>
                </Flex>
                <Box color="red">
                    <div>
                        {message ? <p>{message}</p> : <p>&nbsp;</p>}
                    </div>
                </Box>
                <Box>
                    <GuestLogin />
                </Box>
            </Flex>
        </>
    );
};

export default LoginPage;
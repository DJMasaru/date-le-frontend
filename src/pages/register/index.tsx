import React, {ChangeEvent, useState} from "react";
import {ChakraProvider, Flex, Input, Stack, Button} from "@chakra-ui/react";
import RegisterConfirmButton from "../../components/registerConfirmButton";
import ReturnLoginButton from "../../components/returnLoginPage";

const RegisterPage =()=>{
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [againPass, setAgainPass] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleAgainPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAgainPass(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return(
        <div>
            <ChakraProvider>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                >
                    <h1>新規登録</h1>
                    <p>ユーザー名</p>
                    <p>10文字以内で登録してください。</p>
                    <p>（半角・全角OK！）</p>
                    <Stack spacing={3}>
                        <Input placeholder='ニックネーム' size='md'　value={name} onChange={handleNameChange}/>
                    </Stack>
                    <p>パスワード</p>
                    <p>8文字以上で入力してください。</p>
                    <Stack spacing={3}>
                        <Input placeholder='パスワード' size='md'　value={password} onChange={handlePasswordChange}/>
                        <Input placeholder='パスワード再入力' size='md'　value={againPass} onChange={handleAgainPasswordChange}/>
                    </Stack>
                    <p>メールアドレス</p>
                    <Stack spacing={3}>
                        <Input placeholder='メールアドレス' size='md'　value={email} onChange={handleEmailChange}/>
                    </Stack>
                    <Flex justifyContent="space-between">
                        <ReturnLoginButton/>
                        <RegisterConfirmButton name={name} password={password} email={email} />
                    </Flex>
                </Flex>
            </ChakraProvider>
        </div>
    )
}

export default RegisterPage;
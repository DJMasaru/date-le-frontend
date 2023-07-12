import React, {ChangeEvent, useState} from "react";
import {Flex, Input, Stack, FormControl, FormErrorMessage} from "@chakra-ui/react";
import RegisterConfirmButton from "../../components/registerConfirmButton";
import ReturnLoginButton from "../../components/returnLoginPage";

const RegisterPage =()=>{
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [againPass, setAgainPass] = useState<string>('');
    const [againPassError, setAgainPassError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

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

    const validateName = () => {
        if (!name) {
            setNameError("ユーザー名を入力してください。");
        } else {
            setNameError("");
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("パスワードを入力してください。");
        } else {
            setPasswordError("");
        }
    };

    const validateAgainPass = () => {
        if (!password) {
            setAgainPassError("パスワードを再入力してください。");
        } else {
            setAgainPassError("");
        }
    };

    const validateEmail = () => {
        if (!password) {
            setEmailError("メールアドレスを入力してください。");
        } else {
            setEmailError("");
        }
    };

    return(
        <>
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
                    <FormControl isInvalid={!!nameError}>
                        <Input placeholder='ユーザー名' size='md'　value={name} onChange={handleNameChange} onBlur={validateName}/>
                        <FormErrorMessage>{nameError}</FormErrorMessage>
                    </FormControl>
                </Stack>
                <p>パスワード</p>
                <p>8文字以上で入力してください。</p>
                <Stack spacing={3}>
                    <FormControl isInvalid={!!passwordError}>
                        <Input placeholder='パスワード' size='md'　value={password} onChange={handlePasswordChange}  onBlur={validatePassword}/>
                        <FormErrorMessage>{passwordError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!againPassError}>
                        <Input placeholder='パスワード再入力' size='md'　value={againPass} onChange={handleAgainPasswordChange} onBlur={validateAgainPass}/>
                        <FormErrorMessage>{againPassError}</FormErrorMessage>
                    </FormControl>
                </Stack>
                <p>メールアドレス</p>
                <Stack spacing={3}>
                    <FormControl isInvalid={!!emailError}>
                        <Input placeholder='メールアドレス' size='md'　value={email} onChange={handleEmailChange} onBlur={validateEmail}/>
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                    </FormControl>
                </Stack>
                <Flex justifyContent="space-between">
                    <ReturnLoginButton/>
                    <RegisterConfirmButton name={name} password={password} againPass={againPass} email={email} />
                </Flex>
            </Flex>
        </>
    )
}

export default RegisterPage;
import React, {ChangeEvent, useState} from "react";
import {Flex, Input, Stack, FormControl, FormErrorMessage} from "@chakra-ui/react";
import RegisterConfirmButton from "../../components/registerConfirmButton";
import BackButton from "@/components/backButton";
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
            setPasswordError("パスワード未入力。");
        } else {
            setPasswordError("");
        }
    };

    const validateAgainPass = () => {
        if (!password) {
            setAgainPassError("パスワード未入力。");
        } else {
            setAgainPassError("");
        }
    };

    const validateEmail = () => {
        if (!password) {
            setEmailError("メールアドレス未入力。");
        } else {
            setEmailError("");
        }
    };

    const contents = {
        width: '90%',
        display: 'flex',
        height: '80px',
        borderBottom: '1px dashed black',
        margin: '10px auto 0px',
        alignItems: 'center',
    }

    const contentsName = {
        display: 'flex',
        width: '50%',
    }

    return(
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <h1>新規登録</h1>
                <div style={contents}>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <p>ユーザー名</p>
                            <p>※10文字以内</p>
                            <p>※半角・全角OK！</p>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!nameError}>
                                <Input placeholder='ユーザー名' size='md'　value={name} onChange={handleNameChange} onBlur={validateName}/>
                                <FormErrorMessage>{nameError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <p>パスワード</p>
                            <p>※8文字以内</p>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!passwordError}>
                                <Input placeholder='パスワード' size='md'　value={password} onChange={handlePasswordChange}  onBlur={validatePassword}/>
                                <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <p>パスワード再入力</p>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!passwordError}>
                                <Input placeholder='パスワード再入力' size='md'　value={againPass} onChange={handleAgainPasswordChange} onBlur={validateAgainPass}/>
                                <FormErrorMessage>{againPassError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <p>メールアドレス</p>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!passwordError}>
                                <Input placeholder='メールアドレス' size='md'　value={email} onChange={handleEmailChange} onBlur={validateEmail}/>
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <Flex justifyContent="space-between" marginTop="20px" width="95%">
                    <BackButton/>
                    <RegisterConfirmButton name={name} password={password} againPass={againPass} email={email} />
                </Flex>
            </Flex>
        </>
    )
}

export default RegisterPage;
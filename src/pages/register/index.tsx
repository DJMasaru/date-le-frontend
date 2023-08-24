import React, {ChangeEvent, useState} from "react";
import {Flex, Input, Stack, FormControl, FormErrorMessage, Box} from "@chakra-ui/react";
import RegisterConfirmButton from "../../components/registerConfirmButton";
import BackButton from "@/components/backButton";

interface validateErrorProps{
    passwordMismatch:string;
    emailDuplicated:string;
}
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
            setNameError("入力してください。");
        } else {
            setNameError("");
        }
        if (name.length > 10) {
            setNameError("10文字以内です。");
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("入力してください。");
        } else {
            setPasswordError("");
        }
        if (password.length > 8) {
            setPasswordError("8文字以内です。");
        }
    };

    const validateAgainPass = () => {
        if (!againPass) {
            setAgainPassError("入力してください。");
        } else {
            setAgainPassError("");
        }
        if (againPass.length > 8) {
            setAgainPassError("8文字以内です。");
        }
    };

    const validateEmail = () => {
        if (!email) {
            setEmailError("入力してください。");
        } else {
            setEmailError("");
        }
    };

    const handleErrors = ({passwordMismatch,emailDuplicated}:validateErrorProps) => {
        if(passwordMismatch){
            setPasswordError(passwordMismatch)
            setAgainPassError(passwordMismatch)
        }
        if(emailDuplicated){
            setEmailError(emailDuplicated)
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

    const validateMark = {
        background:'red',
        color:'white',
        margin:'5px',
        padding:'2px',
        fontWeight:'bold',
        fontSize:'12px'
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
                            <Box style={{display:'flex',alignItems:'center'}}>
                                <p style={validateMark}>必須</p>
                                <p>ユーザー名</p>
                            </Box>
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
                            <Box style={{display:'flex',alignItems:'center'}}>
                                <p style={validateMark}>必須</p>
                                <p>パスワード</p>
                            </Box>
                            <p>※8文字以内</p>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!passwordError}>
                                <Input placeholder='パスワード' size='md'　value={password.replace(/./g, '*')} onChange={handlePasswordChange}  onBlur={validatePassword}/>
                                <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <Box style={{display:'flex',alignItems:'center'}}>
                                <p style={validateMark}>必須</p>
                                <p>パスワード再入力</p>
                            </Box>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!againPassError}>
                                <Input placeholder='パスワード再入力' size='md'　value={againPass.replace(/./g, '*')} onChange={handleAgainPasswordChange} onBlur={validateAgainPass}/>
                                <FormErrorMessage>{againPassError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <Box style={{display:'flex',alignItems:'center'}}>
                                <p style={validateMark}>必須</p>
                                <p>メールアドレス</p>
                            </Box>
                        </Stack>
                    </div>
                    <div style={contentsName}>
                        <Stack spacing={0}>
                            <FormControl isInvalid={!!emailError}>
                                <Input placeholder='メールアドレス' size='md'　value={email} onChange={handleEmailChange} onBlur={validateEmail}/>
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </div>
                </div>
                <Flex justifyContent="space-between" marginTop="20px" width="95%">
                    <BackButton/>
                    <RegisterConfirmButton name={name} password={password} againPass={againPass} email={email} onErrors={handleErrors}/>
                </Flex>
            </Flex>
        </>
    )
}

export default RegisterPage;
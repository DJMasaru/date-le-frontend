import { Button } from "@chakra-ui/react";
import React, {useState} from "react";
import {useRouter} from 'next/router';
import axios from "axios";

interface RegisterConfirmProps {
    name:string;
    password : string;
    againPass : string;
    email : string;
    onErrors:any;
}

interface Errors {
    passwordMismatch?: string;
    emailDuplicated?: string;
    // 他のエラーに関するプロパティもここに追加することができます
}

const RegisterConfirm = (props : RegisterConfirmProps) => {
    const router = useRouter();
    const { name, password,againPass, email,onErrors } = props;

    const ChangeConfirm =async ()=>{
        const errors: Errors = {};
        if (password !== againPass) {
            errors.passwordMismatch = "パスワードが一致しません。";
        }

        if(email){
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response =await axios.post('/api/email_validate', {
                email:email,
                },{
                    headers:{
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                let message ="";
                message = response.data.message;
                if(message ==='duplicated'){
                    errors.emailDuplicated = "登録済のアドレスです。";
                }
            } catch (error) {
                // ログイン失敗時の処理
                console.error(error);
            }
        }

        //親コンポーネントにエラーを返す。
        if (Object.keys(errors).length > 0) {
            onErrors(errors);
            return;
        }
        if (name && name.length< 11 &&
            password && password.length<9 &&
            againPass && againPass.length<9 &&
            email && password === againPass) {
            await router.push({
                pathname: '/register/confirm',
                query: {name, password, email},
            });
        }
    }

    return (
        <Button
            style={{margin:"unset",width:"45%"}}
            colorScheme='blue'
            m={2}
            onClick={ChangeConfirm}
        >
            登録内容を<br/>確認する
        </Button>
    );
}
export default RegisterConfirm;

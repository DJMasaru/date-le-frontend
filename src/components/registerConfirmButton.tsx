import { Button } from "@chakra-ui/react";
import React, {useState} from "react";
import {useRouter} from 'next/router';

interface RegisterConfirmProps {
    name:string;
    password : string;
    againPass : string;
    email : string;
}

const RegisterConfirm = (props : RegisterConfirmProps) => {
    const router = useRouter();
    const { name, password,againPass, email } = props;

    const ChangeConfirm =()=>{
        if (name && password && againPass && email) {
            router.push({
                pathname: '/register/confirm',
                query: {name, password, email},
            });
        }
    }

    return (
        <Button
            background={"blue.300"}
            color="white"
            m={2}
            onClick={ChangeConfirm}
        >
            登録内容を<br/>確認する
        </Button>
    );
}
export default RegisterConfirm;

import React from "react";
import { useRouter } from 'next/router';
import {Flex, Text} from "@chakra-ui/react";
import RegisterComplete from "../../components/registerCompleteButton";
import BackButton from "@/components/backButton";

const ConfirmPage =()=>{
    const router = useRouter();
    const { name, password, email } = router.query as {
        name: string;
        password: string;
        email: string;
    };

    const cellStyle = {width: '50%'}

    const contents = {
        width: '90%',
        display: 'flex',
        height: '80px',
        borderBottom: '1px dashed black',
        margin: '10px auto 0px',
        alignItems: 'center',
    }

    const contentsName = {
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
                <h1>登録内容確認</h1>
                <div style={contents}>
                    <div style={contentsName}>
                        <Text textAlign="center">ユーザー名</Text>
                    </div>
                    <div style={contentsName}>
                        <Text textAlign="center">{name}</Text>
                    </div>
                </div>

                <div style={contents}>
                    <div style={contentsName}>
                        <Text textAlign="center">パスワード</Text>
                    </div>
                    <div style={contentsName}>
                        <Text textAlign="center">{password.replace(/./g, '*')}</Text>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <Text textAlign="center">メールアドレス</Text>
                    </div>
                    <div style={contentsName}>
                        <Text textAlign="center">{email}</Text>
                    </div>
                </div>
                <Flex justifyContent="space-between" width="95%" alignItems="center">
                    <BackButton/>
                    <RegisterComplete name={name} password={password} email={email} />
                </Flex>
            </Flex>
        </>
    )
}

export default ConfirmPage;
import React from "react";
import { useRouter } from 'next/router';
import {ChakraProvider, Flex, Table, Tbody, Tr, Td} from "@chakra-ui/react";
import RegisterComplete from "../../components/registerCompleteButton";
import ConfirmAgain from "../../components/registerConfirmAgain";

const ConfirmPage =()=>{
    const router = useRouter();
    const { name, password, email } = router.query as {
        name: string;
        password: string;
        email: string;
    };

    const cellStyle = {width: '50%'}

    return(
        <div>
            <ChakraProvider>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                >
                    <h1>登録内容確認</h1>
                    <Table overflowX="auto" maxWidth="50%">
                        <Tbody>
                        <Tr>
                            <Td style={cellStyle}>ユーザー名</Td>
                            <Td style={cellStyle}>{name}</Td>
                        </Tr>
                        <Tr>
                            <Td style={cellStyle}>パスワード</Td>
                            <Td style={cellStyle}>{password}</Td>
                        </Tr>
                        <Tr>
                            <Td style={cellStyle}>メールアドレス</Td>
                            <Td style={cellStyle}>{email}</Td>
                        </Tr>
                        </Tbody>
                    </Table>
                    <Flex justifyContent="space-between">
                        <ConfirmAgain/>
                        <RegisterComplete name={name} password={password} email={email} />
                    </Flex>
                </Flex>
            </ChakraProvider>
        </div>

    )

}

export default ConfirmPage;
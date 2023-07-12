import React from "react";
import {ChakraProvider, Flex} from "@chakra-ui/react";
import { useRouter } from "next/router";
import RegisterAndStart from "../../components/registerAndStartButton";

const CompletePage = () =>{
    const router = useRouter();
    const { password, email } = router.query as {
        password: string;
        email: string;
    };

    return(
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <p>登録が完了しました。</p>
                <RegisterAndStart password={password} email={email} />
            </Flex>
        </>
    )
}

export default CompletePage;
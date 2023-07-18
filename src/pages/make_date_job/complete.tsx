import React from "react";
import {ChakraProvider, Flex} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReturnDashboard from "../../components/makeDateJobReturnDashboardButton";

const CompletePage = () =>{
    const router = useRouter();

    return(
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <p>登録が完了しました。</p>
                <ReturnDashboard />
            </Flex>
        </>
    )
}

export default CompletePage;
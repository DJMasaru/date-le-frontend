import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ReturnLoginButton=()=>{

    return(
        <div>
            <Link href="/login">
                <Button
                    colorScheme='blue'
                    m={2}
                >
                    ログイン画面<br/>に戻る
                </Button>
            </Link>
        </div>
    )
}

export default ReturnLoginButton;
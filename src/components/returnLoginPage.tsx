import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ReturnLoginButton=()=>{

    return(
        <div>
            <Link href="/login">
                <Button
                    background={"blue.300"}
                    color="white"
                    m={2}
                >
                    ログイン画面<br/>に戻る
                </Button>
            </Link>
        </div>
    )
}

export default ReturnLoginButton;
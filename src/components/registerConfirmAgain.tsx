import { Button } from "@chakra-ui/react";
import Link from "next/link";

const RegisterConfirmAgainButton=()=>{

    return(
        <div style={{width:"45%"}}>
            <Link href="/register">
                <Button
                    style={{width:"100%"}}
                    colorScheme='blue'
                    m={2}
                >
                    やり直す
                </Button>
            </Link>
        </div>
    )
}

export default RegisterConfirmAgainButton;
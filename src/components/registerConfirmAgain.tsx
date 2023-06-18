import { Button } from "@chakra-ui/react";
import Link from "next/link";

const RegisterConfirmAgainButton=()=>{

    return(
        <div>
            <Link href="/register">
                <Button
                    background={"blue.300"}
                    color="white"
                    m={2}

                >
                    やり直す
                </Button>
            </Link>
        </div>
    )
}

export default RegisterConfirmAgainButton;
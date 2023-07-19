import { Button } from "@chakra-ui/react";
import Link from "next/link";

const MakeDateJobConfirmAgainButton=()=>{

    return(
        <div>
            <Link href="/make_date_job">
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

export default MakeDateJobConfirmAgainButton;
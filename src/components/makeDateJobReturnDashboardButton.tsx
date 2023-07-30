import { Button } from "@chakra-ui/react";
import Link from "next/link";

const MakeDateJobConfirmAgainButton=()=>{

    return(
        <div>
            <Link href="/dashboard">
                <Button
                    colorScheme='blue'
                    m={2}
                >
                    ダッシュボードに戻る
                </Button>
            </Link>
        </div>
    )
}

export default MakeDateJobConfirmAgainButton;
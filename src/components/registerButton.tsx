import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Register = () => {
    return (
        <Link href="/register">
            <Button
                background={"blue.300"}
                color="white"
                m={2}
            >
                新規登録
            </Button>
        </Link>
    );
}

export default Register;

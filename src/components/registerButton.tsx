import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Register = () => {
    return (
        <Link href="/register">
            <Button
                colorScheme='blue'
                m={2}
            >
                新規登録
            </Button>
        </Link>
    );
}

export default Register;

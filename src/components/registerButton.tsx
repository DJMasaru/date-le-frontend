import { Box, Button } from "@chakra-ui/react";

function Register() {
    return (
        <Box p={4}>
            <Button
                background={"blue.300"}
                mt={4}
                color="white"
            >
                新規登録
            </Button>
        </Box>
    );
}

export default Register;

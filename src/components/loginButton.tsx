import { Box, Button } from "@chakra-ui/react";

function Login() {
    return (
        <Box p={4}>
            <Button
                background={"blue.300"}
                mt={4}
                color="white"
            >
                ログイン
            </Button>
        </Box>
    );
}

export default Login;

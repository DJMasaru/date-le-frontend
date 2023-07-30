import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

interface LoginButtonProps {
    email: string;
    password: string;
    onStateChange: (state: string) => void;
}

const LoginBtn = (props: LoginButtonProps) => {
    const { onStateChange } = props;
    const router = useRouter();
    const handleLogin =async()=>{
        try {
            const response = await axios.post('/api/login', {
                email: props.email,
                password: props.password,
            });
            const accessToken = response.data.access_token;
            localStorage.setItem('date-le-accessToken', accessToken);
            await router.push('/dashboard');
            }catch(error) {
            console.error(error);
            const errorMessage = 'エラーが発生しました';
            onStateChange(errorMessage);
        }
    }

    return (
        <div>
            <Button
                colorScheme='blue'
                m={2}
                onClick={handleLogin}
            >
                ログイン
            </Button>
        </div>
    );
}

export default LoginBtn;

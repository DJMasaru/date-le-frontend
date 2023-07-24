import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

interface LoginButtonProps {
    email: string;
    password: string;
    onStateChange: (state: string) => void; // onStateChangeプロパティを追加
}

const LoginBtn = (props: LoginButtonProps) => {
    const { onStateChange } = props;
    const router = useRouter();
    const handleLogin =async()=>{
        try {
            const response = await axios.post('/api/login', {
                email: props.email, // ログインIDをAPIに渡す
                password: props.password, // パスワードをAPIに渡す
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
                background={"blue.300"}
                color="white"
                m={2}
                onClick={handleLogin}
            >
                ログイン
            </Button>
        </div>
    );
}

export default LoginBtn;

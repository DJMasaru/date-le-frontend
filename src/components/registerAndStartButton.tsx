import axios from "axios";
import {useRouter} from "next/router";
import {Button} from "@chakra-ui/react";

axios.defaults.baseURL = 'http://localhost:8000';

interface RegisterAndStartButtonProps{
    password : string;
    email : string;
}

const RegisterAndStartButton=(props: RegisterAndStartButtonProps)=>{
    const router = useRouter();
    const handleRegisterAndStart = async ()=>{
        try {
            const response = await axios.post('/api/login', {
                email: props.email, // ログインIDをAPIに渡す
                password: props.password, // パスワードをAPIに渡す
            });
            const accessToken = response.data.access_token;
            localStorage.setItem('date-le-accessToken', accessToken);
            await router.push('/dashboard');

            // ログイン成功時の処理
            console.log(response.data);
        } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    }

    return(
        <div>
            <Button
                background={"blue.300"}
                color="white"
                m={2}
                onClick={handleRegisterAndStart}
            >
                はじめる
            </Button>
        </div>
    )

}

export default RegisterAndStartButton;
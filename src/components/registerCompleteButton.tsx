import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

axios.defaults.baseURL = 'http://localhost:8000';

interface RegisterCompleteProps{
    name:string;
    password : string;
    email : string;
}

const RegisterCompleteButton=( props: RegisterCompleteProps)=>{
    const router = useRouter();
    const handleRegisterComplete　=async()=>{
        try {
            const response = await axios.post('/api/register', {
                name: props.name,
                email: props.email, // ログインIDをAPIに渡す
                password: props.password, // パスワードをAPIに渡す
            }); // ログイン成功時の処理
            await router.push('/register/complete');
            console.log(response.data);
        } catch (error) {
        // ログイン失敗時の処理
        console.error(error);
    }
};

    return(
        <div>
            <Button
                background={"blue.300"}
                color="white"
                m={2}
                onClick={handleRegisterComplete}
            >
                登録する
            </Button>
        </div>
    )
}

export default RegisterCompleteButton;
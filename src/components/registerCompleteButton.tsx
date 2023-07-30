import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

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
                email: props.email,
                password: props.password,
            }); // ログイン成功時の処理
            await router.push({
                pathname: '/register/complete',
                query: {
                    email: props.email,
                    password: props.password,
                },
            });
            console.log(response.data);
            } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    };

    return(
            <Button
                style={{width:"45%"}}
                colorScheme='blue'
                m={2}
                onClick={handleRegisterComplete}
            >
                登録する
            </Button>
    )
}

export default RegisterCompleteButton;
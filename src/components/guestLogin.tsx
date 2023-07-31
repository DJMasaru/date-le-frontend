import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

const GuestLogin=()=>{
    const router = useRouter();
    const handleGuestLogin =async()=>{
        try {
            const response = await axios.post('/api/login', {
                email: 'example@example.example',
                password: 'exampleexample',
            });
            const accessToken = response.data.access_token;
            localStorage.setItem('date-le-accessToken', accessToken);
            await router.push('/dashboard');
        }catch(error) {
            console.error(error);
        }
    }

    return(
        <Button
            colorScheme='gray'
            m={2}
            onClick={handleGuestLogin}
        >
            ゲストログインはこちら
        </Button>
    )

}

export default GuestLogin;
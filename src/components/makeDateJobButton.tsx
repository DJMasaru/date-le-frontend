import { Button } from "@chakra-ui/react";
import {useRouter} from "next/router";

interface makeDateJobComfirmButtonProps{
    name?:string;
}

const MakeDateJobButton=({name}:makeDateJobComfirmButtonProps)=>{
    const router = useRouter();
    const handleMakeDateJobButton　=async()=>{
        try {
            await router.push({
                pathname: '/makeDateJob',
                query: {name},
            });

        } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    };

    return(
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
            <Button
                background={"blue.300"}
                color="white"
                m={2}
                onClick={handleMakeDateJobButton}
                style={{width:"95%"}}
            >
                デートの予定を作る
            </Button>
        </div>
    )
}

export default MakeDateJobButton;
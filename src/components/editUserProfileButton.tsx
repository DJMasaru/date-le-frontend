import { Button } from "@chakra-ui/react";
import {useRouter} from "next/router";

interface EditUserProfileProps{
    userID?:number;
}

const EditUserProfileButton = ({userID}: EditUserProfileProps) => {

    const router = useRouter();
    const handleEditGirlsInfo = async () => {
        try {
            await router.push({
                pathname: '/profile/edit',
                query: {
                    userID
                },
            });
        } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    };

    return(
        <div style={{width:"100%",display:"flex",justifyContent:"right"}}>
            <Button
                colorScheme='blue'
                m={2}
                onClick={handleEditGirlsInfo}
                style={{width:"95%",margin:"0"}}
            >
                編集する
            </Button>
        </div>
    )
}

export default EditUserProfileButton;
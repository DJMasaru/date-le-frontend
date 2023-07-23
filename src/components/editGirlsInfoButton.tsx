import { Button } from "@chakra-ui/react";
import {useRouter} from "next/router";

interface editGirlsInfoProps{
    index?:string;
    name?: string;
    age?:number;
    image_url?:string;
    occupation?:string;
    address?:string;
    birthday?:string;
    character?:string;
    hobby?:string;
    favorite_foods?:string;
    dislike_foods?:string;
    favorite_type_of_man?:string;
    opportunity_to_meet?:string;
    has_boyfriend?:number;
    count_of_dates?:number;
    notice?:string;
}

const EditGirlsInfoButton = ({index, name, age, image_url, occupation, address, birthday, character, hobby, favorite_foods, dislike_foods,
                                 favorite_type_of_man, opportunity_to_meet, has_boyfriend, count_of_dates, notice}: editGirlsInfoProps) => {

    const router = useRouter();
    const handleEditGirlsInfo = async () => {
        try {
            await router.push({
                pathname: '/checkGirlsInfo/edit',
                query: {
                    index, name, age, image_url, occupation, address, birthday, character, hobby,
                    favorite_foods, dislike_foods, favorite_type_of_man, opportunity_to_meet, has_boyfriend, count_of_dates, notice
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
                background={"blue.300"}
                color="white"
                m={2}
                onClick={handleEditGirlsInfo}
                style={{width:"95%",margin:"0"}}
            >
                編集する
            </Button>
        </div>
    )
}

export default EditGirlsInfoButton;
import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

interface editGirlsInfoCompleteProps{
    index?:number;
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

const EditGirlsInfoCompleteButton=({index, name, age, image_url, occupation, address, birthday, character, hobby, favorite_foods, dislike_foods,
                                       favorite_type_of_man, opportunity_to_meet, has_boyfriend, count_of_dates, notice}: editGirlsInfoCompleteProps)=>{

    const router = useRouter();
    const index_number = index !== undefined ? parseInt(String(index)) : 0;
    const handleEditGirlsInfoComplete = async () => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.put('/api/edit_girls_info', {
                name:name,
                age:age,
                // image_url,
                occupation:occupation,
                address:address,
                birthday:birthday,
                character:character,
                hobby:hobby,
                favorite_foods:favorite_foods,
                dislike_foods:dislike_foods,
                favorite_type_of_man:favorite_type_of_man,
                opportunity_to_meet:opportunity_to_meet,
                has_boyfriend:has_boyfriend,
                count_of_dates:count_of_dates,
                notice:notice,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await router.push({
                pathname: `/checkGirlsInfo/${index_number}`,

            });
            console.log(response.data);
        } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    };

    return(
        <div style={{width:"45%",display:"flex",justifyContent:"right"}}>
            <Button
                background={"blue.300"}
                color="white"
                onClick={handleEditGirlsInfoComplete}
                style={{width:"100%"}}
            >
                更新する
            </Button>
        </div>
    )
}

export default EditGirlsInfoCompleteButton;
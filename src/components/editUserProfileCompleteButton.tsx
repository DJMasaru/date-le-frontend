import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

interface EditUserProfileCompleteProps{
    userID?:number;
    girlsID?:number;
    id?:number;
    address?:string;
    name?:string;
    occupation?:string;
    notice?:string;
    image_url?:string;
    hobby?:string;
    birthday?:string;
    girl_experiences?:number;
    age?:number;
    favorite_feature?:string;
    favorite_date_time?:string;
    favorite_date_place?:string;
    favorite_clothes?:string;
    favorite_character?:string;
    favorite_age_range?:string;
}

const EditUserProfileCompleteButton=({id,userID, name, age, occupation, address, hobby, girl_experiences,
    favorite_feature, favorite_date_time,birthday,
    favorite_date_place, favorite_clothes, favorite_character, favorite_age_range, notice,
    // image_url,
    }: EditUserProfileCompleteProps)=>{

    const router = useRouter();
    const handleEditUserProfileComplete = async () => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.put('/api/edit_user_profile', {
                id:id,
                userID:userID,
                address:address,
                name:name,
                occupation:occupation,
                notice:notice,
                // image_url:image_url,
                hobby:hobby,
                birthday:birthday,
                girl_experiences:girl_experiences,
                age:age,
                favorite_feature:favorite_feature,
                favorite_date_time:favorite_date_time,
                favorite_date_place:favorite_date_place,
                favorite_clothes:favorite_clothes,
                favorite_character:favorite_character,
                favorite_age_range:favorite_age_range,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await router.push({
                pathname: `/profile`,

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
                colorScheme='blue'
                onClick={handleEditUserProfileComplete}
                style={{width:"100%"}}
            >
                更新する
            </Button>
        </div>
    )
}

export default EditUserProfileCompleteButton;
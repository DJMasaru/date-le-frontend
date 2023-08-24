import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

interface editGirlsInfoCompleteProps{
    girlsID?:number,
    index?:number;
    name?: string;
    age?:number;
    image_url?:string;
    occupation?:string;
    address?:string;
    birthday?:string;
    character?:string;
    feature_first?:string;
    feature_second?:string;
    feature_third?:string;
    hobby?:string;
    favorite_foods?:string;
    dislike_foods?:string;
    favorite_type_of_man?:string;
    opportunity_to_meet?:string;
    has_boyfriend?:number;
    count_of_dates?:number;
    notice?:string;
}

const EditGirlsInfoCompleteButton=({girlsID, index, name, age, image_url, occupation, address, birthday, character,feature_first,feature_second,feature_third,
                                       hobby, favorite_foods, dislike_foods, favorite_type_of_man, opportunity_to_meet,
                                       has_boyfriend, count_of_dates, notice}: editGirlsInfoCompleteProps)=>{

    const router = useRouter();
    const index_number = index !== undefined ? parseInt(String(index)) : 0;
    const handleEditGirlsInfoComplete = async () => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.put('/api/edit_girls_info', {
                girlsID:girlsID,
                name:name,
                age:age,
                image_url:image_url,
                occupation:occupation,
                address:address,
                birthday:birthday,
                character:character,
                feature_first:feature_first,
                feature_second:feature_second,
                feature_third:feature_third,
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
                colorScheme='blue'
                onClick={handleEditGirlsInfoComplete}
                style={{width:"100%"}}
            >
                更新する
            </Button>
        </div>
    )
}

export default EditGirlsInfoCompleteButton;
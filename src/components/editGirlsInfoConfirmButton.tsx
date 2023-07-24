import { Button } from "@chakra-ui/react";
import {useRouter} from "next/router";

interface editGirlsInfoConfirmProps{
    girlsID?:number;
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

const EditGirlsInfoConfirmButton = ({girlsID,index, name, age, image_url, occupation, address, birthday, character, feature_first, feature_second, feature_third, hobby, favorite_foods, dislike_foods,
                                 favorite_type_of_man, opportunity_to_meet, has_boyfriend, count_of_dates, notice}: editGirlsInfoConfirmProps) => {

    const router = useRouter();
    const handleEditGirlsInfoConfirm =()=>{
            router.push({
                pathname: '/checkGirlsInfo/confirm',
                query: {girlsID, index, name, age,
                    // image_url,
                    occupation, address, birthday, character, feature_first, feature_second, feature_third,
                    hobby, favorite_foods, dislike_foods, favorite_type_of_man, opportunity_to_meet,
                    has_boyfriend, count_of_dates, notice},
            });
    }

        return(
        <div style={{width:"45%",display:"flex",justifyContent:"right"}}>
            <Button
                background={"blue.300"}
                color="white"
                onClick={handleEditGirlsInfoConfirm}
                style={{width:"100%"}}
            >
                確認する
            </Button>
        </div>
    )
}

export default EditGirlsInfoConfirmButton;
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
    feature_first?: string | undefined;
    feature_second?: string | undefined;
    feature_third?: string | undefined;
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
        // @ts-ignore
        if (name && feature_first?.length < 6 && feature_second?.length < 6 && feature_third?.length < 6 ) {
            router.push({
                pathname: '/checkGirlsInfo/confirm',
                query: {
                    girlsID, index, name, age,
                    image_url,
                    occupation, address, birthday, character, feature_first, feature_second, feature_third,
                    hobby, favorite_foods, dislike_foods, favorite_type_of_man, opportunity_to_meet,
                    has_boyfriend, count_of_dates, notice
                },
            });
        }
    }

        return(
        <div style={{width:"45%",display:"flex",justifyContent:"right"}}>
            <Button
                colorScheme='blue'
                onClick={handleEditGirlsInfoConfirm}
                style={{width:"100%"}}
            >
                確認する
            </Button>
        </div>
    )
}

export default EditGirlsInfoConfirmButton;
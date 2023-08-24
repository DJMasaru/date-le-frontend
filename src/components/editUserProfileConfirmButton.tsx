import { Button } from "@chakra-ui/react";
import {useRouter} from "next/router";

interface EditUserProfileConfirmProps{
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

const EditUserProfileConfirmButton = ({userID, name, age, occupation, address, hobby, girl_experiences,
                                          favorite_feature, favorite_date_time,birthday,
                                          favorite_date_place, favorite_clothes, favorite_character, favorite_age_range, notice,
                                         image_url
                                      }: EditUserProfileConfirmProps) => {

    const router = useRouter();
    const handleEditUserProfileConfirm =()=>{
        if(name) {
            router.push({
                pathname: '/profile/confirm',
                query: {
                    userID, name, age, occupation, address, hobby, girl_experiences,
                    favorite_feature, favorite_date_time, birthday,
                    favorite_date_place, favorite_clothes, favorite_character, favorite_age_range, notice,
                    image_url,
                }
            });
        }
    }

        return(
        <div style={{width:"45%",display:"flex",justifyContent:"right"}}>
            <Button
                colorScheme='blue'
                onClick={handleEditUserProfileConfirm}
                style={{width:"100%"}}
            >
                確認する
            </Button>
        </div>
    )
}

export default EditUserProfileConfirmButton;
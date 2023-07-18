import { Button } from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";

interface MakeDateJobCompleteProps{
    girlsNameConfirm:string;
    dateOfDate : string;
    timeOfDate : string;
    placeOfDate? : string;
    passion? : string;
    target? : string;
}

const MakeDateJobCompleteButton=( props: MakeDateJobCompleteProps)=>{
    const router = useRouter();
    const handleMakeDateJobComplete　=async()=>{
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const userData = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(userData);
            const response = await axios.post('/api/make_date_job', {
                user: userData.data.user,
                girlsNameConfirm: props.girlsNameConfirm,
                dateOfDate: props.dateOfDate,
                timeOfDate: props.timeOfDate,
                placeOfDate: props.placeOfDate,
                passion: props.passion,
                target: props.target,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await router.push({
                pathname: '/make_date_job/complete',
            });
            console.log(response.data);
        } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    };

    return(
        <div>
            <Button
                background={"blue.300"}
                color="white"
                m={2}
                onClick={handleMakeDateJobComplete}
            >
                登録する
            </Button>
        </div>
    )
}

export default MakeDateJobCompleteButton;
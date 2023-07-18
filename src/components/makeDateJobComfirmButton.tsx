import { Button } from "@chakra-ui/react";
import React, {useState} from "react";
import {useRouter} from 'next/router';

interface MakeDateJobConfirmProps {
    girlsNameConfirm:string;
    dateOfDate : string;
    timeOfDate : string;
    placeOfDate? : string;
    passion? : string;
    target? : string;
}

const MakeDateJobConfirm = (props : MakeDateJobConfirmProps) => {
    const router = useRouter();
    const { girlsNameConfirm, dateOfDate,timeOfDate, placeOfDate,passion, target } = props;

    const ChangeConfirm =()=>{
        if (girlsNameConfirm && dateOfDate && timeOfDate) {
            router.push({
                pathname: '/make_date_job/confirm',
                query: {girlsNameConfirm, dateOfDate, timeOfDate, placeOfDate, passion, target},
            });
        }
    }

    return (
        <Button
            background={"blue.300"}
            color="white"
            m={2}
            onClick={ChangeConfirm}
        >
            登録内容を<br/>確認する
        </Button>
    );
}
export default MakeDateJobConfirm;

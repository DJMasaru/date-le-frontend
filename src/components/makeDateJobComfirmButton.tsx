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
                pathname: '/makeDateJob/confirm',
                query: {girlsNameConfirm, dateOfDate, timeOfDate, placeOfDate, passion, target},
            });
        }
    }

    return (
        <Button
            colorScheme='blue'
            m={2}
            onClick={ChangeConfirm}
        >
            登録内容を<br/>確認する
        </Button>
    );
}
export default MakeDateJobConfirm;

import {Avatar, Box, Flex, useColorModeValue,} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import theme from "@/theme";
import React from "react";
import {FaCommentDots, FaHeart} from "react-icons/fa6";

interface LogDateCardProps {
    index: number;
    date_of_date:string;
    time_of_date:string;
    place_of_date:string;
    age: number;
    image_url:string;
    name:string;
    occupation:string;
}

const LogDateCard=({index, date_of_date, time_of_date,
                       place_of_date ,name,age,image_url,occupation}:LogDateCardProps)=>{
    const router = useRouter();
    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/dateLog/${index}`);
    };

    return(
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            _hover={{ bg: '#EEF2F6' }} // ホバー時の背景色を指定する
            boxShadow={'2xl'}
            rounded={'lg'}
            p={4}
            mt={1}
            mb={1}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <Flex alignItems="center">
                <Avatar
                    size={'lg'}
                    src={image_url}
                />
                <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                    <p>{date_of_date}　{time_of_date}</p>
                    <p style={{fontWeight:"bold"}}>{name} ({age}) <span style={{color:"#555555",marginLeft:"10px",fontWeight:"normal"}}>{occupation}</span></p>
                    <p>デート場所：{place_of_date}</p>
                </Flex>

            </Flex>

        </Box>
    )
}

export default  LogDateCard;
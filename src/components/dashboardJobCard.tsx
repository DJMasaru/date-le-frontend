import {Avatar, Badge, Box, ChakraProvider, Flex, useColorModeValue,} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import theme from "@/theme";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa6";

interface DashboardJobCardProps{
    index:number;
    name: string;
    age: number;
    occupation:string;
    image_url:string;
    date_of_date: string;
    date_of_time: string;
    date_of_place: string
    comment_count: number;
    favorite_count :number;
    friend_name?: string;
}

const DashboardJobCard = ({ index,name,age,occupation, image_url,date_of_date,date_of_time,
                              date_of_place,comment_count,favorite_count,friend_name }:DashboardJobCardProps) => {

    const router = useRouter();
    const timeParts = date_of_time.split(':');
    const hour = timeParts[0];
    const minute = timeParts[1];

    const dataParts = date_of_date.split('-');
    const year = dataParts[0];
    const month = dataParts[1];
    const monthWithoutZero = parseInt(month, 10).toString();
    const day = dataParts[2];
    const dayWithoutZero = parseInt(day, 10).toString();

    const feature1 = "たぬき顔";
    const feature2 = "爆乳";
    const feature3 = "黒髪";
    const features = [feature1, feature2, feature3].filter(Boolean);

    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/dateDetail/${index}`);
    };

    return (
            <ChakraProvider theme={theme}>
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
                                <p style={{fontWeight:"bold"}}>{name} ({age})</p>
                                <p style={{color:"#555555"}}>{occupation}</p>
                            </Flex>
                        {friend_name &&
                        <p style={{marginLeft:"10px",textDecoration:"underline"}}>☆{friend_name}のデート予定☆</p>
                        }
                    </Flex>
                    <p style={{textAlign:"right",fontWeight:"bold",color:"red"}}>＞</p>
                    <p>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`}  {`${hour}時${minute}分`}　</p>
                    <p>集合場所：{date_of_place}</p>
                    <Flex alignItems="center" justifyContent="start">
                        <div>
                        { features.map((feature, index) =>{
                            return(
                                <Badge
                                    mr={"1rem"}
                                    key={index}
                                    px={2}
                                    py={1}
                                    bg={"gray.200"}
                                    color={"black"}
                                    fontWeight={'400'}
                                >
                                    #{feature}
                                </Badge>
                            )
                        })}
                        </div>
                        <FaHeart /> <p style={{marginRight:"1rem"}}>{favorite_count}</p>
                        <FaCommentDots /> <p style={{marginRight:"1rem"}}>{comment_count}</p>
                    </Flex>
                </Box>
            </ChakraProvider>
    );
}

export default DashboardJobCard;

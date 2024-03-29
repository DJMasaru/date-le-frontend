import {Avatar, Badge, Box, ChakraProvider, Flex, Spacer, useColorModeValue,} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from "react";
import { FaCommentDots } from "react-icons/fa6";

interface DashboardJobCardProps{
    index?:number|undefined;
    name?: string|undefined;
    age?: number|undefined;
    occupation?:string|undefined;
    image_url?:string|undefined;
    feature_first?:string|undefined;
    feature_second?:string|undefined;
    feature_third?:string|undefined;
    date_of_date?: string|undefined;
    time_of_date?: string|undefined;
    place_of_date?: string|undefined;
    comment_count?: number|undefined;
    friend_name?: string|undefined;
    friend?: string|undefined;
    friend_image_url?:string|undefined;
}

const DashboardJobCard = ({ index, name, age, occupation, image_url, feature_first, feature_second, feature_third,
                              date_of_date,time_of_date, place_of_date,comment_count,friend_name,friend,friend_image_url }
                              :DashboardJobCardProps) => {

    const router = useRouter();
    const timeParts = (time_of_date || '').split(':');
    const hour = timeParts[0];
    const minute = timeParts[1];

    const dataParts = (date_of_date || '').split('-');
    const year = dataParts[0];
    const month = dataParts[1];
    const monthWithoutZero = parseInt(month, 10).toString();
    const day = dataParts[2];
    const dayWithoutZero = parseInt(day, 10).toString();


    //値の存在を判定して値を格納
    const features = [feature_first, feature_second, feature_third].filter(Boolean);

    const handleClick = () => {
        if (friend) {
            router.push(`/dateDetail/${index}?type=friend`);
        } else {
            router.push(`/dateDetail/${index}`);
        }
    };

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            _hover={{ bg: '#EEF2F6' }} // ホバー時の背景色を指定する
            boxShadow={'2xl'}
            rounded={'lg'}
            p={4}
            mt={1}
            mb={1}
            onClick={handleClick}
            style={{ cursor: 'pointer',minHeight:'195px' }}
        >
            <Flex alignItems="center">
                <Avatar
                    size={'lg'}
                    src={image_url}
                />
                <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                    <p style={{fontWeight:"bold"}}>{name} {age && `(${age})`}</p>
                    <p style={{color:"#555555"}}>{occupation}</p>
                </Flex>
            </Flex>
            <p style={{textAlign:"right",fontWeight:"bold",color:"red"}}>＞</p>
            <p>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`}  {`${hour}時${minute}分`}　</p>
            {place_of_date && (
            <p>集合場所：{place_of_date}</p>
                )}
            <Flex alignItems="center" justifyContent="space-between">
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
                <Spacer/>
                <FaCommentDots /> <p style={{marginLeft:"0.5rem"}}>{comment_count}件</p>
            </Flex>
            {friend_name &&
            <Flex alignItems="center" justifyContent="end">
                <div>
                    <p style={{textAlign:"right",fontWeight:"bold"}}>{friend_name}のデート</p>
                </div>
                <div>
                    <Avatar
                        size={'sm'}
                        src={friend_image_url}
                    />
                </div>
            </Flex>
            }
        </Box>
    );
}

export default DashboardJobCard;

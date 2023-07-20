import {Avatar, Badge, Box, ChakraProvider, Flex, useColorModeValue,} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import theme from "@/theme";
import React from "react";
import {FaCommentDots, FaHeart} from "react-icons/fa6";

interface GirlsInfoCardProps {
    index?: number;
    image_url?: string;
    name?: string;
    age?: number;
    occupation?: string;
    feature_first?: string;
    feature_second?: string;
    feature_third?: string;
}

const GirlsInfoCard=({ index,image_url,name,age,occupation,
                         feature_first,feature_second,feature_third}:GirlsInfoCardProps)=>{
    const router = useRouter();
    const features = [feature_first, feature_second, feature_third].filter(Boolean);
    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/checkGirlsInfo/${index}`);
    };
console.log(name)
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
                    <p style={{fontWeight:"bold"}}>{name} ({age}) <span style={{color:"#555555",marginLeft:"10px",fontWeight:"normal"}}>{occupation}</span></p>
                    <Flex alignItems="center" justifyContent="start" >
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
                    </Flex>
                </Flex>

            </Flex>

        </Box>
    )
}

export default  GirlsInfoCard;
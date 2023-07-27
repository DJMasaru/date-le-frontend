import {Avatar, Box, Button, Flex, useColorModeValue,} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";

interface FriendshipCardProps {
    id: number;
    image_url:string;
    name:string;
    status:string;
    commonIds: number[];
    onClick: () => void;
}

const FriendshipCard=({id,name,image_url,status,commonIds,onClick}:FriendshipCardProps)=>{
    const router = useRouter();
    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/friendship/${id}`);
    };

    //cardの上にあるボタンを押すときに発火
    const handleChangeFriendship = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        if (status === 'following') {
            alert('Followingアラート');
            onClick();


        } else if (status === 'followed') {
            if (action === '相互') {
                alert('相互アラート');

            } else if (action === '追加') {
                // アラートを表示
                alert('追加アラート');
                setAction('申請中')
            }

            }
        }


    const[action,setAction]=useState('');

    useEffect(() => {
        if (status === 'following') {
            setAction('削除');
        } else {
            // commonIdsにidが含まれるかをチェック
            if (commonIds.includes(id)) {
                // idが該当する場合、状態関数を実行
                setAction('相互');
            } else {
                // idが該当しない場合、別の処理を実行
                // 例えば、setAction('追加')など
                setAction('追加');
            }
        }
    }, [status, commonIds, id]); // status, commonIds, idの値が変更されたときにのみ実行される

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
            <Flex alignItems="center" position="relative">
                <Avatar
                    size={'lg'}
                    src={image_url}
                />
                <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                    <p>{name}</p>
                    {/*<p style={{fontWeight:"bold"}}>{name} ({age}) <span style={{color:"#555555",marginLeft:"10px",fontWeight:"normal"}}>{occupation}</span></p>*/}
                    {/*<p>デート場所：{place_of_date}</p>*/}
                </Flex>
                <div style={{position:"absolute",left:"80%"}}>
                    <Button
                        style={{width:"100%"}}
                        background={"blue.300"}
                        color="white"
                        onClick={handleChangeFriendship}>
                        {action}
                    </Button>
                </div>
            </Flex>

        </Box>
    )
}

export default  FriendshipCard;
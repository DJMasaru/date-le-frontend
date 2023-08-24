import {Avatar, Box, Button, Flex, useColorModeValue,} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";

interface FriendshipCardProps {
    id: number;
    image_url:string;
    name:string;
    status:string;
    commonIds: number[];
    requestCommonIds: number[];
    onClick: (action: string) => void;
    age:number;
    notice:string;
}

const FriendshipCard=({id,name,image_url,status,commonIds,onClick,age,notice,requestCommonIds}:FriendshipCardProps)=>{
    const router = useRouter();
    const[color, setColor]=useState('blue')
    const[action,setAction]=useState('');
    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/friendship/${id}`);
    };

    //cardの上にあるボタンを押すときに発火
    const handleChangeFriendship = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        if (status === 'following') {
            alert('Followingアラート');

            //このコールバック関数は「削除」をする。
            onClick(action);
        }
        if (status === 'requesting') {
            alert('requestingアラート');

            //このコールバック関数は「削除」をする。
            onClick(action);
        }

        if (status === 'followed') {
            if (action === '相互') {
                alert('相互アラート');

                //このコールバック関数は「削除」をする。
                onClick(action);
                setAction('追加')
            } else if (action === '追加') {
                // アラートを表示
                alert('追加アラート');

                //このコールバック関数は「statusを2に更新」する
                onClick(action);
                setAction('申請中')
                setColor('yellow')
            }else if (action === '申請中') {
                // アラートを表示
                alert('申請キャンセルアラート');

                //このコールバック関数は「statusを2に更新」する
                onClick(action);
                setAction('追加')
                setColor('blue')
            }
        }
        if (status === 'requested') {
            if (action === '許可') {
                // アラートを表示
                alert('許可');

                //このコールバック関数は「statusを2に更新」する
                onClick(action);
            }
        }
    }

    useEffect(() => {
        if (status === 'following') {
            setAction('削除');
            setColor('red')
        }

        if (status === 'requesting') {
            setAction('削除');
            setColor('red')
        }

        if(status === 'followed') {
            if (commonIds.includes(id)) {
                // idが該当する場合、状態関数を実行
                setAction('相互');
                setColor('blue')

            }else if(requestCommonIds.includes(id)){
                setAction('申請中');
                setColor('yellow')
            }
            else{
                setAction('追加');
                setColor('blue')
            }
        }

        if (status === 'requested') {
                // idが該当しない場合、別の処理を実行
                // 例えば、setAction('追加')など
                setAction('許可');
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
                    <p style={{fontWeight:"bold"}}>{name}  {age && `(${age})`}   </p>
                    {notice && <p style={{fontSize:"12px"}}>{notice}</p>}
                </Flex>
                <div style={{position:"absolute",left:"80%"}}>
                    <Button
                        style={{width:"100%"}}
                        colorScheme={color}
                        onClick={handleChangeFriendship}>
                        {action}
                    </Button>
                </div>
            </Flex>

        </Box>
    )
}

export default  FriendshipCard;
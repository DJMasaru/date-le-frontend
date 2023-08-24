import {Avatar, Box, Button} from "@chakra-ui/react";
import React, {useState} from "react";
import { useRouter } from 'next/router';
import axios from "axios";

interface SuggestionProps{
    index:number;
    id:number;
    name:string;
    image_url:string;
    status:string;
    fetchFriendshipData:any;
    sliceSuggestion:any;
}
const SuggestUser = ({index,id,name,image_url,status,fetchFriendshipData,sliceSuggestion}:SuggestionProps) => {
    const router = useRouter();
    const[color, setColor]=useState('blue')
    const[action,setAction]=useState('追加');

    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/friendship/${id}`);

    };

    const handleChangeFriendship = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            await axios.post("/api/post_friendship_status", {
                id: id,
                status: 'followed',
                action: action,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            sliceSuggestion(index);
            fetchFriendshipData(); // performSearchFriend を呼び出す
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div style={{padding: "5px"}}>
                <Box height="100%" display="flex" alignItems="center" _hover={{ bg: '#EEF2F6' }} cursor="pointer"　onClick={handleClick}>
                    {id && <Avatar size="md" src={image_url} />}
                    <p>{name}</p>
                    <div style={{position:"absolute",left:"80%"}}>
                        <Button
                            style={{width:"100%"}}
                            colorScheme={color}
                            onClick={handleChangeFriendship}
                        >
                            {action}
                        </Button>
                    </div>
                </Box>
            </div>
        </>
    );
}

export default SuggestUser;

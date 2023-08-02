import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {
    Avatar, Button, Flex,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, useDisclosure, useMediaQuery
} from "@chakra-ui/react";
import Header from "@/components/header";


interface Friend{
    id: number;
    name: string;
    image_url:string;
    occupation:string;
    birthday:string;
    address:string;
    hobby:string;
    girl_experiences:number;
    age:number;
    favorite_date_place:string;
    favorite_date_time:string;
    favorite_clothes:string;
    favorite_character:string;
    favorite_feature:string;
    favorite_age_range:string;
    notice:string;
}
const FriendInfoPage = () =>{
    const router = useRouter();
    const id: string | undefined = typeof router.query.id === 'string' ? router.query.id : undefined;
    const [friendInfo, setFriendInfo] =useState<Friend | null>(null);

    useEffect(() => {
        const fetchFriendshipData = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/friend_info", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        id: id,
                    },
                });
                setFriendInfo(response.data);

            } catch (error) {
                console.error(error);

            }
        }

        fetchFriendshipData();
    }, [id])

    const contents = {
        width: '90%',
        display: 'flex',
        height: '50px',
        borderBottom: '1px dashed black',
        margin: '10px auto 0px'
    }

    const contentsName = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    }

    return(
        <>
            <div>
                <div style={{marginBottom:"20px"}}>
                    <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                        <Header />
                    </div>
                    <div　style={{ width: "95%",display:"flex",margin:"auto",paddingTop: "67px",justifyContent:"center" }}>
                        <Flex alignItems="center">
                            <Avatar
                                size={'lg'}
                                src={friendInfo?.image_url}
                            />
                            <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                <p style={{fontWeight:"bold"}}>{friendInfo?.name} {friendInfo?.age && `(${friendInfo?.age})`}</p>
                            </Flex>
                        </Flex>
                    </div>
                    {friendInfo?.occupation &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>職業</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{friendInfo?.occupation}</p>
                            </div>
                        </div>
                    )}
                    {friendInfo?.address &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>住所</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.address}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.birthday &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>誕生日</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.birthday}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.hobby &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>趣味</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.hobby}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.occupation &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>職業</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.occupation}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.girl_experiences &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>経験人数</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.girl_experiences}人</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.favorite_date_place &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>好きなデート場所</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.favorite_date_place}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.favorite_date_time &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>好きなデートの時間帯</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.favorite_date_time}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.favorite_clothes &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>相手の理想の服装</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.favorite_clothes}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.favorite_character &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>理想の相手の性格</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.favorite_character}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.favorite_feature &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>相手の理想の特徴</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.favorite_feature}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.favorite_age_range &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>相手の理想の年齢</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.favorite_age_range}</p>
                        </div>
                    </div>
                    )}
                    {friendInfo?.notice &&(
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>備考</p>
                        </div>
                        <div style={contentsName}>
                            <p>{friendInfo?.notice}</p>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}



export default FriendInfoPage;
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
    age:number;
    image_url:string;
    occupation:string;
    address:string;
    birthday:string;
    character:string;
    feature_first:string;
    feature_second:string;
    feature_third:string;
    hobby:string;
    favorite_foods:string;
    dislike_foods:string;
    favorite_type_of_man:string;
    opportunity_to_meet:string;
    has_boyfriend:number;
    count_of_dates:number;
    notice:string;
}
const GirlsInfoPage = () =>{
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const id: string | undefined = typeof router.query.id === 'string' ? router.query.id : undefined;
    const [friendInfo, setFriendInfo] =useState<Friend | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(id);
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
                                <p style={{fontWeight:"bold"}}>{friendInfo?.name}
                                    {/*({girlsInfo?.age})*/}
                                </p>
                                {/*<p style={{color:"#555555"}}>{girlsInfo?.occupation}</p>*/}
                            </Flex>
                        </Flex>
                    </div>
                    {/*{girlsInfo?.opportunity_to_meet &&(*/}
                    {/*    <div style={contents}>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>出会いのキッカケ</p>*/}
                    {/*        </div>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>{girlsInfo?.opportunity_to_meet}</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/*{girlsInfo?.address &&(*/}
                    {/*    <div style={contents}>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>住所</p>*/}
                    {/*        </div>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>{girlsInfo?.address}</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/*{girlsInfo?.birthday &&(*/}
                    {/*    <div style={contents}>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>誕生日</p>*/}
                    {/*        </div>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>{girlsInfo?.birthday}</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/*{girlsInfo?.character &&(*/}
                    {/*    <div style={contents}>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>性格</p>*/}
                    {/*        </div>*/}
                    {/*        <div style={contentsName}>*/}
                    {/*            <p style={{textAlign:"center"}}>{girlsInfo?.character}</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </>
    )
}



export default GirlsInfoPage;
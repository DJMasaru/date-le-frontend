import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {
    Avatar,
    Badge,
    Button,
    ChakraProvider,
    Flex, Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select,
    useMediaQuery
} from "@chakra-ui/react";
import Header from "@/components/header";
import MakeDateJobButton from "@/components/makeDateJobButton";


interface Girl{
    id: string;
    name: string;
    age:number;
    image_url:string;
    occupation:string;
    address:string;
    birthday:string;
    character:string;
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
    const { index } = router.query;

    const [girlsInfo, setGirlsInfo] =useState<Girl | null>(null);

console.log(index);
    console.log(girlsInfo)
    useEffect(() => {
        const fetchGirlsInfo = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/girls_info", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        index: index,
                    },
                });
                setGirlsInfo(response.data);

            } catch (error) {
                console.error(error);

            }
        }

        fetchGirlsInfo();
    }, [index])

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
            {isMobile ? (
                <div>
                    <div>
                        <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                                <Header />
                        </div>
                        <div　style={{ width: "95%",display:"flex",margin:"auto",paddingTop: "67px",justifyContent:"center" }}>
                            <Flex alignItems="center">
                                <Avatar
                                    size={'lg'}
                                    src={girlsInfo?.image_url}
                                />
                                <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                    <p style={{fontWeight:"bold"}}>{girlsInfo?.name} ({girlsInfo?.age})</p>
                                    <p style={{color:"#555555"}}>{girlsInfo?.occupation}</p>
                                </Flex>
                            </Flex>
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <MakeDateJobButton
                                name={girlsInfo?.name}
                            />
                        </div>
                        {girlsInfo?.opportunity_to_meet &&(
                            <div style={contents}>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>出会いのキッカケ</p>
                                </div>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>{girlsInfo?.opportunity_to_meet}</p>
                                </div>
                            </div>
                        )}
                        {girlsInfo?.address &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>住所</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.address}</p>
                            </div>
                        </div>
                            )}
                        {girlsInfo?.birthday &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>誕生日</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.birthday}</p>
                            </div>
                        </div>
                            )}
                        {girlsInfo?.character &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>性格</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.character}</p>
                            </div>
                        </div>
                            )}
                        {girlsInfo?.hobby &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>趣味</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.hobby}</p>
                            </div>
                        </div>
                            )}
                        {girlsInfo?.favorite_foods &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>好きな食べ物</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.favorite_foods}</p>
                            </div>
                        </div>
                            )}
                        {girlsInfo?.dislike_foods &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>苦手な食べ物</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.dislike_foods}</p>
                            </div>
                        </div>
                        )}
                        {girlsInfo?.favorite_type_of_man && (
                            <div style={contents}>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>好きな男性のタイプ</p>
                                </div>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>{girlsInfo?.favorite_type_of_man
                                    }</p>
                                </div>
                            </div>
                        )}
                        {girlsInfo?.has_boyfriend  && (
                            <div style={contents}>
                                <div style={contentsName}>
                                    <p style={{ textAlign: "center" }}>彼氏の有無</p>
                                </div>
                                <div style={contentsName}>
                                    <p style={{ textAlign: "center" }}>
                                        {girlsInfo?.has_boyfriend === 1 ? "あり" : girlsInfo?.has_boyfriend === 0 ? "なし" : "不明"}
                                    </p>
                                </div>
                            </div>
                        )}
                        {girlsInfo?.count_of_dates &&(
                            <div style={contents}>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>これまでのデート回数</p>
                                </div>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>{girlsInfo?.count_of_dates}回</p>
                                </div>
                            </div>
                        )}
                        {girlsInfo?.notice &&(
                            <div style={contents}>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>備考</p>
                                </div>
                                <div style={contentsName}>
                                    <p style={{textAlign:"center"}}>{girlsInfo?.notice}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                ) : (
                <p>Desktop View</p>
                )}
        </>
    )
}



export default GirlsInfoPage;
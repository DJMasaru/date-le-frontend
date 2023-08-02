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
import MakeDateJobButton from "@/components/makeDateJobButton";
import EditGirlsInfoButton from "@/components/editGirlsInfoButton";

interface Girl{
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
    const index: string | undefined = typeof router.query.index === 'string' ? router.query.index : undefined;
    const [girlsInfo, setGirlsInfo] =useState<Girl | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    const handleDeleteGirlsInfo　=async()=>{
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");

            const response = await axios.delete('/api/delete_girls_info', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    girlsInfo: girlsInfo,
                },

            }); // ログイン成功時の処理
            console.log(response.data.message);
            await router.push({
                pathname: '/checkGirlsInfo',

            });
            console.log(response.data);

        } catch (error) {
            // ログイン失敗時の処理

            console.error(error);
        }
    };

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
                                src={girlsInfo?.image_url}
                            />
                            <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                <p style={{fontWeight:"bold"}}>{girlsInfo?.name} {girlsInfo?.age && `(${girlsInfo?.age})`}</p>
                                <p style={{color:"#555555"}}>{girlsInfo?.occupation}</p>
                            </Flex>
                        </Flex>
                    </div>
                    <div style={{display:"flex", justifyContent:"center",width:"95%",margin:"10px auto"}}>
                        <div style={{width:"50%",textAlign:"left",display:"flex",justifyContent:"left"}}>
                                <Button
                                    colorScheme='red'
                                    m={2}
                                    style={{margin:"0",width:"90%"}}
                                    onClick={onOpen}>
                                        <p>削除する</p>
                                </Button>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>本当に削除しますか？</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                         </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme='gray' mr={3} onClick={onClose}>
                                                閉じる
                                            </Button>
                                            <Button colorScheme='red' onClick={handleDeleteGirlsInfo}>削除する</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                        </div>
                        <div style={{width:"50%",textAlign:"right"}}>
                            <EditGirlsInfoButton
                                //このgirlsIDは編集するときにどの女の子かを識別するときに必要
                                girlsID={girlsInfo?.id}
                                index={index}
                                name={girlsInfo?.name}
                                age={girlsInfo?.age}
                                image_url={girlsInfo?.image_url}
                                occupation={girlsInfo?.occupation}
                                address={girlsInfo?.address}
                                birthday={girlsInfo?.birthday}
                                character={girlsInfo?.character}
                                feature_first={girlsInfo?.feature_first}
                                feature_second={girlsInfo?.feature_second}
                                feature_third={girlsInfo?.feature_third}
                                hobby={girlsInfo?.hobby}
                                favorite_foods={girlsInfo?.favorite_foods}
                                dislike_foods={girlsInfo?.dislike_foods}
                                favorite_type_of_man={girlsInfo?.favorite_type_of_man}
                                opportunity_to_meet={girlsInfo?.opportunity_to_meet}
                                has_boyfriend={girlsInfo?.has_boyfriend}
                                count_of_dates={girlsInfo?.count_of_dates}
                                notice={girlsInfo?.notice}
                            />

                        </div>

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
                    {girlsInfo?.feature_first &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>特徴その①</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.feature_first}</p>
                            </div>
                        </div>
                    )}
                    {girlsInfo?.feature_second &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>特徴その②</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.feature_second}</p>
                            </div>
                        </div>
                    )}
                    {girlsInfo?.feature_third &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>特徴その③</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{girlsInfo?.feature_third}</p>
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
        </>
    )
}



export default GirlsInfoPage;
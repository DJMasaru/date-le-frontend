import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Avatar, Button, Flex,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, useDisclosure, useMediaQuery
} from "@chakra-ui/react";
import Header from "@/components/header";
import EditUserProfileButton from "@/components/editUserProfileButton";
interface Profile
{
    id:number;
    address:string;
    name:string;
    occupation:string;
    notice:string;
    image_url:string;
    hobby:string;
    birthday:string;
    girl_experiences:number;
    age:number;
    favorite_feature:string;
    favorite_date_time:string;
    favorite_date_place:string;
    favorite_clothes:string;
    favorite_character:string;
    favorite_age_range:string;
}

const ProfilePage=()=>{
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [profile, setProfile] = useState<Profile|null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
console.log(profile);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/user_profile", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserProfile();
    }, [])

    const handleDeleteUser　=async()=>{
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.delete('/api/delete_user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.message);
            await router.push({
                pathname: '/login',

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
        height: '75px',
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
                                src={profile?.image_url}
                            />
                            <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                <p style={{fontWeight:"bold"}}>{profile?.name}{profile?.age && `(${profile?.age})`}</p>
                                <p style={{color:"#555555"}}>{profile?.occupation}</p>
                            </Flex>
                        </Flex>
                    </div>
                    <div style={{display:"flex", justifyContent:"center",width:"95%",margin:"10px auto"}}>
                        <div style={{width:"50%",textAlign:"left",display:"flex",justifyContent:"left"}}>
                            <Button
                                colorScheme='red'
                                color="white"
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
                                        <Button
                                            colorScheme='red'
                                            onClick={handleDeleteUser}
                                        >
                                            削除する
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                        <div style={{width:"50%",textAlign:"right"}}>
                            <EditUserProfileButton
                                //このgirlsIDは編集するときにどの女の子かを識別するときに必要
                                userID={profile?.id}
                            />
                        </div>
                    </div>
                    {profile?.age &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>年齢</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.age}歳</p>
                            </div>
                        </div>
                    )}
                    {profile?.address &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>住所</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.address}</p>
                            </div>
                        </div>
                    )}
                    {profile?.birthday &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>誕生日</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.birthday}</p>
                            </div>
                        </div>
                    )}
                    {profile?.hobby &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>趣味</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.hobby}</p>
                            </div>
                        </div>
                    )}
                    {profile?.occupation &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>職業</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.occupation}</p>
                            </div>
                        </div>
                    )}
                    {profile?.girl_experiences &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>経験人数</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.girl_experiences}</p>
                            </div>
                        </div>
                    )}
                    {profile?.favorite_date_place &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>好きなデート場所</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.favorite_date_place}</p>
                            </div>
                        </div>
                    )}
                    {profile?.favorite_date_time &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>好きなデートの時間帯</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.favorite_date_time}</p>
                            </div>
                        </div>
                    )}
                    {profile?.favorite_clothes &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>相手の理想の服装</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.favorite_clothes}</p>
                            </div>
                        </div>
                    )}
                    {profile?.favorite_character &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>理想の相手の性格</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.favorite_character}</p>
                            </div>
                        </div>
                    )}
                    {profile?.favorite_feature && (
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>相手の理想の特徴</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.favorite_feature
                                }</p>
                            </div>
                        </div>
                    )}
                    {profile?.favorite_age_range &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>相手の理想の年齢</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.favorite_age_range}</p>
                            </div>
                        </div>
                    )}
                    {profile?.notice &&(
                        <div style={contents}>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>備考</p>
                            </div>
                            <div style={contentsName}>
                                <p style={{textAlign:"center"}}>{profile?.notice}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfilePage;
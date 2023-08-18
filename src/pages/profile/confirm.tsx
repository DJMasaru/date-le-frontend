import React from "react";
import { useRouter } from 'next/router';
import {Flex, Avatar, Input} from "@chakra-ui/react";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import EditUserProfileCompleteButton from "@/components/editUserProfileCompleteButton";
const CheckUserProfileConfirmPage =()=>{
    const router = useRouter();
    const {id,userID, name, age, occupation, address, hobby, girl_experiences,
        favorite_feature, favorite_date_time,birthday,
        favorite_date_place, favorite_clothes, favorite_character, favorite_age_range, notice,
        image_url,
        } = router.query as {
        id?:number;
        userID?:number;
        name?:string;
        age?:number;
        occupation?:string;
        address?:string;
        hobby?:string;
        notice?:string;
        image_url?:string;
        birthday?:string;
        girl_experiences?:number;
        favorite_feature?:string;
        favorite_date_time?:string;
        favorite_date_place?:string;
        favorite_clothes?:string;
        favorite_character?:string;
        favorite_age_range?:string;
    };

    const contents = {
        width: '90%',
        display: 'flex',
        height: '50px',
        borderBottom: '1px dashed black',
        margin: '0 auto 10px'
    }

    const contentsName = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    }

    return(
        <>
            <div style={{marginBottom:"20px"}}>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div style={{position:"fixed",width:"100%",zIndex:2,top:"0px"}}>
                        <Header />
                    </div>
                    <p style={{paddingTop: "67px",fontWeight:"bold"}}>以下の内容で登録してもいいですか？</p>
                    <div　style={{ width: "95%",display:"flex",margin:"auto",justifyContent:"center",alignItems:"center" }}>
                        <Avatar
                            size={'lg'}
                            src={image_url}
                        />
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>名前</p>
                        </div>
                        <div style={contentsName}>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>年齢</p>
                        </div>
                        <div style={contentsName}>
                            <p>{age}歳</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>住所</p>
                        </div>
                        <div style={contentsName}>
                            <p>{address}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>誕生日</p>
                        </div>
                        <div style={contentsName}>
                            <p>{birthday}</p>
                        </div>
                    </div>

                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>趣味</p>
                        </div>
                        <div style={contentsName}>
                            <p>{hobby}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>職業</p>
                        </div>
                        <div style={contentsName}>
                            <p>{occupation}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>経験人数</p>
                        </div>
                        <div style={contentsName}>
                            <p>{girl_experiences}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>好きなデート場所</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_date_place}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>好きなデートの時間帯</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_date_time}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>相手の理想の服装</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_clothes}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>理想の相手の性格</p>
                        </div>
                        <div style={contentsName}>
                           <p>{favorite_character}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>相手の理想の特徴</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_feature}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>相手の理想の年齢</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_age_range}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>備考</p>
                        </div>
                        <div style={contentsName}>
                            <p>{notice}</p>
                        </div>
                    </div>
                    <div style={{display:"flex",width:"95%",margin:"10px auto",justifyContent:"space-between"}}>
                        <BackButton />
                        <EditUserProfileCompleteButton
                            id={id}
                            userID={userID}
                            name={name}
                            age={age}
                            image_url={image_url}
                            occupation={occupation}
                            address={address}
                            hobby={hobby}
                            birthday={birthday}
                            girl_experiences={girl_experiences}
                            favorite_feature={favorite_feature}
                            favorite_date_time={favorite_date_time}
                            favorite_date_place={favorite_date_place}
                            favorite_clothes={favorite_clothes}
                            favorite_character={favorite_character}
                            favorite_age_range={favorite_age_range}
                            notice={notice}
                        />
                    </div>
                </Flex>
            </div>
        </>
    )
}

export default CheckUserProfileConfirmPage;
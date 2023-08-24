import React from "react";
import { useRouter } from 'next/router';
import {Flex,  Avatar} from "@chakra-ui/react";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import EditGirlsInfoCompleteButton from "@/components/editGirlsInfoCompleteButton";

const CheckGirlsInfoConfirmPage =()=>{
    const router = useRouter();
    const {girlsID,index, name, age,
        image_url,
        occupation, address, birthday, character,
        feature_first,feature_second,feature_third, hobby, favorite_foods, dislike_foods,
        favorite_type_of_man, opportunity_to_meet, has_boyfriend,
        count_of_dates, notice} = router.query as {
        girlsID?:number,
        index?:number,
        name?:string,
        age?:number,
        image_url?:string,
        occupation?:string,
        address?:string,
        birthday?:string,
        character?:string,
        feature_first?:string,
        feature_second?:string,
        feature_third?:string,
        hobby?:string,
        favorite_foods?:string,
        dislike_foods?:string,
        favorite_type_of_man?:string,
        opportunity_to_meet?:string,
        has_boyfriend?:number,
        count_of_dates?:number,
        notice?:string
    };

    //文字列として扱われているものを数値化
    const has_boyfriend_number = has_boyfriend !== undefined ? parseInt(String(has_boyfriend)) : 0;

    const contents = {
        width: '90%',
        display: 'flex',
        height: '75px',
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
                            <p style={{textAlign:"center"}}>職業</p>
                        </div>
                        <div style={contentsName}>
                            <p>{occupation}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>出会いのキッカケ</p>
                        </div>
                        <div style={contentsName}>
                            <p>{opportunity_to_meet}</p>
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
                            <p style={{textAlign:"center"}}>性格</p>
                        </div>
                        <div style={contentsName}>
                            <p>{character}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>特徴その①</p>
                        </div>
                        <div style={contentsName}>
                            <p>{feature_first}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>特徴その②</p>
                        </div>
                        <div style={contentsName}>
                            <p>{feature_second}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>特徴その③</p>
                        </div>
                        <div style={contentsName}>
                            <p>{feature_third}</p>
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
                            <p style={{textAlign:"center"}}>好きな食べ物</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_foods}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>苦手な食べ物</p>
                        </div>
                        <div style={contentsName}>
                            <p>{dislike_foods}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>好きな男性のタイプ</p>
                        </div>
                        <div style={contentsName}>
                            <p>{favorite_type_of_man}</p>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{ textAlign: "center" }}>彼氏の有無</p>
                        </div>
                        <div style={contentsName}>
                            <p>
                                {has_boyfriend_number === 0
                                    ? "なし"
                                    : has_boyfriend_number === 1
                                        ? "あり"
                                        : "不明"}
                            </p>
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
                        <EditGirlsInfoCompleteButton
                            girlsID={girlsID}
                            index={index}
                            name={name}
                            age={age}
                            image_url={image_url}
                            occupation={occupation}
                            address={address}
                            birthday={birthday}
                            character={character}
                            feature_first={feature_first}
                            feature_second={feature_second}
                            feature_third={feature_third}
                            hobby={hobby}
                            favorite_foods={favorite_foods}
                            dislike_foods={dislike_foods}
                            favorite_type_of_man={favorite_type_of_man}
                            opportunity_to_meet={opportunity_to_meet}
                            has_boyfriend={has_boyfriend}
                            count_of_dates={count_of_dates}
                            notice={notice}
                        />
                    </div>
                </Flex>
            </div>
        </>
    )
}

export default CheckGirlsInfoConfirmPage;
import { useRouter } from 'next/router';
import React, {ChangeEvent, useEffect, useState} from "react";
import {Avatar, Button, Input, Select, useMediaQuery} from "@chakra-ui/react";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import EditUserProfileConfirmButton from "@/components/editUserProfileConfirmButton";
import axios from "axios";

interface RouterQuery {
    userID?:number;
}
interface Profile{
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

const EditGirlsInfoPage =()=>{
    const router = useRouter();
    const {userID}: RouterQuery = router.query;
    const [profile, setProfile] = useState<Profile|null>(null)
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
    }, [userID])

    useEffect(() => {
        if (profile) {
            setInputName(profile.name || "");
            setInputAge(profile?.age !== undefined ? profile?.age : 0);
            setInputOccupation(profile.occupation || "");
            setInputImageUrl(profile.image_url || "");
            setInputFavoriteClothes(profile.favorite_clothes || "");
            setInputAddress(profile.address || "");
            setInputBirthday(profile.birthday || "");
            setInputGirlExperiences(profile.girl_experiences || 0);
            setInputFavoriteDatePlace(profile.favorite_date_place || "");
            setInputFavoriteDateTime(profile.favorite_date_time || "");
            setInputFavoriteCharacter(profile.favorite_character || "");
            setInputHobby(profile.hobby || "");
            setInputFavoriteFeature(profile.favorite_feature || "");
            setInputFavoriteAgeRange(profile.favorite_age_range || "");
            setInputNotice(profile.notice || "");
        }
    }, [profile]);

    const [inputImageUrl, setInputImageUrl] = useState(profile ? profile.image_url : "")
    const [inputName, setInputName] = useState(profile ? profile.name : "")
    const [inputAge, setInputAge] = useState(profile?.age !== undefined ? profile?.age : 0)
    const [inputOccupation, setInputOccupation] = useState(profile ? profile.occupation : "")
    const [inputFavoriteClothes, setInputFavoriteClothes] = useState(profile?.favorite_clothes || "")
    const [inputAddress, setInputAddress] = useState(profile?.address || "");
    const [inputBirthday, setInputBirthday] = useState(profile?.birthday || "");
    const [inputGirlExperiences, setInputGirlExperiences] = useState(profile?.girl_experiences || 0);
    const [inputFavoriteDatePlace, setInputFavoriteDatePlace] = useState(profile?.favorite_date_place || "");
    const [inputFavoriteDateTime, setInputFavoriteDateTime] = useState( profile?.favorite_date_time|| "");
    const [inputFavoriteCharacter, setInputFavoriteCharacter] = useState( profile?.favorite_character|| "");
    const [inputHobby, setInputHobby] = useState(profile?.hobby || "");
    const [inputFavoriteFeature, setInputFavoriteFeature] = useState(profile?.favorite_feature || "");
    const [inputFavoriteAgeRange, setInputFavoriteAgeRange] = useState(profile?.favorite_age_range || "");
    const [inputNotice, setInputNotice] = useState(profile?.notice || "");

    const contents = {
        width: '90%',
        display: 'flex',
        height: '50px',
        borderBottom: '1px dashed black',
        margin: '10px auto 0px'
    }
    console.log(inputName);
    const contentsName = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    }

    const inputStyle:React.CSSProperties = {
        width: "95%",
        margin: "0",
        textAlign: "center",
    }

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];

            //画像選択と同時にサーバーへ画像アップロード
            const formData = new FormData();
            formData.append('image', imageFile);
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.post('/api/upload_user_image', formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data', // フォームデータを送信するために必要
                    },
                });

                console.log(response.data);
                setInputImageUrl(response.data);
            } catch (error) {
                // ログイン失敗時の処理
                console.error(error);
            }
        }
    };

    return(
    <>
        <div style={{marginBottom:"20px"}}>
            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                <Header />
            </div>

            <div　style={{ width: "95%",display:"flex",margin:"auto",paddingTop: "67px",justifyContent:"center",alignItems:"center" }}>
                <Avatar
                    size={'lg'}
                    src={inputImageUrl}
                />
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{border: "unset", width: "unset",lineHeight: 2}}
                />
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>名前</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>年齢</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="number"
                        value={inputAge}
                        onChange={(e) => setInputAge(parseInt(e.target.value, 10))}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>住所</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>誕生日</p>
                </div>
                <div style={contentsName}>
                    <Input type="date"
                           value={inputBirthday}
                           onChange={(e) => setInputBirthday(e.target.value)}
                           style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>趣味</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputHobby}
                        onChange={(e) => setInputHobby(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>職業</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputOccupation}
                        onChange={(e) => setInputOccupation(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>経験人数</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="number"
                        value={inputGirlExperiences}
                        onChange={(e) => setInputGirlExperiences(parseInt(e.target.value, 10))}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>好きなデート場所</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteDatePlace}
                        onChange={(e) => setInputFavoriteDatePlace(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>好きなデートの時間帯</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteDateTime}
                        onChange={(e) => setInputFavoriteDateTime(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>相手の理想の服装</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteClothes}
                        onChange={(e) => setInputFavoriteClothes(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>理想の相手の性格</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteCharacter}
                        onChange={(e) => setInputFavoriteCharacter(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>相手の理想の特徴</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteFeature}
                        onChange={(e) => setInputFavoriteFeature(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>相手の理想の年齢</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteAgeRange}
                        onChange={(e) => setInputFavoriteAgeRange(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>備考</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputNotice}
                        onChange={(e) => setInputNotice(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={{display:"flex",width:"95%",margin:"10px auto",justifyContent:"space-between"}}>
                <BackButton />
                <EditUserProfileConfirmButton
                    id={profile?.id}
                    userID={userID}
                    name={inputName}
                    age={inputAge}
                    image_url={inputImageUrl}
                    occupation={inputOccupation}
                    address={inputAddress}
                    hobby={inputHobby}
                    birthday={inputBirthday}
                    girl_experiences={inputGirlExperiences}
                    favorite_feature={inputFavoriteFeature}
                    favorite_date_time={inputFavoriteDateTime}
                    favorite_date_place={inputFavoriteDatePlace}
                    favorite_clothes={inputFavoriteClothes}
                    favorite_character={inputFavoriteCharacter}
                    favorite_age_range={inputFavoriteAgeRange}
                    notice={inputNotice}
                />
            </div>
        </div>
    </>
    )
}

export default EditGirlsInfoPage;
import { useRouter } from 'next/router';
import React, {ChangeEvent, useState} from "react";
import {Avatar, FormErrorMessage, Input, Select,FormControl,Text} from "@chakra-ui/react";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import EditGirlsInfoConfirmButton from "@/components/editGirlsInfoConfirmButton";
import axios from "axios";

interface RouterQuery {
    girlsID?:number,
    index?:number;
    name?: string;
    age?: number;
    image_url?: string;
    occupation?: string;
    address?: string;
    birthday?: string;
    character?: string;
    feature_first?:string;
    feature_second?:string;
    feature_third?:string;
    hobby?: string;
    favorite_foods?: string;
    dislike_foods?: string;
    favorite_type_of_man?: string;
    opportunity_to_meet?: string;
    has_boyfriend?: number;
    notice?: string;
}

const EditGirlsInfoPage =()=>{
    const router = useRouter();
    const {girlsID,index, name, age, image_url, occupation, address,
        birthday, character,feature_first,feature_second,feature_third,
        hobby, favorite_foods, dislike_foods, favorite_type_of_man,
        opportunity_to_meet, has_boyfriend, notice,
    }: RouterQuery = router.query;

    const [inputImageUrl, setInputImageUrl] = useState(image_url || "");
    const [inputName, setInputName] = useState(name || "");
    const [inputAge, setInputAge] = useState(age !== undefined ? age : 0);
    const [inputOccupation, setInputOccupation] = useState(occupation || "");
    const [inputOpportunityToMeet, setInputOpportunityToMeet] = useState(opportunity_to_meet || "");
    const [inputAddress, setInputAddress] = useState(address || "");
    const [inputBirthday, setInputBirthday] = useState(birthday || "");
    const [inputCharacter, setInputCharacter] = useState(character || "");

    const [inputFeatureFirst, setInputFeatureFirst] = useState(feature_first || "");
    const [inputFeatureSecond, setInputFeatureSecond] = useState( feature_second|| "");
    const [inputFeatureThird, setInputFeatureThird] = useState( feature_third|| "");

    const [inputHobby, setInputHobby] = useState(hobby || "");
    const [inputFavoriteFoods, setInputFavoriteFoods] = useState(favorite_foods || "");
    const [inputDislikeFoods, setInputDislikeFoods] = useState(dislike_foods || "");
    const [inputFavoriteTypeOfMan, setInputFavoriteTypeOfMan] = useState(favorite_type_of_man || "");
    const [inputHasBoyfriend, setInputHasBoyfriend] = useState(has_boyfriend !== undefined ? has_boyfriend : 0);
    const [inputNotice, setInputNotice] = useState(notice || "");

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

    const inputStyle:React.CSSProperties = {
        width: "95%",
        margin: "0",
        textAlign: "center",
    }

    const validateMark = {
        background:'red',
        color:'white',
        margin:'5px',
        padding:'2px',
        fontWeight:'bold',
        fontSize:'12px'
    }

    const [girlsNameError, setGirlsNameError] = useState<string>("");
    const validateGirlsName = () => {
        if (!inputName) {
            setGirlsNameError("名前を入力して下さい。");
        } else {
            setGirlsNameError("");
        }
    };


    const handleChangeHasBoyfriend = (e: ChangeEvent<HTMLSelectElement>) => {
        setInputHasBoyfriend(parseInt(e.target.value, 10));
    };

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

    const [featureFirstError, setFeatureFirstError] = useState(false);
    const featureFirstInput  = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputFeatureFirst(inputValue);

        if (inputValue.length > 5) {
            setFeatureFirstError(true);
        } else {
            setFeatureFirstError(false);
        }
    };

    const [featureSecondError, setFeatureSecondError] = useState(false);
    const featureSecondInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputFeatureSecond(inputValue);

        if (inputValue.length > 5) {
            setFeatureSecondError(true);
        } else {
            setFeatureSecondError(false);
        }
    };

    const [featureThirdError, setFeatureThirdError] = useState(false);
    const featureThirdInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputFeatureThird(inputValue);

        if (inputValue.length > 5) {
            setFeatureThirdError(true);
        } else {
            setFeatureThirdError(false);
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
                   　 <p style={validateMark}>必須</p>
                     <p style={{textAlign:"center"}} onBlur={validateGirlsName}>名前</p>
                </div>
                <div style={contentsName}>
                    <FormControl isInvalid={!!girlsNameError}>
                    <Input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        style={inputStyle}
                        onBlur={validateGirlsName}
                    />
                        <FormErrorMessage>{girlsNameError}</FormErrorMessage>
                    </FormControl>
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
                    <p style={{textAlign:"center"}}>出会いのキッカケ</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputOpportunityToMeet}
                        onChange={(e) => setInputOpportunityToMeet(e.target.value)}
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
                    <p style={{textAlign:"center"}}>性格</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputCharacter}
                        onChange={(e) => setInputCharacter(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>特徴その①</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFeatureFirst}
                        onChange={featureFirstInput}
                        style={inputStyle}
                        borderColor={featureFirstError ? 'red.500' : 'gray.300'}
                    />
                    {featureFirstError && <Text color="red.500" align="center">5文字以内です。</Text>}
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>特徴その②</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFeatureSecond}
                        onChange={featureSecondInput}
                        style={inputStyle}
                        borderColor={featureSecondError ? 'red.500' : 'gray.300'}
                    />
                    {featureSecondError && <Text color="red.500">5文字以内です。</Text>}
                </div>
            </div>

            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>特徴その③</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFeatureThird}
                        onChange={featureThirdInput}
                        style={inputStyle}
                        borderColor={featureThirdError ? 'red.500' : 'gray.300'}
                    />
                    {featureThirdError && <Text color="red.500">5文字以内です。</Text>}
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
                    <p style={{textAlign:"center"}}>好きな食べ物</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteFoods}
                        onChange={(e) => setInputFavoriteFoods(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>苦手な食べ物</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputDislikeFoods}
                        onChange={(e) => setInputDislikeFoods(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{textAlign:"center"}}>好きな男性のタイプ</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="text"
                        value={inputFavoriteTypeOfMan}
                        onChange={(e) => setInputFavoriteTypeOfMan(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={contents}>
                <div style={contentsName}>
                    <p style={{ textAlign: "center" }}>彼氏の有無</p>
                </div>
                <div style={contentsName}>
                    <Select
                        value={inputHasBoyfriend}
                        style={{textAlign:"center"}}
                        onChange={handleChangeHasBoyfriend}>
                        <option value={0}>なし</option>
                        <option value={1}>あり</option>
                        <option value={2}>不明</option>
                    </Select>
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
                <EditGirlsInfoConfirmButton
                    girlsID={girlsID}
                    index={index}
                    name={inputName}
                    age={inputAge}
                    image_url={inputImageUrl}
                    occupation={inputOccupation}
                    address={inputAddress}
                    birthday={inputBirthday}
                    character={inputCharacter}
                    feature_first={inputFeatureFirst}
                    feature_second={inputFeatureSecond}
                    feature_third={inputFeatureThird}
                    hobby={inputHobby}
                    favorite_foods={inputFavoriteFoods}
                    dislike_foods={inputDislikeFoods}
                    favorite_type_of_man={inputFavoriteTypeOfMan}
                    opportunity_to_meet={inputOpportunityToMeet}
                    has_boyfriend={inputHasBoyfriend}
                    notice={inputNotice}
                />
            </div>
        </div>
    </>
    )
}

export default EditGirlsInfoPage;
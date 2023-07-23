import { useRouter } from 'next/router';
import React, {ChangeEvent, useState} from "react";
import {Avatar, Button, Input, Select, useMediaQuery} from "@chakra-ui/react";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import EditGirlsInfoConfirmButton from "@/components/editGirlsInfoConfirmButton";

interface RouterQuery {
    index?:number;
    name?: string;
    age?: number;
    image_url?: string;
    occupation?: string;
    address?: string;
    birthday?: string;
    character?: string;
    hobby?: string;
    favorite_foods?: string;
    dislike_foods?: string;
    favorite_type_of_man?: string;
    opportunity_to_meet?: string;
    has_boyfriend?: number;
    count_of_dates?: number;
    notice?: string;
}

const EditGirlsInfoPage =()=>{
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const {index, name, age, image_url, occupation, address,
        birthday, character, hobby, favorite_foods, dislike_foods,
        favorite_type_of_man, opportunity_to_meet, has_boyfriend,
        count_of_dates, notice,
    }: RouterQuery = router.query;

    const [inputName, setInputName] = useState(name || "")
    const [inputAge, setInputAge] = useState(age !== undefined ? age : 0)
    const [inputOccupation, setInputOccupation] = useState(occupation || "")
    const [inputOpportunityToMeet, setInputOpportunityToMeet] = useState(opportunity_to_meet || "")
    const [inputAddress, setInputAddress] = useState(address || "");
    const [inputBirthday, setInputBirthday] = useState(birthday || "");
    const [inputCharacter, setInputCharacter] = useState(character || "");
    const [inputHobby, setInputHobby] = useState(hobby || "");
    const [inputFavoriteFoods, setInputFavoriteFoods] = useState(favorite_foods || "");
    const [inputDislikeFoods, setInputDislikeFoods] = useState(dislike_foods || "");
    const [inputFavoriteTypeOfMan, setInputFavoriteTypeOfMan] = useState(favorite_type_of_man || "");
    const [inputHasBoyfriend, setInputHasBoyfriend] = useState(has_boyfriend !== undefined ? has_boyfriend : 0);
    const [inputCountOfDates, setInputCountOfDates] = useState(count_of_dates !== undefined ? count_of_dates : 0);
    const [inputNotice, setInputNotice] = useState(notice || "");

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

    const inputStyle:React.CSSProperties = {
        width: "95%",
        margin: "0",
        textAlign: "center",
    }

    const handleChangeHasBoyfriend = (e: ChangeEvent<HTMLSelectElement>) => {
        setInputHasBoyfriend(parseInt(e.target.value, 10));
    };

    return(
    <>
        <div style={{marginBottom:"20px"}}>
            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                <Header />
            </div>

            <div　style={{ width: "95%",display:"flex",margin:"auto",paddingTop: "67px",justifyContent:"space-evenly",alignItems:"center" }}>
                <Avatar
                    size={'lg'}
                    src={image_url}
                />
                <Button>
                        <p>画像を変更する</p>
                </Button>
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
                    <p style={{textAlign:"center"}}>これまでのデート回数</p>
                </div>
                <div style={contentsName}>
                    <Input
                        type="number"
                        value={inputCountOfDates}
                        onChange={(e) => setInputCountOfDates(parseInt(e.target.value, 10))}
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
                <EditGirlsInfoConfirmButton
                    index={index}
                    name={inputName}
                    age={inputAge}
                    // image_url={girlsInfo?.image_url}
                    occupation={inputOccupation}
                    address={inputAddress}
                    birthday={inputBirthday}
                    character={inputCharacter}
                    hobby={inputHobby}
                    favorite_foods={inputFavoriteFoods}
                    dislike_foods={inputDislikeFoods}
                    favorite_type_of_man={inputFavoriteTypeOfMan}
                    opportunity_to_meet={inputOpportunityToMeet}
                    has_boyfriend={inputHasBoyfriend}
                    count_of_dates={inputCountOfDates}
                    notice={inputNotice}
                />
            </div>
        </div>
    </>
    )
}

export default EditGirlsInfoPage;
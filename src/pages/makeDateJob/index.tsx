import React, {useEffect, useState} from "react";
import {Button, useDisclosure, Input, Select, Spacer, FormErrorMessage} from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,FormControl
} from '@chakra-ui/react'
import axios from "axios";
import MakeDateJobConfirm from "../../components/makeDateJobComfirmButton";
import { useRouter } from 'next/router';
import Header from "../../components/header";

interface Girl{
    id: string;
    name: string;
}

const MakeDateJobPage=()=>{

    //女の子の詳細情報から飛んでくる
    const router = useRouter();
    const {name} = router.query as {
        name: string;
    };
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [girlsList, setGirlsList] =useState<Girl[]>([]);
    const [placeOfDate, setPlaceOfDate] = useState('');
    const [dateOfDate, setDateOfDate]  = useState('');
    const [timeOfDate, setTimeOfDate]  = useState('');
    const [passion, setPassion] = useState('')
    const [target, setTarget] = useState('')
    const [girlsNameInput, setGirlsNameInput] = useState('')
    const [girlsNameSelect, setGirlsNameSelect] = useState('')
    const [girlsNameConfirm, setGirlsNameConfirm] = useState('')
    const [error, setError] = useState('');

    const handleChangeGirlsName=(e: React.MouseEvent<HTMLButtonElement>)=>{
            e.preventDefault()
        setError('');
        if (girlsNameInput.length > 0 && girlsNameSelect.length > 0) {
            setError('いずれかに入力してください。');
        } else if (girlsNameInput.length > 0) {

            // girlsNameInputの値を使用してAPI通信を行う
            setGirlsNameConfirm(girlsNameInput)
            onClose();
        } else if (girlsNameSelect.length > 0) {
            setGirlsNameConfirm(girlsNameSelect)
            onClose();
        }
    }

    useEffect(() => {
        const fetchGirlsList = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/girls_list", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setGirlsList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGirlsList();
    }, [])

    useEffect(() => {
        if (name) {
            // nameFromGirlsInfoが空文字でない場合に、girlsNameConfirmに値をセットする
            setGirlsNameConfirm(name);
        }
    }, [name]);

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

    const validateMark = {
        background:'red',
        color:'white',
        margin:'5px',
        padding:'2px',
        fontWeight:'bold',
        fontSize:'12px'
    }

    const [dateOfDateError, setDateOfDateError] = useState<string>("");
    const validateDateOfDate = () => {
        if (!dateOfDate) {
            setDateOfDateError("日付を入力してください。");
        } else {
            setDateOfDateError("");
        }
    };

    const [timeOfDateError, setTimeOfDateError] = useState<string>("");
    const validateTimeOfDate = () => {
        if (!timeOfDate) {
            setTimeOfDateError("時間を入力してください。");
        } else {
            setTimeOfDateError("");
        }
    };

    return(
        <>
            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                <Header />
            </div>
            <div style={{ margin: "70px auto 20px",maxWidth:"800px"}}>
                <div style={{ width: '95%', margin: 'auto' }}>
                    <h1>デート情報登録</h1>
                    <div style={contents}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '50%' }}>
                            <p style={validateMark}>必須</p>
                            <p style={{textAlign:"center"}}>名前</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '50%' }}>
                            <Button onClick={onOpen}>
                                {girlsNameConfirm ?
                                    <p>{girlsNameConfirm}</p>
                                    :
                                <p>入力する</p>
                                }
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>女の子の名前を選択する</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <p>過去にデートした子から選ぶ</p>
                                        <Select value={girlsNameSelect} onChange={(e) => setGirlsNameSelect(e.target.value)}>
                                            <option value="">選択してください</option>
                                            {girlsList.map((girl) => (
                                                <option key={girl.id} value={girl.name}>
                                                    {girl.name}
                                                </option>
                                            ))}
                                        </Select>
                                        <Spacer margin='12px'/>
                                        <p>新規でデートする子の名前を入力する</p>
                                        <Input value={girlsNameInput} onChange={(e) => setGirlsNameInput(e.target.value)} />
                                        {error && <p>{error}</p>}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='gray' mr={3} onClick={onClose}>
                                            閉じる
                                        </Button>
                                        <Button colorScheme='blue' onClick={(e) => handleChangeGirlsName(e)}>決定する</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={validateMark}>必須</p>
                            <p style={{textAlign:"center"}}>日付</p>
                        </div>
                        <div style={contentsName}>
                            <FormControl isInvalid={!!dateOfDateError}>
                            <Input type="date"  value={dateOfDate} onChange={(e) => setDateOfDate(e.target.value)} onBlur={validateDateOfDate}/>
                                <FormErrorMessage>{dateOfDateError}</FormErrorMessage>
                            </FormControl>
                            </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={validateMark}>必須</p>
                            <p style={{textAlign:"center"}}>時間</p>
                        </div>
                        <div style={contentsName}>
                            <FormControl isInvalid={!!timeOfDateError}>
                            <Input type="time" value={timeOfDate} onChange={(e) => setTimeOfDate(e.target.value)} onBlur={validateTimeOfDate}/>
                            <FormErrorMessage>{timeOfDateError}</FormErrorMessage>
                            </FormControl>
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>集合場所</p>
                        </div>
                        <div style={contentsName}>
                            <Input value={placeOfDate} onChange={(e) => setPlaceOfDate(e.target.value)} />
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>意気込み</p>
                        </div>
                        <div style={contentsName}>
                            <Input value={passion} onChange={(e) => setPassion(e.target.value)} />
                        </div>
                    </div>
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{textAlign:"center"}}>最終目標・目的</p>
                        </div>
                        <div style={contentsName}>
                            <Input value={target} onChange={(e) => setTarget(e.target.value)} />
                        </div>
                    </div>
                    <div style={{textAlign:"center"}}>
                    <MakeDateJobConfirm
                        girlsNameConfirm={girlsNameConfirm}
                        dateOfDate={dateOfDate}
                        timeOfDate={timeOfDate}
                        placeOfDate={placeOfDate}
                        passion={passion}
                        target={target}
                     />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MakeDateJobPage;
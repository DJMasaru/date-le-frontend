import React, {useEffect, useState} from "react";
import {Button, Flex, useDisclosure,Input,Select} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import MakeDateJobConfirm from "../../components/makeDateJobComfirmButton";

interface Girl{
    id: string;
    name: string;
}

const MakeDateJobPage=()=>{
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
            setError('エラーメッセージ：girlsNameInputとgirlsNameSelectの両方に値が入っています');
        } else if (girlsNameInput.length > 0) {
            // girlsNameInputの値を使用してAPI通信を行う
            setGirlsNameConfirm(girlsNameInput)
            onClose();
        } else if (girlsNameSelect.length > 0) {
            setGirlsNameConfirm(girlsNameSelect)
            onClose();
        }
    }

console.log(girlsList)
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

    const contents = {
        width: '90%',
        display: 'flex',
        height: '50px',
        borderBottom: '1px dashed black',
        marginBottom: '10px'
    }

    const contentsName = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    }

    return(
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <h1>デート情報登録</h1>
                <div style={contents}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '50%' }}>
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
                                    <p>新規でデートする子の名前を入力する</p>
                                    <Input value={girlsNameInput} onChange={(e) => setGirlsNameInput(e.target.value)} />
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        閉じる
                                    </Button>
                                    <Button variant="ghost" onClick={(e) => handleChangeGirlsName(e)}>決定する</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <p style={{textAlign:"center"}}>日付</p>
                    </div>
                    <div style={contentsName}>
                        <Input type="date"  value={dateOfDate} onChange={(e) => setDateOfDate(e.target.value)}/>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <p style={{textAlign:"center"}}>時間</p>
                    </div>
                    <div style={contentsName}>
                        <Input type="time" value={timeOfDate} onChange={(e) => setTimeOfDate(e.target.value)}/>
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
                <MakeDateJobConfirm
                    girlsNameConfirm={girlsNameConfirm}
                    dateOfDate={dateOfDate}
                    timeOfDate={timeOfDate}
                    placeOfDate={placeOfDate}
                    passion={passion}
                    target={target}
                />
            </Flex>
        </>
    )
}

export default MakeDateJobPage;
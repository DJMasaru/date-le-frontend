import React from "react";
import { useRouter } from 'next/router';
import {Flex} from "@chakra-ui/react";
import ConfirmAgain from "../../components/makeDateJobConfirmAgain";
import MakeDateJobCompleteButton from "../../components/makeDateJobCompleteButton";
import Header from "@/components/header";

const ConfirmPage =()=>{
    const router = useRouter();
    const { girlsNameConfirm, dateOfDate, timeOfDate, placeOfDate, passion, target } = router.query as {
        girlsNameConfirm:string;
        dateOfDate : string;
        timeOfDate : string;
        placeOfDate : string;
        passion : string;
        target : string;
    };

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
                <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                    <Header />
                </div>
                <h1>登録内容確認</h1>
                <p>この内容で登録してもいいですか？</p>
                <div style={contents}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '50%' }}>
                        <p style={{textAlign:"center"}}>名前</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '50%' }}>
                        <p>{girlsNameConfirm}</p>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <p style={{textAlign:"center"}}>日付</p>
                    </div>
                    <div style={contentsName}>
                        <p>{dateOfDate}</p>
                    </div>
                </div>
                <div style={contents}>
                    <div style={contentsName}>
                        <p style={{textAlign:"center"}}>時間</p>
                    </div>
                    <div style={contentsName}>
                        <p>{timeOfDate}</p>
                    </div>
                </div>
                {placeOfDate && (
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{ textAlign: "center" }}>集合場所</p>
                        </div>
                        <div style={contentsName}>
                            <p>{placeOfDate}</p>
                        </div>
                    </div>
                )}
                {passion && (
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{ textAlign: "center" }}>意気込み</p>
                        </div>
                        <div style={contentsName}>
                            <p>{passion}</p>
                        </div>
                    </div>
                )}
                {target && (
                    <div style={contents}>
                        <div style={contentsName}>
                            <p style={{ textAlign: "center" }}>最終目標・目的</p>
                        </div>
                        <div style={contentsName}>
                            <p>{target}</p>
                        </div>
                    </div>
                )}
                <Flex justifyContent="space-between">
                    <ConfirmAgain/>
                    <MakeDateJobCompleteButton
                        girlsNameConfirm={girlsNameConfirm}
                        dateOfDate={dateOfDate}
                        timeOfDate={timeOfDate}
                        placeOfDate={placeOfDate}
                        passion={passion}
                        target={target}
                    />
                </Flex>
            </Flex>
        </>
    )
}

export default ConfirmPage;
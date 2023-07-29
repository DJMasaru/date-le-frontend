import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "@/components/header";
import GirlsInfoCard from "@/components/cards/girlsInfoCard";
import {useMediaQuery} from "@chakra-ui/react";

interface Girl{
    id: string;
    name: string;
    image_url:string;
}

const CheckGirlsInfo=()=>{
    const [girlsInfo, setGirlsInfo] =useState<Girl[]>([]);
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        const fetchGirlsInfo = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/girls_info", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setGirlsInfo(response.data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchGirlsInfo();
    }, [])

    return(
        <>
            {isMobile ? (
                (
                    <div>
                        <div>
                            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                                    <Header />
                            </div>
                        </div>
                        <div style={{ marginTop: "70px" }}>
                            <div style={{ width: '95%', margin: 'auto' }}>
                                <h1>女の子情報一覧</h1>
                                {girlsInfo.length > 0 ? (
                                    girlsInfo.map((item, index) => (
                                        <GirlsInfoCard
                                            key={index}
                                            index={index}
                                            {...item}
                                        />
                                    ))
                                ) : (
                                    <p>女の子が登録されていません</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <p>Waiting...</p>
            )}
        </>
    )
}

export default CheckGirlsInfo;
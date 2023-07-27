import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "@/components/header";
import {useMediaQuery} from "@chakra-ui/react";
import LogDateCard from "@/components/cards/LogDateCard";

interface DateLog{
    id: number;
    user_id: number;
    girl_id:number;
    date_of_date:string;
    time_of_date:string;
    place_of_date:string;
    passion:string;
    target:string;
    girls_profile: {
        age: number;
        image_url:string;
        name:string;
        occupation:string;
        feature_first:string;
        feature_second:string;
        feature_third:string;
        count_of_dates:number;
    };
}

const DateLog=()=>{
    const [dateLog, setDateLog] =useState<DateLog[]>([]);
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        const fetchDateLog = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/log_date_job", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setDateLog(response.data);

            } catch (error) {
                console.error(error);

            }
        }

        fetchDateLog();
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
                                <h1>デート履歴一覧</h1>
                                {dateLog.length > 0 ? (
                                    dateLog.map((item, index) => (
                                        <LogDateCard
                                            key={index}
                                            index={item.id}
                                            date_of_date={item.date_of_date}
                                            time_of_date={item.time_of_date}
                                            place_of_date={item.place_of_date}
                                            name={item.girls_profile.name}
                                            age={item.girls_profile.age}
                                            image_url={item.girls_profile.image_url}
                                            occupation={item.girls_profile.occupation}
                                        />
                                    ))
                                ) : (
                                    <p>デートのログが登録されていません。</p>
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

export default DateLog;
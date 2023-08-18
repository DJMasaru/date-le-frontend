import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {Avatar, Badge, Flex, useMediaQuery} from "@chakra-ui/react";
import Header from "@/components/header";
import Comment from "@/components/comment";

interface dateJobProps {
    comment_count: number;
    date_of_date: string;
    place_of_date: string;
    time_of_date: string;
    count_of_dates: number;
    passion: string;
    target: string;
    girls_profile: {
        age: number;
        image_url: string;
        name: string;
        occupation: string;
        feature_first: string;
        feature_second: string;
        feature_third: string;
        count_of_dates: number;
    };
}

interface dateJobLogComments {
    updated_at: string
    value: string;
    comment_by_user: any;
}

const DateDetailPage = () => {
    const router = useRouter();
    const {index} = router.query;
    const [dateLog, setDateLog] = useState<dateJobProps | null>(null);
    const [dateLogComments, setDateLogComments] = useState<dateJobLogComments | null>(null);
    const features: any[] = [dateLog?.girls_profile?.feature_first, dateLog?.girls_profile?.feature_second, dateLog?.girls_profile?.feature_third].filter(Boolean);
    //dateJobの初期値がカラのため、もしundefinedである場合に備える
    const timeParts: string[] | undefined = dateLog?.time_of_date.split(':') || [];
    const hour = timeParts ? timeParts[0] : '';
    const minute = timeParts ? timeParts[1] : '';

    const dataParts: string[] | undefined = dateLog?.date_of_date.split('-') || [];
    const year = dataParts ? dataParts[0] : '';
    const month = dataParts ? dataParts[1] : '';
    const monthWithoutZero = parseInt(month, 10).toString();
    const day = dataParts ? dataParts[2] : '';
    const dayWithoutZero = parseInt(day, 10).toString();

    console.log(dateLogComments);

    useEffect(() => {
        const fetchDateLog = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/log_date_job", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        index: index, // indexをparamsに含める
                    },
                });
                setDateLog(response.data.dateLog);
                setDateLogComments(response.data.comments);

            } catch (error) {
                console.error(error);

            }
        }

        fetchDateLog();
    }, [index])


    return (
        <>
            <div>
                <div>
                    <div style={{position: "fixed", width: "100%", zIndex: 2, top: "0"}}>
                        <Header/>
                    </div>
                    <p style={{
                        width: "55%",
                        display: "flex",
                        margin: "auto",
                        paddingTop: "75px",
                        justifyContent: "center",
                        fontWeight: "bold",
                        marginBottom: "15px",
                        borderBottom: "1px solid black"
                    }}>
                        過去のデート履歴
                    </p>
                    <div style={{width: "95%", display: "flex", margin: "auto", justifyContent: "center"}}>
                        <Flex alignItems="center">
                            <Avatar
                                size={'lg'}
                                src={dateLog?.girls_profile?.image_url}
                            />

                            <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                <p style={{fontWeight: "bold"}}>{dateLog?.girls_profile?.name} ({dateLog?.girls_profile?.age})</p>
                                <p style={{color: "#555555"}}>{dateLog?.girls_profile?.occupation}</p>
                            </Flex>
                        </Flex>
                    </div>
                    <div style={{width: '95%', margin: '20px auto 0'}}>
                        <p style={{textAlign: "center"}}>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`} {`${hour}時${minute}分`} </p>
                        <p style={{textAlign: "center"}}>{dateLog?.place_of_date}</p>
                        <br/>
                    </div>
                    <div style={{width: '95%', margin: '20px auto 0', textAlign: "center"}}>
                        {features?.map((feature, index) => (
                            <Badge
                                mr={"1rem"}
                                key={index}
                                px={2}
                                py={1}
                                bg={"gray.200"}
                                color={"black"}
                                fontWeight={'400'}
                            >
                                #{feature}
                            </Badge>
                        ))}
                    </div>
                    <br/>
                    <div>
                        <p style={{textAlign: "center", fontSize: "30px"}} className="headerValue">意気込み</p>
                        <p style={{textAlign: "center"}}>{dateLog?.passion}</p>
                    </div>
                    <br/>
                    <div>
                        <p style={{textAlign: "center", fontSize: "25px"}} className="headerValue">デートの目標・目的</p>
                        <p style={{textAlign: "center"}}>{dateLog?.target}</p>
                    </div>
                    <br/>
                    <div style={{width: "95%", margin: "auto", borderBottom: "1px solid black"}}>
                        <p>コメント：{dateLog?.girls_profile.count_of_dates}件</p>
                    </div>
                    <div style={{width: "95%", margin: "auto"}}>
                        {dateLog?.girls_profile.count_of_dates !== 0 ? (
                            Array.isArray(dateLogComments) && dateLogComments.length > 0 ? (
                                dateLogComments.map((comment, index) => (
                                    <Comment
                                        key={index}
                                        image_url={comment.comment_by_user[0].image_url}
                                        name={comment.comment_by_user[0].name}
                                        updated={comment.updated_at}
                                        content={comment.value}
                                    />
                                ))
                            ) : (
                                <p style={{color: "#555555"}}>コメントがありません</p>
                            )
                        ) : null}
                    </div>

                </div>
            </div>
        </>
    );
};

export default DateDetailPage;

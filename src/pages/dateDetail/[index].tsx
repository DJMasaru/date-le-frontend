import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {Avatar, Badge, ChakraProvider, Flex, useMediaQuery} from "@chakra-ui/react";
import Header from "@/components/header";
import Comment from "@/components/comment";

interface dateJob{
    comment_count:number;
    date_of_date:string;
    date_of_place:string;
    time_of_date:string;
    favorite_count:number;
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

interface Comment {
    updated_at:string
    value:string;
    comment_by_user: any;
}

interface userData{
    name:string;
}
const DateDetailPage = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const { index } = router.query;
    const [dateJob,setDateJob] = useState<dateJob>();
    const [dateComments,setDateComments] = useState<Comment[]>([]);
    const [userData, setUserData] = useState<userData | null>(null);
console.log(dateJob)
console.log(dateComments)
    //dateJobの初期値がカラのため、もしundefinedである場合に備える
    const timeParts: string[] | undefined = dateJob?.time_of_date.split(':') || [];
    const hour = timeParts[0] || '';
    const minute = timeParts[1] || '';

    const dataParts: string[] | undefined = dateJob?.date_of_date.split('-') || [];
    const year = dataParts ? dataParts[0] : '';
    const month = dataParts ? dataParts[1] : '';
    const monthWithoutZero = parseInt(month, 10).toString();
    const day = dataParts ? dataParts[2] : '';
    const dayWithoutZero = parseInt(day, 10).toString();

    const features = [dateJob?.girls_profile.feature_first, dateJob?.girls_profile.feature_second, dateJob?.girls_profile.feature_third].filter(Boolean);

    useEffect(() => {
        const fetchDateDetail = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/date_detail", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        index: index,
                    },
                });
                setUserData(response.data.user);
                setDateJob(response.data.jobs);
                setDateComments(response.data.comments);
            } catch (error) {
                console.error(error);
                // setReadingError('デートが登録されていません。')
            }
        };

        fetchDateDetail();
    }, [index]);

    return (
        <>
            {isMobile ? (
                    <div>
                        <div>
                            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                                {userData && (
                                    <Header
                                        name={userData.name}
                                        image_url={"あああ"}
                                    />
                                )}
                            </div>
                            <div　style={{ width: "95%",display:"flex",margin:"auto",paddingTop: "67px",justifyContent:"center" }}>
                                <Flex alignItems="center">
                                    <Avatar
                                        size={'lg'}
                                        src={dateJob?.girls_profile.image_url}
                                    />
                                    <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                        <p style={{fontWeight:"bold"}}>{dateJob?.girls_profile.name} ({dateJob?.girls_profile?.age})</p>
                                        <p style={{color:"#555555"}}>{dateJob?.girls_profile.occupation}</p>
                                    </Flex>
                                </Flex>
                            </div>
                            <div style={{ width: '95%', margin: '20px auto 0' }}>
                                <p style={{textAlign:"center"}}>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`}  {`${hour}時${minute}分`}　</p>
                                <p style={{textAlign:"center"}}>{dateJob?.date_of_place}</p>
                                <br/>
                                <p style={{textAlign:"center"}}>これまでのデート回数：{dateJob?.girls_profile.count_of_dates}回</p>
                            </div>
                            <div style={{ width: '95%', margin: '20px auto 0',textAlign:"center" }}>
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
                                <p style={{ textAlign: "center",fontSize:"30px" }} className="headerValue">意気込み</p>
                                <p style={{ textAlign:"center" }}>{dateJob?.passion}</p>
                            </div>
                            <br/>
                            <div>
                                <p style={{ textAlign: "center",fontSize:"25px" }} className="headerValue">デートの目標・目的</p>
                                <p style={{ textAlign:"center" }}>{dateJob?.target}</p>
                            </div>
                            <div>

                            </div>
                            <br/>
                            <div style={{width:"95%",margin:"auto",borderBottom:"1px solid black"}}>
                                <p>コメント：{dateJob?.girls_profile.count_of_dates}件</p>
                            </div>
                            <div style={{width:"95%",margin:"auto"}}>
                                {dateJob?.girls_profile.count_of_dates !== 0 && dateComments ? (
                                    dateComments.map((comment, index) => {
                                        return <Comment
                                            key={index}
                                            image_url={comment.comment_by_user[0].image_url}
                                            name={comment.comment_by_user[0].name}
                                            updated={comment.updated_at}
                                            content={comment.value}
                                        />;
                                    })
                                ) : (
                                    <p style={{color:"#555555"}}>コメントがありません</p>
                                )}
                            </div>

                        </div>
                    </div>
            ) : (
                <p>Desktop View</p>
            )}
        </>
    );
};

export default DateDetailPage;

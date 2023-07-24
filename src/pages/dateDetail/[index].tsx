import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {Avatar, Badge, Flex, useMediaQuery} from "@chakra-ui/react";
import Header from "@/components/header";
import Comment from "@/components/comment";

interface dateJob{
    comment_count:number;
    date_of_date:string;
    place_of_date:string;
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

interface friendDateJob {
    name: string;
    date_jobs: {
        0: {
            comment_count: number;
            date_of_date: string;
            place_of_date: string;
            time_of_date: string;
            favorite_count: number;
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
        };
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
    const { index, type } = router.query;
    const [dateJob,setDateJob] = useState<dateJob>();
    const [friendDateJob,setFriendDateJob] = useState<friendDateJob>();
    const [friendDateComments,setFriendDateComments] = useState<Comment[]>([]);
    const [dateComments,setDateComments] = useState<Comment[]>([]);
    const [userData, setUserData] = useState<userData | null>(null);

    // typeによって選択されるオブジェクトを定数に代入
    const selectedProfile:any = type === 'friend' ? friendDateJob?.date_jobs[0].girls_profile : dateJob?.girls_profile;
    const selectedDateJob:any = type === 'friend' ? friendDateJob?.date_jobs[0] : dateJob ;

    const features:any[] = [selectedProfile?.feature_first, selectedProfile?.feature_second, selectedProfile?.feature_third].filter(Boolean);

    //dateJobの初期値がカラのため、もしundefinedである場合に備える
    const timeParts: string[] | undefined = selectedDateJob?.time_of_date.split(':') || [];
    const hour = timeParts ? timeParts[0] : '';
    const minute = timeParts ? timeParts[1] : '';

    const dataParts: string[] | undefined = selectedDateJob?.date_of_date.split('-') || [];
    const year = dataParts ? dataParts[0] : '';
    const month = dataParts ? dataParts[1] : '';
    const monthWithoutZero = parseInt(month, 10).toString();
    const day = dataParts ? dataParts[2] : '';
    const dayWithoutZero = parseInt(day, 10).toString();

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
                        type: type
                    },
                });
                setUserData(response.data.user);
                setDateJob(response.data.jobs);
                setDateComments(response.data.comments);
                setFriendDateJob(response.data.friendDatejobs);
                setFriendDateComments(response.data.friendDatecomments);

            } catch (error) {
                console.error(error);
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
                                    <Header />
                            </div>
                            <div　style={{ width: "95%",display:"flex",margin:"auto",paddingTop: "67px",justifyContent:"center" }}>
                                <Flex alignItems="center">
                                    <Avatar
                                        size={'lg'}
                                        src={selectedProfile?.image_url}
                                    />

                                    <Flex flexDirection="column" alignItems="start" marginLeft="1rem" display="flex">
                                        <p style={{fontWeight:"bold"}}>{selectedProfile?.name} ({selectedProfile?.age})</p>
                                        <p style={{color:"#555555"}}>{selectedProfile?.occupation}</p>
                                    </Flex>
                                </Flex>
                            </div>
                            <div style={{ width: '95%', margin: '20px auto 0' }}>
                                <p style={{textAlign:"center"}}>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`}  {`${hour}時${minute}分`}　</p>
                                <p style={{textAlign:"center"}}>{dateJob?.place_of_date}</p>
                                <br/>
                                <p style={{textAlign:"center"}}>これまでのデート回数：{selectedProfile?.count_of_dates}回</p>
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
                                <p style={{ textAlign:"center" }}>{selectedDateJob?.passion}</p>
                            </div>
                            <br/>
                            <div>
                                <p style={{ textAlign: "center",fontSize:"25px" }} className="headerValue">デートの目標・目的</p>
                                <p style={{ textAlign:"center" }}>{selectedDateJob?.target}</p>
                            </div>
                            <div>
                            </div>
                            <br/>
                            <div style={{width:"95%",margin:"auto",borderBottom:"1px solid black"}}>
                                <p>コメント：{selectedProfile?.count_of_dates}件</p>
                            </div>
                            <div style={{ width: "95%", margin: "auto" }}>
                                {dateJob?.girls_profile.count_of_dates !== 0 ? (
                                    type === "friend" ? (
                                        friendDateComments ? (
                                            friendDateComments.map((comment, index) => (
                                                <Comment
                                                    key={index}
                                                    image_url={comment.comment_by_user[0].image_url}
                                                    name={comment.comment_by_user[0].name}
                                                    updated={comment.updated_at}
                                                    content={comment.value}
                                                />
                                            ))
                                        ) : (
                                            <p style={{ color: "#555555" }}>コメントがありません</p>
                                        )
                                    ) : (
                                        dateComments ? (
                                            dateComments.map((comment, index) => (
                                                <Comment
                                                    key={index}
                                                    image_url={comment.comment_by_user[0].image_url}
                                                    name={comment.comment_by_user[0].name}
                                                    updated={comment.updated_at}
                                                    content={comment.value}
                                                />
                                            ))
                                        ) : (
                                            <p style={{ color: "#555555" }}>コメントがありません</p>
                                        )
                                    )
                                ) : (
                                    <p style={{ color: "#555555" }}>コメントがありません</p>
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

import { useRouter } from 'next/router';
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {
    Avatar,
    Badge,
    Button,
    Flex,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import Header from "@/components/header";
import Comment from "@/components/comment";

interface dateJob{
    comment_count:number;
    date_of_date:string;
    place_of_date:string;
    time_of_date:string;
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
    };
}

interface friendDateJob {
    time_of_date?:string;
    date_of_date?:string;
    place_of_date?:string;
    comment_count?:number;
    passion?:string;
    target?:string;
    girls_profile?:{
        address?:string;
        age?:number;
        name?: string;
        image_url?:string;
        occupation?:string;
        feature_first?:string;
        feature_second?:string;
        feature_third?:string;
    };
    user?:{
        image_url?:string;
        name?:string;
    }
}

interface Comment {
    updated_at:string
    value:string;
    comment_by_user: any;
}

interface userData {
    name:string;
}

const DateDetailPage = () => {
    const router = useRouter();
    const { index, type } = router.query;
    const [dateJob,setDateJob] = useState<dateJob>();
    const [friendDateJob, setFriendDateJob] = useState<friendDateJob | null>(null);
    const [friendDateComments,setFriendDateComments] = useState<Comment[]>([]);
    const [dateComments,setDateComments] = useState<Comment[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [commentValue, setCommentValue] = useState(''); // 初期値を空の文字列として設定

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCommentValue(newValue);
    };
    // typeによって選択されるオブジェクトを定数に代入
    const selectedProfile:any = type === 'friend' ? friendDateJob?.girls_profile : dateJob?.girls_profile;
    const selectedDateJob: any = type === 'friend' ? friendDateJob : dateJob;
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
        fetchDateDetail();
    }, [index]);
    const handlePostComment=async ()=>{
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.post('/api/post_comment', {
                    comment:commentValue,
                    index: index,
                    type: type
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            onClose();
            fetchDateDetail();
            // ログイン成功時の処理
            console.log(response.data);
        } catch (error) {
            // ログイン失敗時の処理
            console.error(error);
        }
    }

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
                setDateJob(response.data.jobs);
                setDateComments(response.data.comments);
                setFriendDateJob(response.data.friendDatejobs);
                setFriendDateComments(response.data.friendDatecomments);

            } catch (error) {
                console.error(error);
            }
        };


    return (
        <>
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
                                <p style={{fontWeight:"bold"}}>{selectedProfile?.name} {selectedProfile?.age !== undefined && <span>({selectedProfile?.age})</span>}</p>
                                <p style={{color:"#555555"}}>{selectedProfile?.occupation}</p>
                            </Flex>
                        </Flex>
                    </div>
                    <div style={{ width: '95%', margin: '20px auto 0' }}>
                        <p style={{textAlign:"center"}}>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`}  {`${hour}時${minute}分`}　</p>
                        <p style={{textAlign:"center"}}>{dateJob?.place_of_date}</p>
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
                    <div style={{width:"95%",margin:"auto",borderBottom:"1px solid black",display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"10px"}}>
                        <p>コメント：{selectedDateJob?.comment_count}件</p>
                        <Button
                            colorScheme='blue'
                            m={2}
                            style={{margin:"0"}}
                            onClick={onOpen}>
                            <p>＋</p>
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>コメントを残す</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Textarea
                                        style={{ maxHeight: "100px" }}
                                        value={commentValue} // 状態から値を取得して表示
                                        onChange={handleChangeComment} // テキストが変更されたときに呼び出される関数を指定
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='gray' mr={3} onClick={onClose}>
                                        閉じる
                                    </Button>
                                    <Button colorScheme='blue' onClick={handlePostComment}>投稿する</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                    <div style={{ width: "95%", margin: "auto" }}>
                        {type === "friend" ? (
                            friendDateComments && friendDateComments.length > 0 ? (
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
                            dateComments && dateComments.length > 0 ? (
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
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DateDetailPage;

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useMediaQuery} from "@chakra-ui/react";
import Header from "../../components/header";
import FriendshipSelector from "@/components/friendshipSelector";
import FriendshipCard from "@/components/cards/friendshipCard";

interface Friendship {
    id:number;
    image_url:string;
    name:string;
}

interface deleteProps{
    id:number;
    index:number;
    action?:string;
}

const Dashboard =()=> {
    const [followingUser, setFollowingUser] = useState<Friendship[]|null>(null);
    const [requestingUser, setRequestingUser] = useState<Friendship[]|null>(null);
    const [followedUser, setFollowedUser] = useState<Friendship[]|null>(null);
    const [requestedUser, setRequestedUser] = useState<Friendship[]|null>(null);
    const [readingError, setReadingError] = useState<string>('');
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [selector,setSelector] = useState<string>('following')

    // フォロー中のユーザーIDを取得
    const followingUserIds:number[] = followingUser?.map(user => user.id) || [];

    // フォロワーのユーザーIDを取得
    const followerUserIds:number[] = followedUser?.map(user => user.id) || [];

    // フォローリクエストを送っているのユーザーIDを取得
    const requestingUserIds:number[] = requestingUser?.map(user => user.id) || [];

    // フォロー中とフォロワーのユーザーIDの共通部分を抽出
    const commonIds:number[] = followingUserIds?.filter(id => followerUserIds?.includes(id));

    // フォロワーとフォローリクエストのユーザーIDの共通部分を抽出
    const requestCommonIds:number[] = followerUserIds?.filter(id => requestingUserIds?.includes(id));


    useEffect(() => {
        fetchFriendshipData();
    }, []);

        const fetchFriendshipData = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/friendship", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                //こちら側が相手に対して
                setFollowingUser(response.data.followingUser);
                setRequestingUser(response.data.requestingUser);

                //相手がこちら側に対して
                setFollowedUser(response.data.followedUser)
                setRequestedUser(response.data.requestedUser)
            } catch (error) {
                console.error(error);
                setReadingError('デートが登録されていません。')
            }
        };


    const handleFriendshipSelector = (newMessage:any) => {
        setSelector(newMessage);
    };

    const handleDeleteFollowingUserCard = async ({id, index}:deleteProps) => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.delete("/api/delete_friendship_status", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    id: id,
                    status:'following',
                },
            });

            // フロントエンド側でカードを削除
            if (followingUser) {
                const updatedFollowingUser = [...followingUser];
                console.log(updatedFollowingUser);
                updatedFollowingUser.splice(index, 1);
                setFollowingUser(updatedFollowingUser);
            }
        } catch (error) {
            // 削除に失敗した場合のエラーハンドリング
            console.error('削除に失敗しました。', error);
        }
    };

    const handleDeleteRequestingUserCard = async ({id, index}:deleteProps) => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.delete("/api/delete_friendship_status", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    id: id,
                    status:'requesting',
                },
            });

            // フロントエンド側でカードを削除
            if (requestingUser) {
                const updatedRequestingUser = [...requestingUser];
                console.log(updatedRequestingUser);
                updatedRequestingUser.splice(index, 1);
                setRequestingUser(updatedRequestingUser);
            }
        } catch (error) {
            // 削除に失敗した場合のエラーハンドリング
            console.error('削除に失敗しました。', error);
        }
    };


    const handleDeleteFollowedUserCard = async ({id, action}:deleteProps) => {
        try {

            const accessToken = localStorage.getItem("date-le-accessToken");
            console.log(accessToken);
            if(action == '相互') {
                const response = await axios.delete("/api/delete_friendship_status", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        id: id,
                        status: 'followed',
                        action: action,
                    },
                });
            }else if(action == '追加'){
                const response = await axios.post("/api/post_friendship_status", {
                        id: id,
                        status: 'followed',
                        action: action,
                    },{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                fetchFriendshipData();
            }else if(action == '申請中'){
                const response = await axios.delete("/api/delete_friendship_status", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        id: id,
                        status: 'followed',
                        action: action,
                    },
                });
                fetchFriendshipData();

            }

        } catch (error) {
            // 削除に失敗した場合のエラーハンドリング
            console.error('削除に失敗しました。', error);
        }
    };

    //相手からフォローリクエストがきているとき「許可」のボタンを押したら実行される
    const handleRequestedUserCard = async ({id,action, index}:deleteProps) => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.put("/api/put_friendship_status", {
                id: id,
                status: 'requested',
                action: action,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            fetchFriendshipData();
            // フロントエンド側でカードを削除
            if (requestedUser) {
                const updatedRequestedUser = [...requestedUser];
                console.log(updatedRequestedUser);
                updatedRequestedUser.splice(index, 1);
                setRequestedUser(updatedRequestedUser);
            }
        } catch (error) {
            // 削除に失敗した場合のエラーハンドリング
            console.error('削除に失敗しました。', error);
        }
    };

    return (
        <>
            {isMobile ? (
                readingError ? (
                    <div>{readingError}</div>
                ) : (
                    <div>
                        <div>
                            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                                    <Header />
                            </div>
                            <FriendshipSelector onStateChange={handleFriendshipSelector}/>
                        </div>
                        <div style={{ marginTop: "120px" }}>

                            {/*ここに検索フォーム入れる。*/}

                            <div style={{ width: '95%', margin: 'auto' }}>
                                {selector === 'following' ? (
                                    <>
                                        {followingUser?.map((item, index) => (
                                            <FriendshipCard
                                                key={item.id}
                                                id={item.id}
                                                image_url={item.image_url}
                                                name={item.name}
                                                status='following'
                                                commonIds={commonIds}
                                                requestCommonIds={requestCommonIds}
                                                onClick={(action) => handleDeleteFollowingUserCard({ id: item.id, index })} // 削除処理を渡す
                                            />
                                        ))}
                                        <div>申請中のフォローリクエスト</div>
                                        {requestingUser?.map((item, index) => (
                                            <FriendshipCard
                                                key={item.id}
                                                id={item.id}
                                                image_url={item.image_url}
                                                name={item.name}
                                                status='requesting'
                                                commonIds={commonIds}
                                                requestCommonIds={requestCommonIds}
                                                onClick={(action) => handleDeleteRequestingUserCard({ id: item.id, index,action })} // 削除処理を渡す
                                            />
                                        ))}
                                    </>
                                ) : selector === 'followed' ? (
                                    <>
                                        {followedUser?.map((item, index) => (
                                            <FriendshipCard
                                                key={item.id}
                                                id={item.id}
                                                image_url={item.image_url}
                                                name={item.name}
                                                status='followed'
                                                commonIds={commonIds}
                                                requestCommonIds={requestCommonIds}
                                                onClick={(action) => handleDeleteFollowedUserCard({ id: item.id,action,index })} // 削除処理を渡す
                                            />
                                        ))}
                                        <div>相手からのフォローリクエスト</div>
                                        {requestedUser?.map((item, index) => (
                                            <FriendshipCard
                                                key={item.id}
                                                id={item.id}
                                                image_url={item.image_url}
                                                name={item.name}
                                                status='requested'
                                                commonIds={commonIds}
                                                requestCommonIds={requestCommonIds}
                                                onClick={(action) => handleRequestedUserCard({ id: item.id, action, index })} // 削除処理を渡す
                                            />
                                        ))}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <p>Waiting...</p>
            )}
       </>
    );
}

export default Dashboard;
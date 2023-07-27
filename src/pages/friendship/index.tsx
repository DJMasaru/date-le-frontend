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

// フォロー中とフォロワーのユーザーIDを比較して被っているかどうかを判定
    const isFollowerAndFollowing = followingUserIds?.some(id => followerUserIds?.includes(id));
// フォロー中とフォロワーのユーザーIDの共通部分を抽出
    const commonIds:number[] = followingUserIds?.filter(id => followerUserIds?.includes(id));

    useEffect(() => {
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

        fetchFriendshipData();
    }, []);

    const handleFriendshipSelector = (newMessage:any) => {
        setSelector(newMessage);
    };

    const handleDeleteCard = async ({id, index}:deleteProps) => {
        try {
            // バックエンド側のAPIに削除リクエストを送信
            // ここで削除が成功すると、バックエンドから成功のレスポンスが返ってくることを想定
            // 以下はaxiosを使った例
            // await axios.delete(`/api/friendship/${id}`);

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
                                                onClick={() => handleDeleteCard({ id: item.id, index })} // 削除処理を渡す
                                            />
                                        ))}
                                        <div>申請中のフォローリクエスト</div>
                                        {requestingUser?.map((item, index) => (
                                            <FriendshipCard
                                                key={item.id}
                                                id={item.id}
                                                image_url={item.image_url}
                                                name={item.name}
                                                status='following'
                                                commonIds={commonIds}
                                                onClick={() => handleDeleteCard({ id: item.id, index })} // 削除処理を渡す
                                            />
                                        ))}
                                    </>
                                ) : selector === 'followed' ? (
                                    <>
                                        {followedUser?.map((item2, index) => (
                                            <FriendshipCard
                                                key={item2.id}
                                                id={item2.id}
                                                image_url={item2.image_url}
                                                name={item2.name}
                                                status='followed'
                                                commonIds={commonIds}
                                                onClick={() => handleDeleteCard({ id: item2.id, index })} // 削除処理を渡す
                                            />
                                        ))}
                                        <div>相手からのフォローリクエスト</div>
                                        {requestedUser?.map((item, index) => (
                                            <FriendshipCard
                                                key={item.id}
                                                id={item.id}
                                                image_url={item.image_url}
                                                name={item.name}
                                                status='following'
                                                commonIds={commonIds}
                                                onClick={() => handleDeleteCard({ id: item.id, index })} // 削除処理を渡す
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
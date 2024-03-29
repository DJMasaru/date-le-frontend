import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/header";
import FriendshipSelector from "@/components/friendshipSelector";
import FriendshipCard from "@/components/cards/friendshipCard";
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SuggestUser from "@/components/suggestUser";

interface Friendship {
    id:number;
    image_url:string;
    name:string;
    age:number;
    notice:string;
}

interface deleteProps{
    id:number;
    index:number;
    action?:string;
}
interface Suggestion{
    id:number;
    name:string;
    image_url:string;
    status:string;
}

const Dashboard =()=> {
    const [followingUser, setFollowingUser] = useState<Friendship[]|null>(null);
    const [requestingUser, setRequestingUser] = useState<Friendship[]|null>(null);
    const [followedUser, setFollowedUser] = useState<Friendship[]|null>(null);
    const [requestedUser, setRequestedUser] = useState<Friendship[]|null>(null);
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

    // 検索フォーム
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const performSearchFriend = async (searchText:string) => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.get("/api/friendship", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    searchText: searchText,
                    suggestion: "suggestion"
                },
            });
            setSuggestions(response.data.strangerUser);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (searchText) {
            performSearchFriend(searchText);
        } else {
            setSuggestions([]); // 検索テキストが空の場合、サジェストをクリア
        }
    }, [searchText]);

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
        }
    };

    useEffect(() => {
        fetchFriendshipData();
    }, []);

    const sliceSuggestion=(index:number)=>{
        const updatedsuggestions = [...suggestions];
        updatedsuggestions.splice(index, 1);
        setSuggestions(updatedsuggestions);
    }

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
                fetchFriendshipData();
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
    const handleRequestedUserCard = async (props:deleteProps) => {
        try {
            const accessToken = localStorage.getItem("date-le-accessToken");
            const response = await axios.put("/api/put_friendship_status", {
                id: props.id,
                status: 'requested',
                action: props.action,
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
                updatedRequestedUser.splice(props.index, 1);
                setRequestedUser(updatedRequestedUser);
            }
        } catch (error) {
            // 削除に失敗した場合のエラーハンドリング
            console.error('削除に失敗しました。', error);
        }
    };

    return (
        <>
            <div>
                <div>
                    <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                            <Header />
                    </div>
                    <FriendshipSelector onStateChange={handleFriendshipSelector}/>
                </div>
                <div style={{ margin: "120px auto 20px",maxWidth:"800px" }}>
                    <div style={{width:"80%",margin:"auto",position:"relative"}}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                {/* ここに検索アイコンなどを設定 */}
                                <SearchIcon color="gray.400" />
                            </InputLeftElement>
                            <Input type="text"
                                   placeholder="接点の無いユーザー検索..."
                                   value={searchText}
                                   onChange={handleInputChange}
                            />
                        </InputGroup>
                        <div style={{ position: "absolute", zIndex: 1,
                            background: "white", top: "40px",
                            left: 0, width: "100%", boxShadow: "5px 5px 15px 0 rgba(17, 17, 26, .18)" }}>
                        { suggestions.length > 0 && (
                            suggestions.map((suggestion, index) => (
                                <SuggestUser
                                    key={index} // key prop が必要です
                                    index={index}
                                    id={suggestion?.id}
                                    name={suggestion?.name}
                                    image_url={suggestion?.image_url}
                                    status={suggestion?.status}
                                    fetchFriendshipData={fetchFriendshipData}
                                    sliceSuggestion={sliceSuggestion}
                                />
                            ))
                        )}
                        </div>
                    </div>
                    <div style={{ width: '95%', margin: 'auto' }}>
                        {selector === 'following' ? (
                            <>
                                {followingUser?.map((item, index) => (
                                    <FriendshipCard
                                        key={item.id}
                                        id={item.id}
                                        image_url={item.image_url}
                                        name={item.name}
                                        age={item.age}
                                        notice={item.notice}
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
                                        age={item.age}
                                        notice={item.notice}
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
                                        age={item.age}
                                        notice={item.notice}
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
                                        age={item.age}
                                        notice={item.notice}
                                        status='requested'
                                        commonIds={commonIds}
                                        requestCommonIds={requestCommonIds}
                                        onClick={(action) => handleRequestedUserCard({ id: item.id, action, index })}
                                    />
                                ))}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
       </>
    );
}

export default Dashboard;
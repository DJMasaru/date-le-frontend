import React, {useEffect, useState} from "react";
import axios from "axios";
import DashboardJobCard from "../../components/dashboardJobCard";
import DateSelector from "../../components/dateSelector";
import {useMediaQuery} from "@chakra-ui/react";
import Header from "../../components/header";

axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'https://date-le-backend-production.up.railway.app';

interface jobAndProfile {
    girls_profile: any;
    name: string;
    age: number;
    occupation:string;
    image_url:string;
    date_of_date: string;
    date_of_time: string;
    date_of_place: string
    comment_count: number;
    favorite_count :number;
}

interface friendsJobAndProfile{
    date_jobs:any;
    girls_profile:any;
    name:string;
}

interface user{
    name:string;
}

const Dashboard =()=> {
    const [userData, setUserData] = useState<user | null>(null);
    const [jobAndProfile, setJobAndProfile] = useState<jobAndProfile[]>([]);
    const [friendsJobAndProfile, setFriendsJobAndProfile] = useState<friendsJobAndProfile[]>([]);
    const [readingError, setReadingError] = useState<string>('');
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [selector,setSelector] = useState<string>('mine')
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUserData(response.data.user);
                setJobAndProfile(response.data.jobAndProfile);
                setFriendsJobAndProfile(response.data.friendsJobAndProfile)
            } catch (error) {
                console.error(error);
                setReadingError('デートが登録されていません。')
            }
        };

        fetchUserData();
    }, []);

    const handleDateSelector = (newMessage:any) => {
        setSelector(newMessage);
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
                                {userData && (
                                    <Header
                                        name={userData.name}
                                        image_url={"あああ"}
                                    />
                                )}
                            </div>
                            <DateSelector onStateChange={handleDateSelector}/>
                        </div>
                        <div style={{ marginTop: "120px" }}>
                            <div style={{ width: '95%', margin: 'auto' }}>
                                {/* dateJob の値を表示 */}
                                {selector === 'mine'
                                    ? jobAndProfile.map((item, index) => {
                                        const girlsProfile = item.girls_profile;
                                        return (
                                            <DashboardJobCard
                                                key={index}
                                                index={index}
                                                {...girlsProfile}
                                                date_of_date={item.date_of_date}
                                                date_of_time={item.date_of_time}
                                                date_of_place={item.date_of_place}
                                                comment_count={item.comment_count}
                                                favorite_count={item.favorite_count}
                                            />
                                        );
                                    })
                                    : selector === 'friends'
                                        ? friendsJobAndProfile.map((item2, index) => {
                                            return (
                                                    <DashboardJobCard
                                                        key={index}
                                                        index={index}
                                                        {...item2.date_jobs[0].girls_profile}
                                                        date_of_date={item2.date_jobs[0].date_of_date}
                                                        date_of_time={item2.date_jobs[0].date_of_time}
                                                        date_of_place={item2.date_jobs[0].date_of_place}
                                                        comment_count={item2.date_jobs[0].comment_count}
                                                        favorite_count={item2.date_jobs[0].favorite_count}
                                                        friend_name={item2.name}
                                                    />
                                                );
                                        })
                                        : null
                                }
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
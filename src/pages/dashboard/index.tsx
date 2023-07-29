import React, {useEffect, useState} from "react";
import axios from "axios";
import DashboardJobCard from "../../components/cards/dashboardJobCard";
import DateSelector from "../../components/dateSelector";
import {useMediaQuery} from "@chakra-ui/react";
import Header from "../../components/header";

interface jobAndProfile {
    girls_profile: any;
    name: string;
    age: number;
    occupation:string;
    image_url:string;
    date_of_date: string;
    time_of_date: string;
    place_of_date: string
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
    const [jobAndProfile, setJobAndProfile] = useState<jobAndProfile[]>([]);
    const [friendsJobAndProfile, setFriendsJobAndProfile] = useState<friendsJobAndProfile[]>([]);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [selector,setSelector] = useState<string>('mine')
console.log(friendsJobAndProfile);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setJobAndProfile(response.data.jobAndProfile);
                setFriendsJobAndProfile(response.data.friendsJobAndProfile)
            } catch (error) {
                console.error(error);
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
                    <div>
                        <div>
                            <div style={{position:"fixed",width:"100%",zIndex:2,top:"0"}}>
                                    <Header />
                            </div>
                            <DateSelector onStateChange={handleDateSelector}/>
                        </div>
                        <div style={{ marginTop: "120px" }}>
                            <div style={{ width: '95%', margin: 'auto' }}>
                                {selector === 'mine' ? (
                                    jobAndProfile.length !== 0 ? (
                                        jobAndProfile.map((item, index) => {
                                            const girlsProfile = item.girls_profile;
                                            return (
                                                <DashboardJobCard
                                                    key={index}
                                                    index={index}
                                                    {...girlsProfile}
                                                    date_of_date={item.date_of_date}
                                                    time_of_date={item.time_of_date}
                                                    place_of_date={item.place_of_date}
                                                    comment_count={item.comment_count}
                                                    favorite_count={item.favorite_count}
                                                />
                                            );
                                        })
                                    ) : (
                                        <p>ジョブが登録されていません。</p>
                                    )
                                ) : selector === 'friends' ? (
                                    friendsJobAndProfile.length !== 0 ? (
                                        friendsJobAndProfile.map((item2, index) => {
                                            return (
                                                <DashboardJobCard
                                                    key={index}
                                                    friend='friend'
                                                    index={index}
                                                    {...item2.date_jobs[0].girls_profile}
                                                    date_of_date={item2.date_jobs[0].date_of_date}
                                                    time_of_date={item2.date_jobs[0].time_of_date}
                                                    place_of_date={item2.date_jobs[0].place_of_date}
                                                    comment_count={item2.date_jobs[0].comment_count}
                                                    favorite_count={item2.date_jobs[0].favorite_count}
                                                    friend_name={item2.name}
                                                />
                                            );
                                        })
                                    ) : (
                                        <p>ジョブが登録されていません。</p>
                                    )
                                ) : null}
                            </div>

                        </div>
                    </div>
            ) : (
                <p>Waiting...</p>
            )}
       </>
    );
}

export default Dashboard;
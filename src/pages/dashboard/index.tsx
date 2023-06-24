import React, {useEffect, useState} from "react";
import axios from "axios";
import DashboardJobCard from "../../components/dashboardJobCard";
import theme from "@/theme";
import {ChakraProvider, Flex} from "@chakra-ui/react";

axios.defaults.baseURL = 'http://localhost:8000';

interface jobAndProfile {
    girls_profiles: any;
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

interface user{
    name:string;
}

const Dashboard =()=> {
    const [userData, setUserData] = useState<user | null>(null);
    const [jobAndProfile, setJobAndProfile] = useState<jobAndProfile[] | null>(null);
    const [readingError, setReadingError] = useState<string>('');

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
            } catch (error) {
                console.error(error);
                setReadingError('デートが登録されていません。')
            }
        };

        fetchUserData();
    }, []);
console.log(userData);
    return (

        <div>
            <ChakraProvider theme={theme}>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                >
            <p>Hello, Dashboard</p>
            {/* 条件付きレンダリング */}
            {readingError ? (
                <div>{readingError}</div>
            ) : (
                <div>
                    {/* userData の値を表示 */}
                    {userData && <p>{userData.name}</p>}

                    {/* dateJob の値を表示 */}
                    {jobAndProfile && jobAndProfile.map((item, index) => (
                        <DashboardJobCard
                            key={index}
                            {...item.girls_profiles}
                            date_of_date={item.date_of_date}
                            date_of_time={item.date_of_time}
                            date_of_place={item.date_of_place}
                            comment_count={item.comment_count}
                            favorite_count={item.favorite_count}
                        />
                    ))}
                </div>
            )}
            {/* <DashboardProfileCard /> */}
                </Flex>
            </ChakraProvider>
        </div>
    )
}

export default Dashboard;
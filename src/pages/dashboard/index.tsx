import React, {useEffect, useState} from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';

const Dashboard =()=> {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem("date-le-accessToken");
                const response = await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                // エラーハンドリング
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <p>Hello,Dashboard</p>
        </div>
    )
}

export default Dashboard;
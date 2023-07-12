import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {ChakraProvider, Flex, useMediaQuery} from "@chakra-ui/react";
import Header from "@/components/header";

axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'https://date-le-backend-production.up.railway.app';

interface dateJob{

}

interface dateComment{

}

interface user{
    name:string;
}
const DateDetailPage = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const { index } = router.query;
    const [dateJob,setDateJob] = useState<dateJob[] | null>(null);
    const [dateComment,setDateComment] = useState<dateComment[] | null>(null);
    const [userData, setUserData] = useState<user | null>(null);

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
                setDateComment(response.data.comments);
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
                        </div>
                    </div>
            ) : (
                <p>Desktop View</p>
            )}
        </>
    );
};

export default DateDetailPage;

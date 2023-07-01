import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import axios from "axios";
import theme from "@/theme";
import {ChakraProvider, Flex, useMediaQuery} from "@chakra-ui/react";

axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'https://date-le-backend-production.up.railway.app';

interface dateJob{

}

interface dateComment{

}
const DateDetailPage = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const { index } = router.query;
    const [dateJob,setDateJob] = useState<dateJob[] | null>(null);
    const [dateComment,setDateComment] = useState<dateComment[] | null>(null);
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
        <div>
            <ChakraProvider theme={theme}>
                {isMobile ?
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100vh"
                    >
                <p>Hello, Dashboard</p>
                        <div style={{width:'95%',margin:'auto'}}>
                            <p>あ</p>
                        </div>
                    </Flex>
                    : <p>Desktop View</p>}
            </ChakraProvider>
        </div>
    );
};

export default DateDetailPage;

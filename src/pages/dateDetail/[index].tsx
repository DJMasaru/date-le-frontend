import { useRouter } from 'next/router';
import {useEffect, useState} from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'https://date-le-backend-production.up.railway.app';

interface dateDetail{

}
const DateDetailPage = () => {
    const router = useRouter();
    const { index } = router.query;
    const [dateDetail,setDateDetail] = useState<dateDetail[] | null>(null);
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

                setDateDetail(response.data.dateDetail);
            } catch (error) {
                console.error(error);
                // setReadingError('デートが登録されていません。')
            }
        };

        fetchDateDetail();
    }, [index]);

    // keyを使用して詳細情報を取得・表示するなどの処理

    return (
        <div>
            <p>あ</p>
        </div>
    );
};

export default DateDetailPage;

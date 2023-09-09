import { Button } from "@chakra-ui/react";
import axios from "axios";

interface RefreshDataProps {
    onMessage: (message: string) => void;
}

const RefreshData=({onMessage}:RefreshDataProps)=>{

    const handleRefreshData =async()=>{
        try {
            const response = await axios.get('/api/refresh_data');
            const message = response.data.message;
            console.log(message);
            onMessage(message);
        }catch(error) {
            console.error(error);
        }
    }

    return(
        <Button
            colorScheme='gray'
            m={2}
            onClick={handleRefreshData}
        >
            データをリフレッシュする
        </Button>
    )

}

export default RefreshData;
import {
    Avatar,
    Badge, Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface DashboardJobCardProps{
    index:number;
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

const DashboardJobCard = ({ index,name,age,occupation, image_url,date_of_date,date_of_time,
                              date_of_place,comment_count,favorite_count, }:DashboardJobCardProps) => {
    const router = useRouter();
    const timeParts = date_of_time.split(':');
    const hour = timeParts[0];
    const minute = timeParts[1];

    const dataParts = date_of_date.split('-');
    const year = dataParts[0];
    const month = dataParts[1];
    const monthWithoutZero = parseInt(month, 10).toString();
    const day = dataParts[2];
    const dayWithoutZero = parseInt(day, 10).toString();
console.log(index);
    const handleClick = () => {
        // ダイナミックルーティングによる詳細画面への遷移
        router.push(`/dateDetail/${index}`);
    };


    return (
        <div>
            <Box
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={4}
                textAlign={'center'}
                onClick={handleClick} // カードをクリックしたときの処理を追加
                style={{ cursor: 'pointer' }} // ポインターを指すカーソルを表示するスタイルを追加
            >
                <Flex alignItems="center" marginBottom='1rem'>
                    <Avatar
                        size={'lg'}
                        src={image_url}
                    />
                        <Flex flexDirection="column" alignItems="center">
                            <p>{name} ({age})</p>
                            <p>{occupation}</p>
                        </Flex>
                </Flex>

                <p>{`${year}年${monthWithoutZero}月${dayWithoutZero}日`}</p>
                <p>{`${hour}時${minute}分`}</p>
                <p>{date_of_place}</p>

                        <p>{comment_count}</p>
                        <p>{favorite_count}</p>
            </Box>
        </div>
    );
}

export default DashboardJobCard;

import {
    Badge,
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

interface DashboardJobCardProps{
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

const DashboardJobCard = ({ name,age,occupation, image_url,date_of_date,date_of_time,
                              date_of_place,comment_count,favorite_count, }:DashboardJobCardProps) => {
    return (
<div>
    <p>{name}</p>
    <p>{age}</p>
    <p>{occupation}</p>
    <p>{image_url}</p>
    <p>{date_of_date}</p>
    <p>{date_of_time}</p>
    <p>{date_of_place}</p>
    <p>{comment_count}</p>
    <p>{favorite_count}</p>
</div>
    );
}

export default DashboardJobCard;

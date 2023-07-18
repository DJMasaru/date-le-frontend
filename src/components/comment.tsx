import React from "react";
import { Avatar, Box, Flex } from "@chakra-ui/react";

interface Comment {
    image_url: string;
    name: string;
    updated: string;
    content:string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

    return `${formattedDate} ${formattedTime}`;
};

const comment = ({ image_url, name, updated, content }: Comment) => {
    const formattedUpdated = formatDate(updated);

    return (
        <div style={{ margin: "10px", borderBottom: "1px solid #555555", paddingBottom: "5px" }}>
            <Flex>
                <Box height="100%" display="flex">
                    <Avatar size="md" src={image_url} />
                    <Flex alignItems="start" marginLeft="1rem" flexDirection="column">
                        <p style={{fontSize:"smaller"}}>{name}　投稿日：{formattedUpdated}</p>
                        <p>{content}</p>
                    </Flex>
                </Box>
            </Flex>
        </div>
    );
};

export default comment;

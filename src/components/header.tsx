import React, {useEffect, useState} from "react";
import {Avatar, Box, Flex, IconButton, useMediaQuery} from "@chakra-ui/react";
import {Menu, MenuButton, MenuList, MenuItem,} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import  Link  from 'next/link';
import axios from "axios";
interface User{
    name:string;
    image_url:string;
}

const Header =()=>{
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [userData, setUserData] = useState<User | null>(null);

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
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            {isMobile ? (
                <Box
                    background="black"
                    width="100%"
                    height="60px"
                    color="white"
                >
                    <Flex height="100%" alignItems="center" marginLeft="0.5rem" justifyContent="space-between">
                        <Box height="100%" display="flex" alignItems="center">
                            {userData && <Avatar size="md" src={userData.image_url} />}
                        </Box>
                        {userData &&  <p style={{ marginLeft: "1rem" }}>こんにちは、{userData.name}さん！</p>}
                        <div　style={{marginRight:"2rem",cursor:"pointer",width:"60px",display:"flex",alignItems:"center"}}>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon />}
                                    size="xl"
                                    variant="unstyled"
                                    colorScheme="white"
                                    backgroundColor="transparent"
                                />
                                <MenuList
                                    style={{
                                        minWidth: "300px", // モーダルの幅を調整する
                                        padding: "1rem", // モーダルの内側の余白を調整する
                                    }}>
                                    <MenuItem color='black'>
                                        <Link href="/makeDateJob">デートする</Link>
                                    </MenuItem>
                                    <MenuItem color='black'>
                                        <Link href="/checkGirlsInfo">女の子情報を確認する</Link>
                                    </MenuItem>
                                    <MenuItem color='black'>
                                        デートの履歴を確認する
                                    </MenuItem>
                                    <MenuItem color='black'>
                                        友達一覧を見る
                                    </MenuItem>
                                    <MenuItem color='black'>
                                        プロフィールを編集する
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </Flex>
                </Box>
            ) : (
                <p>Desktop View</p>
            )}
        </>
    );

}

export default Header;
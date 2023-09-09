import React, {useEffect, useState} from "react";
import {Avatar, Box, Flex, IconButton, useMediaQuery} from "@chakra-ui/react";
import {Menu, MenuButton, MenuList, MenuItem,} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import  Link  from 'next/link';
import axios from "axios";
import {useRouter} from "next/router";

interface User{
    name:string;
    image_url:string;
}

const Header =()=>{
    const router = useRouter();
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

    const handleLogOut　=async()=>{
        localStorage.removeItem('webToken');
        await router.push({
            pathname: '/login',
        });

    }

    return (
        <>
            <Box
                background="black"
                width="100%"
                height="60px"
                color="white"
            >
                <Flex height="100%" alignItems="center" marginLeft="2.5rem" justifyContent="space-between">
                    <Link href="/profile">
                        <Box height="100%" display="flex" alignItems="center">
                            {userData && <Avatar size="md" src={userData.image_url} />}
                        </Box>
                    </Link>
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
                                <Link href="/dashboard">
                                    <MenuItem color='black'>
                                        ダッシュボードに戻る
                                    </MenuItem>
                                </Link>
                                <Link href="/makeDateJob">
                                    <MenuItem color='black'>
                                        デートする
                                    </MenuItem>
                                </Link>
                                <Link href="/checkGirlsInfo">
                                    <MenuItem color='black'>
                                        女の子情報を確認する
                                    </MenuItem>
                                </Link>
                                <Link href="/dateLog">
                                    <MenuItem color='black'>
                                        デートの履歴を確認する
                                    </MenuItem>
                                </Link>
                                <Link href="/friendship">
                                    <MenuItem color='black'>
                                        友達一覧を見る
                                    </MenuItem>
                                </Link>
                                <Link href="/profile">
                                    <MenuItem color='black'>
                                        プロフィールを編集する
                                    </MenuItem>
                                </Link>
                                <MenuItem color='black'　onClick={handleLogOut}>
                                    ログアウト
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </Flex>
            </Box>
        </>
    );

}

export default Header;
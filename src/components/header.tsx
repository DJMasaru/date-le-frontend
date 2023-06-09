import React from "react";
import theme from "@/theme";
import {Avatar, Box, ChakraProvider, Flex, IconButton, useMediaQuery} from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
interface userProfile{
    name:string;
    image_url:string;
}

const header =({name,image_url}:userProfile)=>{
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <ChakraProvider theme={theme}>
            {isMobile ? (
                <Box
                    background="black"
                    width="100%"
                    height="60px"
                    color="white"
                >
                    <Flex height="100%" alignItems="center" marginLeft="0.5rem" justifyContent="space-between">
                        <Box height="100%" display="flex" alignItems="center">
                            <Avatar size="md" src={image_url} />
                        </Box>
                        <p style={{ marginLeft: "1rem" }}>こんにちは、{name}さん！</p>
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
                                        デートする
                                    </MenuItem>
                                    <MenuItem color='black'>
                                        女の子情報を確認する
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
        </ChakraProvider>
    );

}

export default header;
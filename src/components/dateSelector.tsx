import theme from "@/theme";
import { Box, Button, ChakraProvider, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";

interface dateSelector{
    onStateChange: (state: string) => void; // onStateChangeプロパティを追加
}
const dateSelector = (props:dateSelector) => {
    const { onStateChange } = props;
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [selectedTab, setSelectedTab] = useState<string>("mine");

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
        onStateChange(tab);
    };

    return (
        <ChakraProvider theme={theme} >
            {isMobile ? (
                <div style={{display:"flex", width:"100%", marginBottom:"1rem", position:"fixed", top:"60px", zIndex:1}}>
                    <Box width="50%">
                        <Button
                            borderRadius="0"
                            width="100%"
                            onClick={() => handleTabClick("mine")}
                            bg="white"
                        >
                            <p style={{ textAlign: "center" }}>自分の予定</p>
                        </Button>
                        {selectedTab === "mine" ? (
                            <Box
                                borderBottom="2px solid pink"
                                mx="auto"
                            />
                        ) : (
                            <Box borderBottom="2px solid #ABAEB4" mx="auto" />
                        )}
                    </Box>
                    <Box width="50%">
                        <Button
                            borderRadius="0"
                            width="100%"
                            onClick={() => handleTabClick("friends")}
                            bg="white"
                        >
                            <p style={{ textAlign: "center" }}>友達の予定</p>
                        </Button>
                        {selectedTab === "friends" ? (
                            <Box borderBottom="2px solid pink" mx="auto" />
                        ) : (
                            <Box borderBottom="2px solid #ABAEB4" mx="auto" />
                        )}
                    </Box>
                </div>
            ) : (
                <p>Desktop View</p>
            )}
        </ChakraProvider>
    );
};

export default dateSelector;

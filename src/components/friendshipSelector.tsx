import theme from "@/theme";
import { Box, Button, ChakraProvider, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";

interface dateSelector{
    onStateChange: (state: string) => void; // onStateChangeプロパティを追加
}

const dateSelector = (props:dateSelector) => {
    const { onStateChange } = props;
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [selectedTab, setSelectedTab] = useState<string>("following");

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
        onStateChange(tab);
    };

    return (
        <>
            {isMobile ? (
                <div style={{display:"flex", width:"100%", marginBottom:"1rem", position:"fixed", top:"60px", zIndex:1}}>
                    <Box width="50%">
                        <Button
                            borderRadius="0"
                            width="100%"
                            onClick={() => handleTabClick("following")}
                            bg="white"
                        >
                            <p style={{ textAlign: "center" }}>フォロー中</p>
                        </Button>
                        {selectedTab === "following" ? (
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
                            onClick={() => handleTabClick("followed")}
                            bg="white"
                        >
                            <p style={{ textAlign: "center" }}>フォロワー</p>
                        </Button>
                        {selectedTab === "followed" ? (
                            <Box borderBottom="2px solid pink" mx="auto" />
                        ) : (
                            <Box borderBottom="2px solid #ABAEB4" mx="auto" />
                        )}
                    </Box>
                </div>
            ) : (
                <p>Desktop View</p>
            )}
        </>
    );
};

export default dateSelector;

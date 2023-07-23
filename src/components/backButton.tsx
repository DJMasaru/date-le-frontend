import { useRouter } from 'next/router';
import {Button} from "@chakra-ui/react";

const BackButton = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <Button
            style={{width:"45%"}}
            background={"blue.300"}
            color="white"
            onClick={handleBack}>
            戻る
        </Button>
    );
};

export default BackButton;

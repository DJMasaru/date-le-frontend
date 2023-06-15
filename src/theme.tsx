import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        Button: {
            baseStyle: {
                width: '120px'
            },
        },
    },
});

export default theme;
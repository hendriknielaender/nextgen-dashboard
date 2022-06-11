import React from "react"
import { Link, Text, useColorModeValue } from '@chakra-ui/react';

const MenuItem = ({ children, to = "/", ...rest }) => {

    return (
        <Link href={to}>
            <Text display="block" {...rest} color={useColorModeValue('black', 'white')} px={4}>
                {children}
            </Text>
        </Link>
    )
}

export default MenuItem

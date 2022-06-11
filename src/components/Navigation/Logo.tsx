import React from "react"
import { Box, Text, useColorModeValue } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold" color={useColorModeValue('black', 'white')} px={4}>
        Logo
      </Text>
    </Box>
  )
}

import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { LuPlusSquare } from "react-icons/lu";
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";

const Navbar = () => {

    const { colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={'1140px'} px={4} >
        <Flex 
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
            base:'column',
            sm:'row'
        }}
        >
            <Text 
            fontSize={{base: '22', sm:'28'}}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
            bgGradient="to-r" gradientFrom="red.200" gradientTo="blue.200"
            bgClip={'text'}
            >
                <Link to={'/'}>Product Store 🛒</Link>
                
            </Text>

            <HStack spacing={2} alignItems={'center'}>
                <Link to={'/create'}>
                <Button>
                    <LuPlusSquare />
                </Button>
                </Link>

                <Button onClick={toggleColorMode}>
                    {colorMode === 'light'? <LuMoon/> : <LuSun/>}
                </Button>

            </HStack>

        </Flex>

    </Container>
  )
}

export default Navbar
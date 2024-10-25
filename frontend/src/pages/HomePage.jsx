import React, { useEffect } from 'react'
import {Container, Text, VStack, Grid, GridItem, Box} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  console.log(products);

  return (
    <Container maxW={'xl'} py={12}>
      <VStack borderSpacing={8}>
        <Text
        textStyle={'xl'}
        fontWeight={'bold'}
        textAlign={'center'}
        bgGradient="to-r" gradientFrom="red.200" gradientTo="blue.200"
        bgClip={'text'}>
          Current Products
        </Text>

        <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={10} w={'full'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        
        </Grid>

        
        {products.length ===0 && ( <Text
        textStyle={'xl'}
        fontWeight={'bold'}
        textAlign={'center'}
        color={'gray.500'}>
          No Products Found 😔. {' '}
          <Link to={'/create'}>
          <Text as={'span'} color={'blue.500'} _hover={{textDecoration:'underline'}}>Create a product</Text></Link>
        </Text>)}
      </VStack>
    </Container>
  )
}

export default HomePage
import { Box, Heading, HStack, IconButton, Image, Text, Button, Input } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import React, { useState } from 'react'
import {useColorModeValue} from './ui/color-mode';
import { useProductStore } from '../store/product';
import { Toaster, toaster } from './ui/toaster';
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger, DialogActionTrigger
  } from "./ui/dialog"

const ProductCard = ({product}) => {

    const {deleteProduct, updateProduct} = useProductStore();
    const [open, setOpen] = useState(false);
  

    const textColor = useColorModeValue('gray.800', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800')

    const [updatedProduct, setUpdatedProduct] = useState(product)

    const handleDeleteProduct= async (pid) => {
        
        const {success, message} = await deleteProduct(pid);
        toaster.create({
            title: success,
            description: message,
            duration:5000,
            type: !success? 'error': 'success'
        })

    };


    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        
        setOpen(!open);
        toaster.create({
            title: success,
            description: !success? 'Unable to apply changes': 'Successfully updated product',
            duration:5000,
            type: !success? 'error': 'success'
        })
    }

  return (
    
    <Box 
    shadow={'lg'}
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform:'translateY(-5px', shadow:'xl'}} 
    bg={bg}>
        <Toaster />
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                {product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton colorPalette={'blue'} onClick={() => setOpen(!open)}> <MdEdit /> </IconButton>
                <IconButton colorPalette={'red'} onClick={() => handleDeleteProduct(product._id)}> <MdDelete /></IconButton>
            </HStack>

        </Box>
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input placeholder='Product Name' value={updatedProduct.name} 
          onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
          <Input placeholder='Product Price' value={updatedProduct.price} type='number'
          onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
          <Input placeholder='Product Image URL' value={updatedProduct.image} 
          onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette={'blue'} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
        
    </Box>
    
  )
}

export default ProductCard;
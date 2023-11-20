import {
    Image,
    Stack,
    Text,
    useBreakpointValue,
    
    Flex,Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,  VStack,useToast, useDisclosure, Heading, HStack 
  } from '@chakra-ui/react';
  import Navbar from '../navbar/Navbar';
  import { Link } from 'react-router-dom';
  import logo from "../../assets/img/patient-checkup.avif"
  import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { useEffect } from 'react'

import AddAPPbutton from "../addAPPbutton"



  export default function Home() {

    return (
        <>
        {<Navbar />}
        
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Book Dr's
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                Appoinment online 
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              The project board is an exclusive resource for contract work. It's
              perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {<AddAPPbutton />}
              {/* <Button
               onClick={handleSubmitModel}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Book Appoinment 
              </Button>
              <Modal initialFocusRef={initialRef}isOpen={isaddOpen}onClose={onaddClose}>
        <ModalOverlay />
        <ModalContent w={{base:'90%',md:'100%'}}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection={'column'} gap={'2'}>
              <Text fontSize='md' >Name</Text>
              <Input  ref={initialRef} placeholder='Enter title' size='md' value={PName} onChange={(e)=>setPName(e.target.value)} />
              <Text fontSize='md'>Age</Text>
      <Input placeholder='Enter notes' size='md' value={Age} onChange={(e)=>setAge(e.target.value)} />
      <Text fontSize='md'>Relation</Text>
      <Input placeholder='Enter category' size='md' value={relation} onChange={(e)=>setrelation(e.target.value)} />
       <Text fontSize='md'>Mobile no </Text>
       <Input placeholder='Enter notes' size='md' value={MobileNo} onChange={(e)=>setMobileNo(e.target.value)} />
      
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onaddClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isupdateOpen}
        onClose={onupdateClose}
      ></Modal> */}
              <Button as={Link} to="/appoinment"  rounded={'full'}>How It Works</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={logo}          />
        </Flex>
      </Stack>
      </>
    );
  }
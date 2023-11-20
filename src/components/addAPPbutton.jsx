import React from 'react'
import { Text, Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,useToast, useDisclosure, 
  } from '@chakra-ui/react';

  import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'

function AddAPPbutton() {
    let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
let userID = localStorageData.LoginID 
const { isOpen: isaddOpen , onOpen: onaddOpen, onClose: onaddClose } = useDisclosure()
const { isOpen: isupdateOpen , onOpen: onupdateOpen, onClose: onupdateClose } = useDisclosure()

const initialRef = useRef(null)
const [PName, setPName] = useState('')
const [Age, setAge] = useState('')
const [relation, setrelation] = useState('')
const [MobileNo, setMobileNo] = useState('')  
const [data, setdata] = useState([])
const toast = useToast()  
const handleSubmit = async() =>{
const dataObj = {
  PName,Age,relation,MobileNo,userID
}
const config = {
  headers:{
    "Content-type":"application/json",
    "Authorization":localStorage.getItem("tok")
  }
}
try {
let ans = await axios.post('http://127.0.0.1:5001/Appoinment/create',dataObj,config)
toast({
  title: `Appoinment created`,
  status: 'success',
  duration: 2000,
  isClosable: false,
  
})
window.location.reload();
setPName('')
setAge('')
setrelation('')
setMobileNo('')
setdata((prev)=>[...prev,ans.data])
} catch (error) {
toast({
    title: `Login first`,
    status: 'error',
    duration: 4000,
    isClosable: false,
  })
console.log(error);
}
onaddClose()
}

const handleSubmitModel = () =>{
  setPName('')
  setAge('')
  setrelation('')
  setMobileNo('')
  onaddOpen()
}

  return (
    <>
      <Button
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
      ></Modal>
     
    </>
  )
}

export default AddAPPbutton

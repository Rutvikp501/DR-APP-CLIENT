import React from 'react'
import { Flex,Modal,ModalCloseButton,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button, Input,  VStack,useToast, useDisclosure, Heading, HStack } from '@chakra-ui/react'
import { Text,Box } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import AddAPPbutton from '../addAPPbutton'

const CreateAppoinment = () => {
  let localStorageData =JSON.parse( localStorage.getItem( 'tok' ) );
  let userID = localStorageData.LoginID 
  //console.log(userID);
    const { isOpen: isaddOpen , onOpen: onaddOpen, onClose: onaddClose } = useDisclosure()
    const { isOpen: isupdateOpen , onOpen: onupdateOpen, onClose: onupdateClose } = useDisclosure()

  const initialRef = useRef(null)
  const [PName, setPName] = useState('')
  const [Age, setAge] = useState('')
  const [relation, setrelation] = useState('')
  const [MobileNo, setMobileNo] = useState('')
  const [updateID, setupdateID] = useState('')
  const [CureentNo, setCureentNo] = useState('')
  const [data, setdata] = useState([])
  const toast = useToast()
  const params = { LoginID: userID}
  const getData = async() =>{
    try {
        let result = await axios.post('http://127.0.0.1:5001/Appoinment/',params)
        setdata(result.data.Users_Appoinments)
        setCureentNo(result.data.CurrenPNo)
    } catch (error) {
        console.log(error);
    }
  }
  const handleUpdate = async()=>{
     const dataObj = {
      PName,Age,relation,MobileNo
    }
    const config = {
        headers:{
          "Content-type":"application/json",
          "Authorization":localStorage.getItem("tok")
        }
    }
    try {
        let ans = await axios.patch(`http://127.0.0.1:5001/Appoinment/update/${updateID}`,dataObj,config)
        toast({
            title: `Note Updated`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
          onupdateClose()
          let updatedDataIndex = data.findIndex(item =>item._id == updateID)
          data[updatedDataIndex].PName = PName
          data[updatedDataIndex].Age = Age
          data[updatedDataIndex].relation = relation
          data[updatedDataIndex].MobileNo = MobileNo
    } catch (error) {
        toast({
            title: `Login first1`,
            description:`You don't have authorization`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
        console.log(error);
    }
}
  // const handleUpdateModal = (item)=>{
  //     onupdateOpen()
  //   const {PName,Age,relation,MobileNo,_id:id} = item
  //   setPName(PName)
  //   setAge(Age)
  //   setrelation(relation)
  //   setMobileNo(MobileNo)
  //   setupdateID(id)
  // }
  const handleDelete = async(id)=>{
    const config = {
        headers:{
          "Content-type":"application/json",
          "Authorization":localStorage.getItem("tok"),
          "userID":userID
        }
    }
    try {
        let ans = await axios.delete(`http://127.0.0.1:5001/Appoinment/delete/${id}`,config)
        toast({
            title: `Appoinment Deleted`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
          let dataAfterDelete = data.filter((item)=>{
            return id != item._id
          })
          setdata(dataAfterDelete)
    } catch (error) {
        toast({
            title: `Login first2`,
            description:`You don't have authorization`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
        console.log(error);
    }
  }
  
useEffect(()=>{
    getData()
},[])
  return (
    <>
     {<Navbar />}
    <VStack w={{base:'80%',md:'50%'}} m='auto' mt='7' spacing={'5'}>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isupdateOpen}
        onClose={onupdateClose} >
        <ModalOverlay />
        <ModalContent w={{base:'90%',md:'100%'}}>
          <ModalHeader>Update ME</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection={'column'} gap={'2'}>
              <Text fontSize='md' >Name</Text>
              <Input  ref={initialRef} placeholder='Enter title' size='md' value={PName} onChange={(e)=>setPName(e.target.value)} />
              <Text fontSize='md'>Age</Text>
      <Input placeholder='Enter notes' size='md' value={Age} onChange={(e)=>setAge(e.target.value)} />
      <Text fontSize='md'>relation </Text>
      <Input placeholder='Enter category' size='md' value={relation} onChange={(e)=>setrelation(e.target.value)} />
          </ModalBody>
      <Text fontSize='md'>Mobile No </Text>
      <Input placeholder='Enter category' size='md' value={MobileNo} onChange={(e)=>setMobileNo(e.target.value)} />
          
          <ModalFooter>
            <Button onClick={handleUpdate} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onupdateClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {<AddAPPbutton />}  <Box bg='tomato' w='30%' p={4} color='white'><Text fontSize='lg' >CureentNo :  {CureentNo}</Text></Box>
      {
        data.length == 0?<h1>No Appoinment to show</h1>:data.map((item)=>{
            return(
          <Flex key={item._id} w='100%' border='1px' borderColor='gray.200' flexDirection={'column'} spacing={'1'} alignItems="left" p={'5'}>
           
        <Heading fontSize='lg' >Appoinment No :  {item.AppoinmentNo}</Heading> 
        <Text fontSize='lg' >Name :  {item.PName}</Text> 
        <Text fontSize='lg' >Age :  {item.Age}</Text>
        <Text fontSize='lg' >relation :  {item.relation}</Text>
        <Text fontSize='lg' >Mobile No :  {item.MobileNo}</Text>
        <HStack mt='5' justify={'center'} gap='10%'>
          {/* <Button colorScheme='yellow' onClick={()=>{handleUpdateModal(item)}}>Update</Button> */}
          <Button colorScheme='red' onClick={()=>{handleDelete(item._id)}}>Cancle Appoinment</Button>
        </HStack>
        </Flex>
            )
        })
      }
      
    </VStack>
    </>
  )
}

export default CreateAppoinment
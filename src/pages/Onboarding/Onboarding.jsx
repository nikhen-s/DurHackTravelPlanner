import React from 'react';
import { Button, Container, Image, Box } from '@chakra-ui/react';
import introImage from '../../assets/page1_img.gif'
import Form from '../../components/Form/Form';
import './Onboarding.styles.css'

// const myObj = { experiences: ['a', 'b', 'c'] };
// const myObj2 = { experiences: ['a', 'b', 'c'] };

// const objectCheck = (obj) => {
//   for (const [key, value] of Object.entries(obj)) {
//     return value;
//   }
// }

// if (objectCheck(myObj).every(r => objectCheck(myObj2).includes(r))) {
//   console.log('all match')
// } else {
//   console.log('no match')
// }

const Onboarding = () => {
  return (
    <>
      <Box display="flex">
        <Box width="50%">
          <Image 
            src={introImage} 
            alt='liquid-img'
            height="100vh"
            objectFit="cover"
          />
        </Box>
        <Box className='formbox-container'>
          <Box className='inner-formbox'>
            <Form />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Onboarding
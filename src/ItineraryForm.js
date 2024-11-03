import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Input,
    RadioGroup,
    HStack,
    Checkbox,
    Button
  } from '@chakra-ui/react'
  import { useState } from 'react'

  const ItineraryForm = () => {

    const [locationInput, setLocationInput] = useState('')
    const [durationOfTripInput, setDurationOfTripInput] = useState(1)
    const [typesOfExperiencesInput, setTypesOfExperiencesInput] = useState([])
    const handleLocationInputChange = (e) => setLocationInput(e.target.value)
    const handleDurationOfTripInputChange = (e) => setDurationOfTripInput(e.target.value)
    const handleExperienceChange = (e) => {
        const { value, checked } = e.target;
        setTypesOfExperiencesInput((prev) =>
            checked
                ? [...prev, value] // Add selected experience
                : prev.filter((experience) => experience !== value) // Remove unselected experience
        );
    };

    return(
    <Stack padding={5}>
        <FormControl>
     <FormLabel>Location</FormLabel>
     <Input type='email' onChange={handleLocationInputChange}/>
     <FormHelperText>Input the city and country which you want to travel to.</FormHelperText>
     <FormLabel as='legend'>
    </FormLabel>
    <FormLabel>Duration of Trip</FormLabel>
     <Input type='number' onChange={handleDurationOfTripInputChange}/>
     <FormHelperText>Input the duration of your trip (in days)</FormHelperText>
     <FormLabel as="legend">Types of Experiences</FormLabel>
        <HStack spacing="24px">
            <Checkbox value="Beach" onChange={handleExperienceChange}>Beach</Checkbox>
            <Checkbox value="Cultural Sites" onChange={handleExperienceChange}>Cultural Sites</Checkbox>
            <Checkbox value="Adventure Activities" onChange={handleExperienceChange}>Adventure Activities</Checkbox>
            <Checkbox value="Nightlife Clubbing" onChange={handleExperienceChange}>Nightlife Clubbing</Checkbox>
            <Checkbox value="Culinary Experiences" onChange={handleExperienceChange}>Culinary Experiences</Checkbox>
            <Checkbox value="Shopping" onChange={handleExperienceChange}>Shopping</Checkbox>
            <Checkbox value="Nature" onChange={handleExperienceChange}>Nature</Checkbox>
        </HStack>
    <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            onClick={() => window.location.href = `/itineraryplanner?city=${locationInput}&numOfDays=${durationOfTripInput}&places=${typesOfExperiencesInput}`}
          >
            Submit
          </Button>
   </FormControl>

    </Stack>
     
    )
   }

  export default ItineraryForm;
import React from "react"
import "./LandingPage.css"
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { AnimatedBackground } from 'animated-backgrounds'
import { Button, ButtonGroup, position } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { PiSelectionBackgroundFill } from "react-icons/pi"




const LandingPage = () => {
    return (
        <div id = "back">
            <div id = "header" style = {{backgroundColor: "#09091d"}}>
                <div id = "navbar">
                    <h1>DurHack Travel Planner</h1>
                </div>
            </div>
            <div id = "container">
            <div id = "buttons">
                <VStack spacing = "24px">
                    <Button _hover={{backgroundColor: "#0d1529"}} color = "white" borderRadius = "12px" variant = "ghost" size = "lg" height = "15vh"  className = "landingButton" id = "location">Location Recommendation</Button>
                    <Button _hover={{backgroundColor: "#0d1529"}} color = "white" borderRadius = "12px" variant = "ghost" size = "lg" height = "15vh"  className = "landingButton" id = "itinerary">Itinerary Recommendation</Button>
                </VStack>
            </div>
            <div id = "background">
                <AnimatedBackground style = {{height: "100%", width: "100%", position: "bottom right"}} animationName = "galaxySpiral"/>
            </div>
            </div>
        </div>


    )
}

export default LandingPage
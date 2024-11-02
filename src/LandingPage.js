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
            <div id = "header" style = {{backgroundColor: "#00000f"}}>
                <div id = "navbar">
                    <h1>DurHack Travel Planner</h1>
                </div>
            </div>
            <div id = "mid">
                <VStack spacing = "24px">
                    <Button _hover={{backgroundColor: "#00de93"}} color = "white" borderRadius = "12px" variant = "ghost" size = "lg" height = "15vh"  className = "landingButton" id = "location">Location Recommendation</Button>
                    <Button _hover={{backgroundColor: "#00de93"}} color = "white" borderRadius = "12px" variant = "ghost" size = "lg" height = "15vh"  className = "landingButton" id = "itinerary">Itinerary Recommendation</Button>
                </VStack>
            </div>
            <div id = "background">
                    <AnimatedBackground  style = {{
                        position: "bottom right"}} animationName = "auroraBorealis"/>
            </div>
        </div>


    )
}

export default LandingPage
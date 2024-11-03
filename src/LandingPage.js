import React from "react"
import { useEffect } from "react";
import "./LandingPage.css"
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup, position } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { PiSelectionBackgroundFill } from "react-icons/pi"


const LandingPage = () => {

    const handleMouseMove = (event) => {
        const gradientDiv = document.getElementById('back');
        const { clientX, clientY } = event;
        const { offsetWidth, offsetHeight } = gradientDiv;
        const xPercent = (clientX / offsetWidth) * 100;
        const yPercent = (clientY / offsetHeight) * 100;
        gradientDiv.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #FABF35, #FBCF67 150px)`;
    };

    useEffect(() => {
        const gradientDiv = document.getElementById('back');
        gradientDiv.addEventListener('mousemove', handleMouseMove);
        return () => {
            gradientDiv.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div id = "back">
            <div id = "header">
                <h1 id = "head1">DurHack</h1>
                <h2 id = "head2">Travel Advice</h2>
            </div>
            <div id = "top">
            <div id = "beach">
                <Image id = "beachImage" src = "/beach.png"/>
            </div>
            <div id = "sand">
                <div id = "sandText">
                    <p id = "para">Use this website to discover your ideal holiday in moments!</p>
                </div>
                <div id = "buttons">
                    <Button boxShadow = "dark-lg" _hover = {{background: "white", color: "#79513E", boxShadow: "xs"}} bgGradient = "radial(#E4DAC6, #EEEDE9)" border = "8px solid #79513E" colorScheme="white" style = {{borderRadius: "200%", fontSize: "3vmin", height: "25vw", width: "25vw"}} className = "buttonStyle" id = "left">🌴Location🌴<br></br> Advice</Button>
                    <Button boxShadow = "dark-lg" _hover = {{background: "white", color: "#79513E", boxShadow: "xs"}} bgGradient = "radial(#E4DAC6, #EEEDE9)" colorScheme="white" border = "8px solid #79513E" style = {{borderRadius: "200%", fontSize: "3vmin", height: "25vw", width: "25vw"}} className = "buttonStyle" id = "right">✈️Itinerary✈️<br></br> Advice</Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
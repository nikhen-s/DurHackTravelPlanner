import { Text, Button } from '@chakra-ui/react'
import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import env from "react-dotenv";
import ReactMarkdown from 'react-markdown'

const API_KEY = env.API_KEY || ""


const ItineraryRecommendationPage = () => {
    const [itinerary, setItinerary] = useState("");

    const getItinerary = () => {
        const url = 'https://api.together.xyz/v1/chat/completions';
        
        const headers = {
            Authorization: `Bearer ${API_KEY}`, // Replace with your actual API key
            'Content-Type': 'application/json',
        };
    
        // Data you would send
        const data = {
            model: 'meta-llama/Llama-Vision-Free',
            messages: [{ role: 'user', content: 'Give me an itinerary for Nice, 1 day, I want to visit museums, beaches, eat local food.' }],
        };
    
        axios.post(url, data, { headers })
            .then(response => {
                // Convert `\n\n` to separate paragraphs
                const responseText = response.data["choices"][0]["message"]["content"]

                setItinerary(responseText)
                console.log(response.headers); // Print the response
                console.log(response.data); // Print the response
            })
            .catch(error => {
                console.error('Error making the request:', error);
            })
    }

    return (
        <>
            <Button onClick={getItinerary}>Generate Itinerary</Button>
            <ReactMarkdown children ={itinerary} style={{ whiteSpace: "pre-wrap" }}></ReactMarkdown>
        </>
    )
}

export default ItineraryRecommendationPage;
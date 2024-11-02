import { Text, Button,Stack } from '@chakra-ui/react'
import './ItineraryRecommendation.css';
import axios from "axios";
import { useState, useRef, useEffect } from 'react';
import env from "react-dotenv";
import ReactMarkdown from 'react-markdown'
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const API_KEY = env.API_KEY || ""
const MAPBOX_API_KEY = env.MAPBOX_API_KEY || ""


const LocationMap = () => {
    const [popupInfo, setPopupInfo] = useState(null);

    return(
        <Map
      mapboxAccessToken={MAPBOX_API_KEY}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: "100%", height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
    )
}

const ItineraryRecommendationPage = () => {
    const mapRef = useRef()
    const mapContainerRef = useRef()

    const [itinerary, setItinerary] = useState("");
    const [locations, setLocations] = useState([])

    const getItinerary = () => {
        const url = 'https://api.together.xyz/v1/chat/completions';
        const headers = {
            Authorization: `Bearer ${API_KEY}`, // Replace with your actual API key
            'Content-Type': 'application/json',
        };
        const city = "London"
        // Data you would send
        const data = {
            model: 'meta-llama/Llama-Vision-Free',
            messages: [{ role: 'user', 
            content: `Give me an itinerary for ${city}, 1 day, I want to visit museums, beaches, eat local food. At the last line of your response, provide a list of the recommended places in the following format, with each place separated by commas like "Place1", "Place2", "Place3", please indicate the start with a | and the end with a |.`}],
        };
    
        axios.post(url, data, { headers })
            .then(response => {
                const responseText = response.data["choices"][0]["message"]["content"]
                const firstPipeIndex = responseText.indexOf('|');
                const lastPipeIndex = responseText.lastIndexOf('|');
                const placesString = responseText.substring(firstPipeIndex + 1, lastPipeIndex).trim();
                const placesArray = placesString.split(',').map(place => place.trim());
                setLocations(placesArray)
                setItinerary(responseText)

            })
            .catch(error => {
                console.error('Error making the request:', error);
            })
    }

    return (
        <>
        <Stack p="5">
            <Button onClick={getItinerary}>Generate Itinerary</Button>
            <Text className="markdown-list" borderWidth="1px" rounded="md" p="5">
                <ReactMarkdown children ={itinerary}></ReactMarkdown>
            </Text>
            <Text>{locations}</Text>
            <LocationMap></LocationMap>
            
        </Stack>
        </>
    )
}

export default ItineraryRecommendationPage;
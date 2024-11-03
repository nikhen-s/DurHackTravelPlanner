import { Flex, Box, Button,Stack } from '@chakra-ui/react'
import './ItineraryRecommendation.css';
import axios from "axios";
import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown'
import Map, {Popup, Marker, Source, Layer,  NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { IoIosPin } from "react-icons/io";

const API_KEY = process.env.REACT_APP_LLAMA_API_KEY || ""
const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY || ""


const ItineraryRecommendationPage = () => {

    const [itinerary, setItinerary] = useState("");
    const [fetchedLocations, setFetchedLocations] = useState([]); // State for fetched locations
    const [popupInfo, setPopupInfo] = useState(null);

    const pins = useMemo( () => 
        {return fetchedLocations.map(
            (location, index) => {
                const long = Number((location[1][0])).toFixed(3)
                const lat = Number((location[1][1])).toFixed(3)

                return (
                <Marker key={index}
                longitude={long}
                latitude={lat}
                pitchAlignment="auto" 
                onClick={e => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
                    e.originalEvent.stopPropagation();
                    setPopupInfo([location[0],[long,lat]]);
                  }}
                color='Black'
                anchor="bottom"
                >
                    <IoIosPin size="20px" color='red'/>
                </Marker>
            )
            }
        )}
    )

    const getItinerary = async () => {
        const url = 'https://api.together.xyz/v1/chat/completions';
        const headers = {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        };
        const city = "Thailand, Bangkok";
        
        // Data you would send
        const data = {
            model: 'meta-llama/Llama-Vision-Free',
            messages: [{
                role: 'user',
                content: `Generate a 3-day itinerary for ${city} including only top-rated museums, popular beaches, and famous local restaurants. At the final line, provide a list of the recommended places, ensuring to include their full names, in the following format: "| Place1, Place2, Place3 |".`
            }],
        };

        try {
            const response = await axios.post(url, data, { headers });
            const responseText = response.data["choices"][0]["message"]["content"];
            const firstPipeIndex = responseText.indexOf('|');
            const lastPipeIndex = responseText.lastIndexOf('|');
            const placesString = responseText.substring(firstPipeIndex + 1, lastPipeIndex).trim();
            const placesArray = placesString.split(',').map(place => `${city} ${place.trim()}`);

            setItinerary(responseText); // Store the itinerary
            const fetchedLocationsData = await fetchLocations(placesArray);
            setFetchedLocations(fetchedLocationsData.filter(location => location)); // Store the fetched locations, filtering out null values

        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    const fetchLocations = async (locations) => {
        return await Promise.all(locations.map(async (location) => {
            const uriCompatibleLocation = encodeURIComponent(location);
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${uriCompatibleLocation}.json?access_token=${MAPBOX_API_KEY}`;

            try {
                const response = await axios.get(url);
                const place_name = response.data.features[0].place_name;
                const coordinates = response.data.features[0].geometry.coordinates;
                return [place_name, coordinates];
            } catch (error) {
                console.error(`Error fetching location for ${location}:`, error);
                return null; // Handle the error and return `null` if needed
            }
        }));
    };
    
    const LocationMap = ({fetchedLocations}) => {
        const longitudes = fetchedLocations.map(location => location[1][0]);
        const latitudes = fetchedLocations.map(location => location[1][1]);
        const avgLongitude = longitudes.reduce((sum, long) => sum + long, 0) / longitudes.length;
        // Calculate average latitude
        const avgLatitude = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
        
        // Update the viewport to center on the calculated bounds
        const viewport = {
            longitude: avgLongitude,
            latitude: avgLatitude,
            zoom: 8, // Adjust zoom level if needed
        };

        const layerStyle = {
            id: 'point',
            type: 'circle',
            paint: {
                'circle-color': 'rgba(144, 238, 144, 0.5)', // Light green with 50% opacity
                // Border color
                'circle-stroke-color': '#008000', // Green border
                // Border width
                'circle-stroke-width': 2, // Adjust thickness as needed
                // Circle radius
                'circle-radius': 100,
            }
          };

        return(
            <Map
          mapboxAccessToken={MAPBOX_API_KEY}
          initialViewState={viewport}
          style={{width: "50%", height: 700}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />
            <Source id="my-data" type="geojson" data={{
            type: 'FeatureCollection',
            features: [
              {type: 'Feature', geometry: {type: 'Point', coordinates: [viewport["longitude"], viewport["latitude"]]}}
            ]
          }}>
                <Layer {...layerStyle} />
            </Source>
            {pins}

            {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo[1][0])}
            latitude={Number(popupInfo[1][1])}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo[0]}
            </div>
          </Popup>
        )}
    
        </Map>
        )
    }
    //display Map only after get requests, etc are done.
    return (
        <>
        <Stack p="5">
            <Button onClick={getItinerary}>Generate Itinerary</Button>
            <Flex direction={"row"}>
                <Box className="markdown-list" borderWidth="1px" rounded="md" p="5" flex="1">
                    <ReactMarkdown children ={itinerary}></ReactMarkdown>
                </Box>
                {fetchedLocations.length > 0 && <LocationMap flex="1" fetchedLocations={fetchedLocations} />}
            </Flex>
        </Stack>
        </>
    )
}

export default ItineraryRecommendationPage;
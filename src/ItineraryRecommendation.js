import { Text, Flex, Box, Button,Stack, Spacer } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import './ItineraryRecommendation.css';
import { Slide } from 'react-slideshow-image';
import axios from "axios";
import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown'
import Map, {Popup, Marker, Source, Layer,  NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { IoIosPin } from "react-icons/io";
import 'react-slideshow-image/dist/styles.css'

const API_KEY = process.env.REACT_APP_LLAMA_API_KEY || ""
const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY|| ""
const REACT_APP_PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY || ""

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }


const ItineraryRecommendationPage = () => {
    // const city = "UK, London";
    // const numOfDays = 1;
    // const places = ["Beaches", "Cultural sites"]
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const city = queryParams.get('city');
    const numOfDays = queryParams.get('numOfDays');
    let places = queryParams.get('places');
    const decoded_places = [decodeURIComponent(places)];
    const [isLoading, setLoading] = useState(true)
    const [itinerary, setItinerary] = useState("");
    const [fetchedLocations, setFetchedLocations] = useState([]); // State for fetched locations
    const [fetchedLocationPhotos, setFetchedLocationPhotos] = useState([])
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
        const places_with_famous = decoded_places.map((place) => `Famous ${place}`)
        const placesString = places_with_famous.join(", ");
        // Data you would send
        const data = {
            model: 'meta-llama/Llama-Vision-Free',
            messages: [{
                role: 'user',
                content: `Generate a ${numOfDays}-day itinerary for ${city} including only ${placesString}. At the final line, provide a list of the recommended places, ensuring to include their full names, in the following format: "| Place1, Place2, Place3 |".`
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
            const fetchedImagesOfLocations = await fetchImagesOfLocations(placesArray);
            const uniqueImages = [...new Set(fetchedImagesOfLocations)]; // Remove duplicates
            setFetchedLocationPhotos(uniqueImages);
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };
    getItinerary().then(
        () => {
            setLoading(false)
        }
    )
    const fetchImagesOfLocations = async (locations) => {
        return await Promise.all(locations.map(async (location) => {
            const url = `https://api.pexels.com/v1/search?query=${location}&per_page=1`
            try{
                const response = await axios.get(url,{
                    headers: {
                        'Authorization': REACT_APP_PEXELS_API_KEY
                    }
                });
                const image_src = response.data["photos"][0]["src"]["original"]
                console.log(image_src)
                return image_src
            }catch (error) {
                console.error('Error fetching image:', error);
            }
        }))
    }


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
          style={{width: "100%", height: 900}}
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
        {
            (isLoading || fetchedLocations.length==0)&& 
            <Stack justifyContent="center" alignItems="center">
                <Spacer></Spacer>
                <Spacer></Spacer>
                <Spinner size="xl"/>
            </Stack>
            
        }
        {
            !isLoading && fetchedLocations.length > 0 && fetchedLocationPhotos.length > 0 &&
                <Stack p="5">
            <Text align={"center"}><strong>Itinerary for {city}</strong></Text>
            <Flex direction={"row"}>
                <Box className="markdown-list" borderWidth="1px" rounded="md" p="5" flex="1">
                    <ReactMarkdown children ={itinerary}></ReactMarkdown>
                </Box>
                <Stack flex="1" width={"100%"}>
                    {fetchedLocations.length > 0 && <LocationMap flex="1" fetchedLocations={fetchedLocations} />}
                </Stack>
            </Flex>
            <Text align={"center"} borderWidth="1px" rounded="md" p="2" backgroundColor={"purple.100"}><strong>Your Travel Vibes</strong></Text>
            <div className="slide-container">
                <Slide>
                {fetchedLocationPhotos.map((slideImage, index)=> (
                    <div key={index}>

                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                    {fetchedLocationPhotos.map((photo_src, index) => (
                        <img 
                            key={index} 
                            src={photo_src} 
                            style={{ width: "50%", borderRadius: "8px"}} // Ensures images are responsive within their grid cells
                            alt={`Location ${index}`}
                        />
                    ))}
                    </div>
                    </div>
                ))} 
                </Slide>
            </div>
        </Stack>
    }
        </>
    )
}

export default ItineraryRecommendationPage;
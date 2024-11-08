import cities from './CityData.json'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'

let weatherMatches = {}
let costMatches = {}
let coastalMatches = {}
let experiencesMatches = {}

const applyWeatherFilter = (key, weather, cityWeather) => {
    if(weather === 'Hot' && cityWeather <= 10) {
        weatherMatches[key] = cities[key]
        return 1;
    }
    else if(weather === 'Mild' && cityWeather > 10 && cityWeather <= 20) {
        weatherMatches[key] = cities[key]
        return 1;
    }
    else if(weather === 'Hot' && cityWeather > 20) {
        weatherMatches[key] = cities[key]
        return 1;
    };
    return 0;
}

const applyCostFilter = (key, cost) => {
    if(cities[key].cost === 'Low' && cost <= 10) {
        costMatches[key] = cities[key]
        return 1;
    }
    else if(cities[key].cost === 'Medium' && cost > 10 && cost <= 20) {
        costMatches[key] = cities[key]
        return 1;
    }
    else if(cities[key].cost === 'High' && cost > 20) {
        costMatches[key] = cities[key]
        return 1;
    };
    return 0;
}

const applyCoastalFilter = (key, coastal) => {
    if(cities[key].coastal == coastal) {
        coastalMatches[key] = cities[key]
        return 1;
    }
    else {
        return 0;
    }
}

const applyExperiencesFilter = (key, experiences) => {
    const expKeys = ['culturalSites', 'culinary', 'nightlife', 'shopping', 'nature', 'entertainment']
    let matches = 0;
    let length = 0;
    // console.log(typeof(experiences));
    // Object.keys(experiences).forEach((index) => {
    //     if(experiences[index]) {
    //         matches++;
    //     }
    //     length++;
    // });
    
    // if(matches >= 3 && matches === length) {
    //     experiencesMatches[key] = cities[key];
    //     return 1;
    // }
    // return 0;
}

const MakeRecommendation = ({weather, season, cost, coastal}) => {
    const seasonMap = {
        Spring: 0,
        Summer: 1,
        Autumn: 2,
        Winter: 3
    }

    let matchCounts = new Map();
    Object.keys(cities).forEach(key => {
        let seasonIdx = seasonMap[season];
        let cityWeather = cities[key].weather[seasonIdx]; // temperature of city in given season
        let hasWeather = applyWeatherFilter(key, weather, cityWeather);
        let hasCost = applyCostFilter(key, cost);
        let hasCoastal = applyCoastalFilter(key, coastal);
        // applyExperiencesFilter(key, experiences);
        matchCounts.set(key, hasWeather + hasCost + hasCoastal) /**+ hasExperience */;
    })
    const sortedMatchCounts = new Map([...matchCounts.entries()].sort((a, b) => b[1] - a[1]));
    console.log(sortedMatchCounts);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2em', marginBottom: '20px' }}><b>Location Recommendations</b></h1>
            <Accordion>
                {Array.from(sortedMatchCounts.entries()).map(([key], index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton _expanded={{ bg: '#D8BFD8', color: 'black' }}>
                                <Box as='span' flex='1' textAlign='left'>
                                    {Object.keys(cities)[index]} {index < 5 ? <b><span style={{ color: 'darkgreen' }}>— Top match</span></b> : ''}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={5}>
                            <p><b>Description:</b> {cities[key].description}</p>
                            <p style={{marginTop: "10px", marginBottom: "10px"}}><b>Possible Attractions:</b> {cities[key].attraction.join(', ')}</p>
                            <img src={require(`../location_images/${key.toLowerCase().replace(/ /g, '_')}_tourist_images/${key.toLowerCase().replace(/ /g, '')}2.jpg`)} alt={`${key} tourist spot`} style={{ marginTop: '10px', borderRadius: '5px', width: '400px', height: 'auto' }} />
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
    

}


// 1. Store locations info in a json object
// 2. Take input from form
// 3. Apply filters and algorithm to store locations per criterion
// 4. Count criterion matches per location
// 5. Sort locations by match count
// 6. Setup description for each location

// TODO: show recommendation (showRecommendation) locations and frontend suggestions to user, Autofill itinerary, Fix hasExperience filter
//'culture', 'culinary', 'nightlife', 'shopping', 'nature', 'entertainment'
// MakeRecommendation({weather: 'Mild', season: 'Summer', cost: 20, coastal: true, experiences: [true, true, true, false, false, false]})

export default MakeRecommendation;
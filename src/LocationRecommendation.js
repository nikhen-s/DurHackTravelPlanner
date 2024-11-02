const cities = {
    Tokyo: {
        weather: [15, 25, 19, 5], // [spring, summer, autumn, winter]
        coastal: true,
        cost: 'High',
        experiences: ['culturalSites', 'culinary', 'nightlife']
    },
    London: {
        weather: [10, 19, 12, 5],
        coastal: false,
        cost: 'High',
        experiences: ['culturalSites', 'shopping', 'nightlife']
    },
    Paris: {
        weather: [12, 22, 14, 5],
        coastal: false,
        cost: 'High',
        experiences: ['culturalSites', 'culinary', 'shopping']
    },
    Rome: {
        weather: [15, 27, 18, 8],
        coastal: false,
        cost: 'Medium',
        experiences: ['culturalSites', 'culinary', 'nature']
    },
    Bangkok: {
        weather: [30, 32, 30, 26],
        coastal: false,
        cost: 'Low',
        experiences: ['culinary', 'nightlife', 'culturalSites']
    },
    Singapore: {
        weather: [27, 28, 27, 26],
        coastal: true,
        cost: 'High',
        experiences: ['culinary', 'shopping', 'entertainment']
    },
    HongKong: {
        weather: [21, 28, 24, 16],
        coastal: true,
        cost: 'High',
        experiences: ['culinary', 'nightlife', 'shopping']
    },
    Dubai: {
        weather: [27, 36, 31, 21],
        coastal: true,
        cost: 'High',
        experiences: ['shopping', 'entertainment', 'culinary']
    },
    Barcelona: {
        weather: [17, 25, 19, 11],
        coastal: true,
        cost: 'Medium',
        experiences: ['culturalSites', 'culinary', 'nightlife']
    },
    NewYork: {
        weather: [12, 24, 15, 3],
        coastal: true,
        cost: 'High',
        experiences: ['entertainment', 'nightlife', 'culturalSites']
    },
    Amsterdam: {
        weather: [10, 17, 12, 4],
        coastal: false,
        cost: 'Medium',
        experiences: ['culturalSites', 'nightlife', 'nature']
    },
    Seoul: {
        weather: [15, 27, 18, 3],
        coastal: false,
        cost: 'Medium',
        experiences: ['culturalSites', 'nightlife', 'culinary']
    },
    SanFrancisco: {
        weather: [14, 17, 16, 11],
        coastal: true,
        cost: 'High',
        experiences: ['nature', 'culturalSites', 'culinary']
    },
    LosAngeles: {
        weather: [18, 24, 22, 14],
        coastal: true,
        cost: 'High',
        experiences: ['entertainment', 'nightlife', 'culinary']
    }
};

let weatherMatches = {}
let costMatches = {}
let purposeMatches = {}
let coastalMatches = {}
let experiencesMatches = {}

const applyWeatherFilter = (key, weather, cityWeather) => {
    if(weather === 'Hot' && cityWeather <= 10) {
        weatherMatches[key] = cities[key]
    }
    else if(weather === 'Mild' && cityWeather > 10 && cityWeather <= 20) {
        weatherMatches[key] = cities[key]
    }
    else if(weather === 'Hot' && cityWeather > 20) {
        weatherMatches[key] = cities[key]
    };
}

const applyCostFilter = (key, cost) => {
    if(cities[key].cost === 'Low' && cost <= 10) {
        costMatches[key] = cities[key]
    }
    else if(cities[key].cost === 'Medium' && cost > 10 && cost <= 20) {
        costMatches[key] = cities[key]
    }
    else if(cities[key].cost === 'High' && cost > 20) {
        costMatches[key] = cities[key]
    };
}

const applyCoastalFilter = (key, coastal) => {
    if(cities[key].coastal === coastal) {
        coastalMatches[key] = cities[key]
    }
}

const applyExperiencesFilter = (key, experiences) => {
    let matches = 0;
    for (let i = 0; i < experiences.length; i++) {
        if(cities[key].experiences.includes(experiences[i])) {
            matches++;
        }
    }
    if(matches >= 3 || matches === experiences.length) {
        experiencesMatches[key] = cities[key]
        console.log('match')
    }
}

export const MakeRecommendation = ({weather, season, cost, coastal, experiences}) => {
    const seasonMap = {
        Spring: 0,
        Summer: 1,
        Autumn: 2,
        Winter: 3
    }
    
    Object.keys(cities).forEach(key => {
        let seasonIdx = seasonMap[season]
        let cityWeather = cities[key].weather[seasonIdx] // temperature of city in given season
        applyWeatherFilter(key, weather, cityWeather)
        applyCostFilter(key, cost)
        applyCoastalFilter(key, coastal)
        applyExperiencesFilter(key, experiences)
    });
    console.log(purposeMatches)
}
//'culture', 'culinary', 'nightlife', 'shopping', 'nature', 'entertainment'
MakeRecommendation({weather: 'Mild', season: 'Summer', cost: 20, coastal: true, experiences: ['culturalSites', 'culinary', 'nightlife']})


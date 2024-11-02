const cities = {
    Tokyo: {
        weather: [15, 25, 19, 5], // [spring, summer, autumn, winter]
        coastal: true,
        cost: 'High',
        purpose: ['Culture', 'Business', 'Tourism'],
        experiences: {
            culturalSites: true,
            culinary: true,
            nightlife: true
        }
    },
    London: {
        weather: [10, 19, 12, 5],
        coastal: false,
        cost: 'High',
        purpose: ['Tourism', 'Business'],
        experiences: {
            culturalSites: true,
            shopping: true,
            nightlife: true
        }
    },
    Paris: {
        weather: [12, 22, 14, 5],
        coastal: false,
        cost: 'High',
        purpose: ['Tourism', 'Culture'],
        experiences: {
            culturalSites: true,
            culinary: true,
            shopping: true
        }
    },
    Rome: {
        weather: [15, 27, 18, 8],
        coastal: false,
        cost: 'Medium',
        purpose: ['Tourism', 'Business', 'Culture', 'History'],
        experiences: {
            culturalSites: true,
            culinary: true,
            nature: true
        }
    },
    Bangkok: {
        weather: [30, 32, 30, 26],
        coastal: false,
        cost: 'Low',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            culinary: true,
            nightlife: true,
            culturalSites: true
        }
    },
    Singapore: {
        weather: [27, 28, 27, 26],
        coastal: true,
        cost: 'High',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            culinary: true,
            shopping: true,
            entertainment: true
        }
    },
    HongKong: {
        weather: [21, 28, 24, 16],
        coastal: true,
        cost: 'High',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            culinary: true,
            nightlife: true,
            shopping: true
        }
    },
    Dubai: {
        weather: [27, 36, 31, 21],
        coastal: true,
        cost: 'High',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            shopping: true,
            entertainment: true,
            culinary: true
        }
    },
    Barcelona: {
        weather: [17, 25, 19, 11],
        coastal: true,
        cost: 'Medium',
        purpose: ['Tourism', 'Culture'],
        experiences: {
            culturalSites: true,
            culinary: true,
            nightlife: true
        }
    },
    NewYork: {
        weather: [12, 24, 15, 3],
        coastal: true,
        cost: 'High',
        purpose: ['Tourism', 'Business'],
        experiences: {
            entertainment: true,
            nightlife: true,
            culturalSites: true
        }
    },
    Amsterdam: {
        weather: [10, 17, 12, 4],
        coastal: false,
        cost: 'Medium',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            culturalSites: true,
            nightlife: true,
            nature: true
        }
    },
    Seoul: {
        weather: [15, 27, 18, 3],
        coastal: false,
        cost: 'Medium',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            culturalSites: true,
            nightlife: true,
            culinary: true
        }
    },
    SanFrancisco: {
        weather: [14, 17, 16, 11],
        coastal: true,
        cost: 'High',
        purpose: ['Tourism', 'Business'],
        experiences: {
            nature: true,
            culturalSites: true,
            culinary: true
        }
    },
    LosAngeles: {
        weather: [18, 24, 22, 14],
        coastal: true,
        cost: 'High',
        purpose: ['Tourism', 'Business', 'Culture'],
        experiences: {
            entertainment: true,
            nightlife: true,
            culinary: true
        }
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

const applyPurposeFilter = (key, purpose) => {
    console.log(typeof(cities.purpose))
    if(cities[key].purpose.includes(purpose)) {
        purposeMatches[key] = cities[key]
    }
}

const applyCoastalFilter = (key, coastal) => {
    if(cities.coastal === coastal) {
        coastalMatches[key] = cities[key]
    }
}

export const MakeRecommendation = ({weather, season, cost, purpose, coastal, experiences}) => {
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
        applyPurposeFilter(key, purpose)
        applyCoastalFilter(key, coastal)

    });
    console.log(purposeMatches)
}

MakeRecommendation({weather: 'Mild', season: 'Summer', cost: 20, purpose: 'Business', coastal: true, experiences: ['']})


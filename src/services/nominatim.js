import FETCH_OPTS from './fetch-opts'

// Example:
// https://nominatim.openstreetmap.org/search?format=json&postalcode=10012
// https://nominatim.openstreetmap.org/reverse?format=json&lat=40.765457&lon=-73.98476269999999

const BASE_URL = 'https://nominatim.openstreetmap.org'
const USA_KEY = 'United States of America'

const buildSearchUrl = zipCode => `${BASE_URL}/search?format=json&postalcode=${zipCode}`
const buildReverseUrl = (lat, lon) => `${BASE_URL}/reverse?format=json&lat=${lat}&lon=${lon}`

export const fetchLocationByZipCode = async (zipCode) => {
    
    const result = {
        data: null,
        error: false
    }
    
    let res = null
    const url = buildSearchUrl(zipCode)
    
    try {
        
        res = await fetch(url, FETCH_OPTS)
        
        if (res.status !== 200)
            throw new Error('Server responded with a non-200 status')
        
        result.data = await res.json()
        
        // @todo Filter only USA for now
        result.data = result.data.filter(it => it.display_name.includes(USA_KEY))
        
    }
    catch (e) {
        
        console.error('Failed to fetch demographics ' + JSON.stringify(res), e)
        result.error = e
        
    }
    
    return result
    
}

export const fetchLocationByLatLon = async (lat, lon) => {
    
    const result = {
        data: null,
        error: false
    }
    
    let res = null
    const url = buildReverseUrl(lat, lon)
    
    try {
        
        res = await fetch(url, FETCH_OPTS)
        
        if (res.status !== 200)
            throw new Error('Server responded with a non-200 status')
        
        const data = await res.json()
        
        const { city, state } = data.address
        
        result.data = { city, state }
        
    }
    catch (e) {
        
        console.error('Failed to fetch demographics ' + JSON.stringify(res), e)
        result.error = e
        
    }
    
    return result
    
}

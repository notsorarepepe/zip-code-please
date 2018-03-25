import fetchJsonp from 'fetch-jsonp'
import FETCH_OPTS from './fetch-opts'

/*
Example:
http://www.justicemap-api.org/api.php?fLat=12.3456789&fLon=-12.3456789&sGeo=tract&fRadius=5
*/

const BASE_URL = 'http://www.justicemap-api.org/api.php'

// const buildUrl = (lat, lon) => `${BASE_URL}?fLat=${lat}&fLon=${lon}&sGeo=tract&fRadius=5`
const buildUrl = (lat, lon) => `/api.php?fLat=${lat}&fLon=${lon}&sGeo=tract&fRadius=5`

export const fetchDemographics = async (lat, lon) => {
    
    const result = {
        data: null,
        error: false
    }
    
    // FETCH_OPTS.mode = 'no-cors'
    
    let res = null
    // const url = buildUrl(lat, lon)
    const url = encodeURIComponent(buildUrl(lat, lon))
    
    try {
        
        // const res = await fetch(url, FETCH_OPTS)
        // const res = await fetch(`https://zipcodeplease.rf.gd/?url=${url}`, FETCH_OPTS)
        
        const jmHost = encodeURIComponent('http://www.justicemap-api.org')
        const jmPath = encodeURIComponent(buildUrl(lat, lon))
        
        const res = await fetch(
            `https://proxy-havwftoatn.now.sh/` +
            `?host=${jmHost}&path=${jmPath}`, FETCH_OPTS)
        
        if (res.status < 200 || res.status >= 300) {
            console.error('response', res.status, JSON.stringify(res, null, 4))
            throw new Error(`(Status: ${res.status}) Server responded with a non-200 status`)
        }
        
        console.log('OK response!', JSON.stringify(res, null, 4))
        
        result.data = await res.json()
        
        console.log('OK data!', JSON.stringify(result.data))
        
        /*const res = await fetchJsonp(
            `https://zipcodeplease.rf.gd/?jsonp=true&url=${url}`,
            {
                jsonpCallback: 'cb',
                jsonpCallbackFunction: 'cb'
            }
        )
        result.data = await res.json()*/
        
    }
    catch (e) {
        
        console.error('Failed to fetch demographics', e)
        result.error = e
        
    }
    
    return result
    
}

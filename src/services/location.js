
export const hasLocation = () => ('geolocation' in navigator)

export const getLocation = () => new Promise((resolve, reject) => {
    
    const opts = {
        enableHighAccuracy: false,
        maximumAge        : 30 * 1000,
        timeout           : 10 * 1000
    }
    
    const success = position => {
        const { latitude, longitude } = position.coords
        resolve({ lat: latitude, lon: longitude })
    }
    
    const error = e => {
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
        console.error('locate failed', e)
        reject(e)
    }
    
    navigator.geolocation.getCurrentPosition(success, error, opts)
    
})

export const getLocationPermission = () => new Promise((resolve, reject) => {
    
    if (!navigator.permissions || !navigator.permissions.query)
        return resolve()
    
    try {
        
        navigator.permissions.query({ name: 'geolocation' })
            .then(permissionStatus => {
                
                console.log('geolocation permission state is ', permissionStatus.state)
                
                permissionStatus.onchange = function() {
                    console.log('geolocation permission state has changed to ', this.state)
                }
                
                resolve()
                
            })
        
    }
    catch (e) {
        
        reject(e)
        
    }
    
})

import { h, Component } from 'preact'
import { route } from 'preact-router'
import { hasLocation, getLocationPermission, getLocation } from '../../services/location'
import { fetchLocationByZipCode } from '../../services/nominatim'
import ApproveButton from '../../components/approve-button'

export default class Home extends Component {
	
    state = {
        zipCode: '',
        error: null
    }
    
    re = /^[0-9\b]+$/
    
    onLocateMe = async () => {
        
        try {
            const perm = await getLocationPermission()
            console.log('permissions result', perm)
        }
        catch (e) {
            console.error('permissions result', e)
        }
        
        try {
            
            const loc = await getLocation()
            const { lat, lon } = loc
            
            if (lat && lon)
                route(`/demographics/${lat}/${lon}`)
            
        }
        catch (e) {
            
            // @todo
            console.error(e)
            this.setState({
                ...this.state,
                error: 'Can\'t seem to locate you. ' +
                    'Either location isn\'t supported on your device, ' +
                    'or you may have denied permission.'
            })
            
        }
        
    }
    
    onZipCodeKeyDown = e => {
        
        const isBackspace =
            e.key === 'Backspace' ||
            e.code === 'Backspace' ||
            e.keyCode === 8
        
        const isValid =
            isBackspace || (
                this.re.test(e.key) &&
                this.state.zipCode.length < 5
            )
        
        if (!isValid)
            e.preventDefault()
        
    }
    
    onZipCodeChange = e => {
        
        const isValid =
            this.re.test(e.target.value) &&
            e.target.value.length <= 5
        
        if (e.target.value === '' || isValid)
            this.setState({ zipCode: e.target.value })
        
    }
    
    queryZipCode = async () => {
        
        const { zipCode } = this.state
        
        if (!zipCode || !this.re.test(zipCode))
            return alert('Enter a zip code first!')
        
        const res = await fetchLocationByZipCode(zipCode)
        const { data, error } = res
        
        if (error || !data.length)
            return alert('@todo Handle error\n' + JSON.stringify({ data, error }, null, 4))
        
        const { lat, lon } = data[0]
        
        route(`/demographics/${lat}/${lon}`)
        
    }
    
    render(props, state) {
		
        return (
			<div class="home center-h text-center h-full">
				
                <div class="row">
                    <div class="col">
                        <header>
                            <h1>Zip Code, Please!</h1>
                        </header>
                    </div>
                </div>
				
                <div class="row mb-4">
                    <div class="col">
                        <input
                            class="input-materialish text-center mt-5"
                            style={{ maxWidth: '12rem' }}
                            type="text"
                            pattern="[0-9]{5}"
                            value={state.zipCode}
                            placeholder="12345"
                            max={99999}
                            onKeyDown={this.onZipCodeKeyDown}
                            onChange={this.onZipCodeChange} />
                    </div>
                </div>
                
                { state.error && hasLocation() && (
                    <small>{ state.error }</small>
                ) }
                
                { !state.error && hasLocation() && (
                    <div class="row mb-4">
                        <div class="col">
                            <button onClick={this.onLocateMe}>LOCATE ME</button>
                        </div>
                    </div>
                ) }
                
                <div class="row mt-7">
                    <div class="col">
                        <ApproveButton
                            size={120}
                            graphicSize={100}
                            text="CHECK MY PRIVILEGE"
                            textSize="0.9rem"
                            textColor="#519001"
                            onClick={this.queryZipCode}
                            />
                    </div>
                </div>
                
                <small class="homescreen-tip">
                    Tap menu &gt; &quot;Add to Home screen&quot; on mobile.
                </small>
                
			</div>
		)
        
	}
    
}

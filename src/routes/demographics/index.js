import { h, Component } from 'preact'
import { route } from 'preact-router'
import { fetchLocationByLatLon } from '../../services/nominatim'
import { fetchDemographics } from '../../services/justicemap'

export default class Demographics extends Component {
    
    state = {
        loading: false,
        location: null,
        demographics: {},
        error: null
    }
    
    colors = {
        white: '#f9f1e9',
        asian: '#ffdebb',
        hispanic: '#b08558',
        indian: '#8b6035',
        island: '#704920',
        black: '#0b0702',
        multi: '#efbbff'
    }
    
    spinnerStyle = {
        width: '56px',
        height: '56px'
    }
    
    updateState = vals => new Promise(resolve => {
        this.setState({ ...this.state, ...vals }, resolve)
    })
    
    getLocation = async () => {
        
        const { lat, lon } = this.props
        
        if (lat === null || lon === null) return
        
        try {
            const res = await fetchLocationByLatLon(lat, lon)
            const { city, state } = res.data
            const location = `${city}, ${state}`
            console.log('demo set loc to', location)
            this.setState({ ...this.state, location: location.toUpperCase() })
        }
        catch (e) {
            this.setState({ ...this.state, location: null })
        }
        
    }
    
    getDemographics = async () => {
        
        const res = await fetchDemographics(this.props.lat, this.props.lon)
        const { data, error } = res
        
        if (error) {
            // @todo
            console.error('Failed to fetch demographics', JSON.stringify(error))
            return alert('Error fetching demographics ' +
                JSON.stringify(res, null, 4))
            this.setState({ ...this.state, error })
            return
        }
        
        this.setState({ ...this.state, loading: false, demographics: data })
        
    }
    
    fetchAllData = async () => {
        
        await this.updateState({ loading: true })
        
        await this.getLocation()
        await this.getDemographics()
        
        this.updateState({ loading: false })
        
    }
    
    renderEmpty = () => ({
        title: 'Do You Even',
        subtitle: 'WANT SEARCH RESULTS?',
        content: (
            <div>
                <div key="demo-empty-info" class="row mt-6 mb-4">
                    <div class="col">
                        ...because you need to enter a zip code
                        on the first screen to get search results.
                    </div>
                </div>,
                <div key="demo-empty-action" class="row mt-7 mb-4">
                    <div class="col">
                        <button onClick={() => { route('/', true) }}>
                            &larr; GO BACK
                        </button>
                    </div>
                </div>
            </div>
        )
    })
    
    renderLoading = () => ({
        title: 'Working On It!',
        subtitle: 'FETCHING YOUR PRIVILEGE',
        content: (
            <div class="row mt-6">
                <div class="col">
                    <div class="spinner" style={this.spinnerStyle} />
                </div>
            </div>
        )
    })
    
    getBarStyle = key => {
        return (!this.state.demographics[key])
            ? {} : { width: `${this.state.demographics[key]}%` }
    }
    
    renderDemo = key => (
        <li>
            <div class="bar">
                <div class={`bar-bg bg-${key}`} style={this.getBarStyle(key)} />
                <div class="label">
                    <b>{ key.toUpperCase() }</b> { this.state.demographics[key] }%
                </div>
            </div>
        </li>
    )
    
    beckyIsShocked = () =>
        this.state.demographics &&
        this.state.demographics.white &&
        parseInt(this.state.demographics.white, 10) > 50
    
    renderError = () => ({
        title: 'Demographics',
        subtitle: this.state.location || null,
        content: (
            <div class="row mt-6">
                <div class="col">
                    <h3>=/</h3>
                    <p>Something broke, sorry!</p>
                    <div>
                        <pre>
                            <code>
                                {JSON.stringify(this.state.error, null, 4)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        )
    })
    
    renderContent = () => ({
        title: 'Demographics',
        subtitle: this.state.location || null,
        content: (
            <div>
                <div class="row mt-4">
                    <div class="col">
                        <ul class="demographics">
                            { this.renderDemo('white') }
                            { this.renderDemo('black') }
                            { this.renderDemo('hispanic') }
                            { this.renderDemo('island') }
                            { this.renderDemo('indian') }
                            { this.renderDemo('asian') }
                            { this.renderDemo('multi') }
                        </ul>
                    </div>
                </div>
                { this.beckyIsShocked() && (
                    <div class="row mt-5">
                        <div class="col">
                            <p class="becky">
                                OH MY GOD BECKY LOOK AT THAT
                                &nbsp;<i>privilege!</i>
                            </p>
                        </div>
                    </div>
                ) }
            </div>
        )
    })
    
    componentDidMount() {
        
        const fakeLocalData = true
        
        if (this.props.lat === null || this.props.lon === null) {
            
            this.getLocation()
            this.setState({
                ...this.state,
                error: null,
                demographics: null
            })
            
        }
        else if (fakeLocalData && window.location.href.includes('localhost')) {
            
            this.getLocation()
            this.setState({
                ...this.state,
                error: null,
                demographics: {
                    "asian": "12.6",
                    "black": "9.1",
                    "hispanic": "25.5",
                    "indian": "0.5",
                    "island": "0",
                    "multi": "3.6",
                    "white": "52.1",
                    "pop": "1707916",
                    "income": "86004",
                    "error": "",
                    "density": "",
                    "income_change": "",
                    "income_block": "",
                    "sClient": "",
                    "iExit": 0
                }
            })
            
        }
        else {
            
            this.setState({ ...this.state, error: null })
            this.fetchAllData()
            
        }
        
    }
    
    render(props, state) {
        
        const data = state.error
            ? this.renderError()
            : state.loading
                ? this.renderLoading()
                : state.demographics
                    ? this.renderContent()
                    : this.renderEmpty()
        
        const { title, subtitle, content } = data
        
        return (
            <div class="demographics center-h text-center">
                
                <div class="row">
                    <div class="col">
                        <header>
                            <h1>{ title }</h1>
                        </header>
                        { subtitle && <p>{ subtitle }</p> }
                    </div>
                </div>
                
                { content }
                
            </div>
        )
    }
}

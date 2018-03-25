import { h, Component } from 'preact'
import { Router } from 'preact-router'
import createHashHistory from 'history/createHashHistory'

import Navbar from '../components/navbar'
import Home from '../routes/home'
import Demographics from '../routes/demographics'

if (module.hot)
	require('preact/debug')

export default class App extends Component {
	
    state = {
        showBack: false
    }
    
    getHistoryProps = () => {
        const val = {}
        try {
            if (process.env.GH_PAGES)
                val.history = createHashHistory()
        } catch (e) {}
        return val
    }
    
    /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = async (e) => {
        //console.log('ROUTE', e.url, ', matches?', (e.url === '/' ? 'yes' : 'no'))
        this.setState({ showBack: (e.url !== '/') })
	}
    
	render(props, state) {
        
        const historyProps = this.getHistoryProps()
        const { handleRoute } = this
        
		return (
            
            <div id="app">
                <Navbar showBack={state.showBack} />
                <div id="page">
    				<Router {...historyProps} onChange={handleRoute}>
    					<Home path="/" />
                        <Demographics path="/demographics/:lat?/:lon?" />
    				</Router>
                </div>
			</div>
            
		)
        
	}
    
}

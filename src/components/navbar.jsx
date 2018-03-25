import { h, Component } from 'preact'
import { route } from 'preact-router'
import imageBackArrow from '../assets/images/back-arrow.png'

export default class Navbar extends Component {
    
    handleGoBack = e => {
        e.preventDefault()
        route(`/`)
    }
    
    render(props) {
        
        return (
            
            <nav>
                
                <ul>
                    { props.showBack && (
                        <li>
                            <a class="back-arrow" href="#" onClick={this.handleGoBack}>
                                <img src={imageBackArrow} />
                            </a>
                        </li>
                    ) }
                </ul>
                
            </nav>
            
        )
        
    } 
    
}

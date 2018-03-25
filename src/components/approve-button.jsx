import { h, Component } from 'preact'

export default class ApproveButton extends Component {
    render() {
        
        const { text, graphicSize, textSize, textColor, ...props } = this.props
        
        const className = props.class || ''
        
        const graphicStyle = {
            width: graphicSize ? `${graphicSize}px` : size ? `${size - 20}px` : `128px`,
            height: graphicSize ? `${graphicSize}px` : size ? `${size - 20}px` : `128px`
        }
        
        const textStyle = {
            color: textColor ? textColor : 'black',
            fontSize: textSize ? textSize : '0.8rem'
        }
        
        delete props.class
        
        return (
            <button
                class={`btn-approve ${className}`}
                {...props}>
                
                <div class="graphic center-h" style={graphicStyle} />
                
                <div class="text" style={textStyle}>
                    { text ? text : props.children }
                </div>
                
            </button>
        )
        
    }
}

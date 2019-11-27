import React, {Component} from 'react';
import './Toaster.css';

class Toaster extends Component{
    constructor(props){
        super();
        this.state = {...props};
    }

    componentWillReceiveProps(props) {
        this.setState({...props})
    }

    closeToaster = () => {
        this.setState({isToasterActive: false})
    }

    render() {
        let { type, message, isToasterActive } = this.state;
        const isError = (type === "ERROR")
        if(isToasterActive && message)
            return (
                <div className={ "toaser " + (isError ? "toaster-error" : "toaster-success")}>
                    <span className="close-toaster" onClick={this.closeToaster}>x</span>
                    <div className="toaser-message ">
                        {message}
                    </div>
                </div>
            )
        return null;
    }
}

export default Toaster;
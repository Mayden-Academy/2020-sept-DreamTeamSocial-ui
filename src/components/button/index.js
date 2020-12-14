import React, { Component } from 'react';


export class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {name: props.name}
    }

    render() {
        return (
            <button data-id={this.props.id} onClick={this.props.click}>{this.state.name}</button>
        )
    }
}

export default Button

// work out how to put this in main page

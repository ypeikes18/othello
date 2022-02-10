import React from 'react';

export default class Square extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.turn(this.props.coordinates);
    }


    render() {
        return (<div 
        className={this.props.color}
        onClick={this.handleClick}>
        </div>)
    }
}
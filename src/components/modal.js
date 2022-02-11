import React from "react";
import WinnerMessage from './winner_message'

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: true }
    }

    render() {
        const { type } = this.props;
        const { open } = this.state;
        if (!open) return null;
      
          let component;
          switch (type) {
            case 'winner':
              component = <WinnerMessage winner={this.props.winner}/>;
              break;
            default:
              return null;
          }
          return (
            <div className="modal-background" onClick={() => this.setState({open: false})}>
              <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
              </div>
            </div>
          );
    }
    
} 

    

export default Modal
import React, {Children, Component} from 'react' ;
import ReactDOM from 'react-dom';

//const modalRoot= document.getElementById('modal') ;
const portalRoot = document.getElementById('portal') ; /* asociado al div portal de index.html */


export default class Modal extends Component {
    constructor(){
        super();
        this.el = document.createElement('div') ;
        //alert("portal")
    }
    ComponentDidMount = () => {
        portalRoot.appentChild(this.el)
    }
    ComponentWillUnmount = () => {
        portalRoot.removeChild(this.el);
    }
    render(){
        const {children}=this.props ;
         return ReactDOM.createPortal (children, this.el);
    }
  
}

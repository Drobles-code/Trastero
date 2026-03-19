import React, {Component  } from "react";
import Modal from "../Modal/Modal";

export default class ImgDetalle extends Component{

        render(){
            const { chilldren, toggle, active} = this.props ;  
            return(
                <Modal>
                    { 
                        <div   >
                            <div >
                                <button  style={style.closeBtn} onClick={toggle} >
                                    X
                                </button>
                                <div>{chilldren}</div>
                            </div>
                        </div>
                    }
                </Modal>
            )
        }
};

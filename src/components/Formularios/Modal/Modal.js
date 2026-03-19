import React, { Component } from "react"
import "../Modal/Modal.css";
import "../Portal/Portal";
import ReactDOM from 'react-dom';
import styled from "styled-components";

const modalNode = document.getElementById("modal");

const renderContent = props => {
  return ReactDOM.createPortal(
    <div className="windows">
      <div className="wrapper">
        <button className="closeBtn" onClick={props.closeModal}> X  </button>
        {props.children}
        <div onClick={props.closeModal} className='backgroud'> </div>
        <div className="form-group-combo">   
           <span className='tooltiptext'>  Selecione el tipo de Via   </span>
           <select >
               <option value="A">Avenida</option>
               <option value="B">Calle</option> 
               <option value="C">Pasaje</option>
           </select>
       </div>

      </div>
    </div>,
    modalNode
  );
};

const Modal = props => {
  return props.open === true ? renderContent(props) : null;
};

export default Modal;

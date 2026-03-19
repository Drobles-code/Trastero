import React, {Component, useState  } from "react";
//import Modal from "../Modal/Modal";
import  "../Usuario/Usuario.css";

class Usuario extends Component {
    render(){
        return (
            <div>
                <fieldset class="fldset-class">
                    <legend class="legend-class">Dirección</legend>
                        <div  className='form-group'>
                            <label>Tipo </label>                     
                            <div className="form-group-combo">   
           
                                <span className='tooltiptext'>  Selecione el tipo de Via   </span>
                                <select >
                                    <option value="A">Avenida</option>
                                    <option value="B">Calle</option> 
                                    <option value="C">Pasaje</option>
                                </select>
                            </div>
                        </div>                    

                    
                    <div className="form-group">
                         <label>Nombre</label>
                         <span className='tooltiptext'>  Introduzca Nombre de la Calle / Av. / Pasaje   </span>
                         <input type="text" className="input-css"  tol/>
                    </div>

                    
                    <div className="form-group">
                        <label>Numero</label>
                        <span className='tooltiptext'>  Introdusca Numero de la dirección   </span>
                         <input type="text" className="input-css" />
                    </div>
                    
                    <div className="form-group">
                         <label>Piso</label>
                         <input type="text" className="input-css" />
                    </div>
                    <p>
                    <div className="form-group">
                         <label>Puerta</label>
                         <input type="text" className="input-css" />
                    </div>
                    </p>                                   
                </fieldset>
            </div>
        
) }}







export default Usuario;

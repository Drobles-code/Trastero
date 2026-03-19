import React, { Component } from 'react';
import '../Buscador/Buscador.css';
  
class Buscador  extends Component {
    buscadorRef = React.createRef();

    obtenerDatos = (e) => {
        e.preventDefault();
        const  termino =  this.buscadorRef.current.value;
        this.props.datosBusqueda(termino);
      //  console.log(this.buscadorRef.current.value);
    }

    render(){
        return(    
            <form className='buscador-top'  onSubmit={this.obtenerDatos}>
                <div className='container-buscador'>
                    <input ref={this.buscadorRef}  className='search-box'  type='text' placeholder='Buscar Trastero'  />
                    <button className='search-button'>Go</button>
                </div>
            </form>
        );
    }
}
export default Buscador;
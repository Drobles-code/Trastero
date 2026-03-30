import React, { Component } from 'react';
import '../Buscador/Buscador.css';

class Buscador extends Component {
    buscadorRef = React.createRef();

    onSubmit = (e) => {
        e.preventDefault();
        const termino = this.buscadorRef.current.value;
        this.props.buscarEnBD(termino);
    }

    onChange = (e) => {
        this.props.filtradoLocal(e.target.value);
    }

    render(){
        return(
            <form className='buscador-top' onSubmit={this.onSubmit}>
                <div className='container-buscador'>
                    <input
                        ref={this.buscadorRef}
                        className='search-box'
                        type='text'
                        placeholder='Buscar Trastero'
                        onChange={this.onChange}
                    />
                    <button className='search-button'>Go</button>
                </div>
            </form>
        );
    }
}
export default Buscador;
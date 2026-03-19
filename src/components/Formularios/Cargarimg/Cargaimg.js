
import React, { Component } from 'react';
import '../Cargarimg/Cargaimg.css';
import {  Link } from 'react-router-dom' ;
import De from '../De/De';
let url="";


 class Cargaimg extends Component {
    render(){
        return(         
            <Link to={`/De/${this.props.task.Nombre}`}>
                <div className="container" 
                    align="center"         
                    id={this.props.task.id}          >
                        <article className='location-listing'>
                            <div className='backgroundTitle'>
                                <p className='titulo-tras'> 
                                    <img href={url} className='img-titulo-tras'
                                        src={ this.props.task.Ruta +'/'+ this.props.task.Imagen1 }
                                        alt={this.props.task.Imagen1} />        
                                        {this.props.task.Nombre}                                        
                                </p>
                            </div>
                            <div className='grid' >
                                <img href={url} className='item img-gif-top-left' src={ this.props.task.Ruta +'/'+ this.props.task.Imagen1 } alt={this.props.task.Nombre}/>        
                                <img href={url} className='item img-gif-top-right' src={ this.props.task.Ruta +'/'+ this.props.task.Imagen2} alt={this.props.task.Nombre} />
                                <img href={url} className='item img-gif-left-bottom' src={ this.props.task.Ruta +'/'+ this.props.task.Imagen3} alt={this.props.task.Nombre} />
                                <img href={url} className='item img-gif-right-bottom' src={ this.props.task.Ruta +'/'+ this.props.task.Imagen4} alt={this.props.task.Nombre} />              
                            </div>
                        </article>  
                </div>
            </Link>

        )
    }
}
export default Cargaimg;
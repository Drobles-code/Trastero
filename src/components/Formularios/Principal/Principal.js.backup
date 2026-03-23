import React, { Component,useState } from 'react';
import imagenjson from '../../inicial.json';
import '../Principal/Principal.css';
import Buscador from '../Buscador/Buscador';
import Cargaimg from '../Cargarimg/Cargaimg';
import Modal from '../Modal/Modal';


class Principal extends Component {
  
  state = {
    tasks : imagenjson,
    garajeName:'',
    termino :' ',
    active:false
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const url = this.state.tasks.filter(task => task.Nombre === termino) ;    
   // const url =`https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&per_page=30` ;

    if (termino==='') {
      this.setState({ tasks : imagenjson })
    }else{
      this.setState({ tasks : url })
    } 
  } // fin  consultarApi
  datosBusqueda=(termino)=> {
    this.setState({
      termino
     },()=>{this.consultarApi();
    })
  } 
  //------------------------------------------------------------
  render(){
   return (
      <div >
        <div className='head'>
          <Buscador  datosBusqueda={this.datosBusqueda}/>
        </div>    
        <div className='body'>
           {this.state.tasks.map(task => <Cargaimg task={task} />)} 
        </div>       
    
      </div>
     )
  }
}

export default Principal;


import React, { Component } from 'react';
import '../CargaImgUser/CargaImgUser.css';
import Modal from '../Modal/Modal'
let url="";

 class CargaImgUser extends Component {
    state = {
        GarajeName:'',
        active:false
    }
    toggle=(active)=>{  this.setState({active:!this.state.active});  }

    handleEvent = (event )=> {
        event.preventDefault();
        this.setState({
        event
        },()=>{
          //  alert(this.props.task.previewURL);
        })
      };

    render(){
        return(     
            <div className="container" 
                align="center"         
                id={this.props.task.id} 
                onClick={this.toggle} >
                <article className='location-listing-User'>
                  <div className='grid' >
                      <span className='tooltiptext'  >{ this.props.task.user}  </span> 
                    <img href={url} 
                        className='itemUser img-gif-User' src={ this.props.task.previewURL}/> 
                    <div className='card'>  
                      <br/>
                      <p className='card-p' >  Descripción :
                         <span className='text-resaltado'> { this.props.task.user}  </span> 
                      </p>
                      <p className='card-p' >  Precio : 
                         <span className='text-resaltado'> {'$00000.00'}  </span> 
                      </p>
                      <p className='card-p' >  Acepto cambio <br/>
                          o trueque :
                         <span className='text-resaltado'> SI </span> 
                      </p>
                    </div>       
                  </div>          
                </article>
                <Modal open={this.state.active} closeModal={this.toggle}>
                   {console.log(this.props.task.previewURL)}
                   <div className='box-img-user'>
                        <img href={url} className='item-modal'
                          src={ this.props.task.largeImageURL}/> 
                     
                   </div>
                   
                </Modal>
            </div>
   
        )
    }
}
export default CargaImgUser;
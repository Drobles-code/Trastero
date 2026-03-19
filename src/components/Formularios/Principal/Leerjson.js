import React,  {Component} from 'react';
import Cargaimg from '../Cargarimg/Cargaimg';


class Leerjson extends Component {

    render(){
        return(
            this.props.tasks.map(task => <Cargaimg task={task} />  ) 
        )
    }

}

export default Leerjson;

export default class Modal extends Component {
    render(){
      const {children, toggel, active} = this.props ;
      Return (
             <Portal>
               {active && (
                <div style={styled.wrapper }>
                    <div style={styled.wrapper }>
                    </div>   
                </div>
               )}
             </Portal>
      )
    }
    }
  
  
import React from "react";

class OtherComponent extends React.Component {
  state = {backgroundColor: 'white'}
  

  changeBackgroundToYellow = () => {

if (this.state.backgroundColor === 'white'){
  this.setState({
    backgroundColor: 'yellow'
  })

}else{
  this.setState({
    backgroundColor: 'white'
  })

}
  }
  render(){
    return (
      <div style={this.state}>
        <p>It's background will become yellow when you press the below button.</p>
        <p>This is because the component background style gets changed using ref variable.</p>
        <hr />
        <p>Like in html - document.getElementById('id')</p>
        <p>In React - componentRef</p>
      </div>
    )
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.componentRef = React.createRef();
  }

  referComponentByRef = () => {
    this.componentRef.current.changeBackgroundToYellow();
  }

  render(){
  return (
    <div>
      <OtherComponent
        ref={node => this.componentRef.current = node}
      />
      <hr />
      <p>
        <button onClick={this.referComponentByRef}>Change Color</button>
      </p>
    </div>
  )
      }
}
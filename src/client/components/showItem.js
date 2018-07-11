import React,{Component} from 'react';
import 'bulma/css/bulma.css'

class ShowItem extends Component {

    constructor(props){
      super(props)
    }

    render(){
      return(
          <p className="animateText">Hello Name: {this.props.name} Job: {this.props.job}</p>
      )
    }

}

export default ShowItem;

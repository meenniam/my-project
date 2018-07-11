import React, { Component } from 'react';
import Main from './components/main'
import NavigaionBar from './components/navigationbar';
import 'bulma/css/bulma.css'

export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return(
      <div className="example bgimg-3">

        <NavigaionBar/>
        <div>
          <Main></Main>
        </div>

      </div>
    )

  }
}

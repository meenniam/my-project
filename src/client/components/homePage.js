import React, {Component} from 'react';
import ShowItem from './showItem'
import 'bulma/css/bulma.css'
import '../app.css';

export default class HomePage extends Component{
  constructor(props) {
    super(props);
    this.state = { user : []
                 };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => {
        this.setState({user: user})
      });
  }

  render() {
    let users = this.state.user.map(user=>{
      return(
        <ShowItem key={user.name} name={user.name} job={user.job}/>
      )
    })
    //console.log(this.state.user);
    return (
          <div className="">

            <div  className="bgimg-1">
            </div>

            <section className="hero is-medium is-primary is-bold card">
              <div className="hero-body">
                <div className="container ">
                    {users}
                </div>
              </div>
            </section>

            <div  className="bgimg-2" >
            </div>

            <section className="hero is-medium is-danger is-bold card">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    Key Member
                  </h1>
                  <h2 className="subtitle">
                    please key your member
                  </h2>
                </div>
              </div>
            </section>

          </div>


    );
  }

}

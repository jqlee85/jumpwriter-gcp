import React, {Component} from 'react';
import './Nouns.css';
import firebase from "../../firebase";

class Nouns extends Component {
  
  nouns = []

  constructor(props){
    super(props);
    this.state = {
      nouns: false,
      nounsData: false,
      msg: false
    }
  }

  componentDidMount(){
    this.getNouns();
  }

  async getNouns() {
    
    try {
      
      const db = await firebase.firestore();
      const nounsRef = await db.collection('nouns')
      const snapshot = await nounsRef.get()
      const data = snapshot.docs.map(doc => doc.data());
      console.log(data)
      this.setState({
        nouns: 'loaded',
        nounsData: data
      })
      this.nouns = data;
    } catch (error) {
      console.error(error)
      this.setState({ 
        nouns: 'error',
        msg: error
      })
    }
    
  }


  render(){
    console.log(this.state.nounsData);
    return <div className="nouns">
    <h1>Nouns</h1>
    
    { !this.state.nouns == 'loading' && <p>Loading Nouns...</p> }
    { this.state.nouns == 'loaded' && this.state.nounsData.length &&
        this.state.nounsData.map( function(item){ 
          return <li>{item['word']}</li> 
        }) 
    }
    { this.state.nouns == 'error' && <p>Error</p> }

  </div>
  }
  

}

export default Nouns

import React, {Component} from 'react';
import './About.css';

class About extends Component {
  
  componentDidMount(){
    this.props = this.props.properties;
  }
  
  render(){
    return <div className="about">
      <h1>About JumpWriter</h1>
      <h3>What is Freewriting?</h3>
  			<p>Freewriting is the practice of continuous writing without worrying about typos, grammar, or any of the usual rules of writing. This exercise has long been used by writers to promote creativity, fight writer's block and explore ideas. It's not about polished content, it is about ideas flowing uninhibited from brain to paper.</p>
    </div>
  }

}

export default About

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './About.css'

const About = () => {
  
  return <div className="about">
    <h1>About JumpWriter</h1>
      <p>JumpWriter is a free web application that generates random writing prompts and encourages the practice of freewriting. Feel free to use it to help with writer's block or or just get the creative juices flowing (a gross, metaphor, I know). It's designed, built and maintained by <a href="https://jumpoff.io" target="_blank">JumpOff, LLC</a>. All writing done on the site is private by default, and will only be publicly viewable if you explicitly publish it.</p>
    <h2>What is Freewriting?</h2>
      <p>Freewriting is the practice of continuous writing without worrying about typos, grammar, or any of the usual rules of writing. This exercise has long been used by writers to promote creativity, fight writer's block and explore ideas. It's not about polished content, it is about ideas flowing uninhibited from brain to paper.</p>
      <Link to="/write/"><button>Get Writing!</button></Link>

  </div>
  
}

export default About

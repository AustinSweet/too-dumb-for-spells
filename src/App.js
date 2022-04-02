import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, React } from 'react';
import { Form } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';
import './App.css';



class App extends Component{

  constructor(props){
    super(props);
    this.state = {
    };
  }

  onChange(e){
    e.preventDefault();
    let text = e.target.value;
    text = text.replace(/\s+/g, '-').toLowerCase();

    let url = 'https://www.dnd5eapi.co/api/spells/' + text;

    fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ desc: data.desc})
      delete data.desc;
      this.setState({ spell: JSON.stringify(data)})});
  }

  render(){
    var JSONPrettyMon = require('react-json-pretty/dist/adventure_time');

    return(
    <div className='page'>
      <div className='searchbar'>
        <Form>
          <Form.Group className="m-0">
            <Form.Control 
            type="text" 
            placeholder="Enter Any Spell's Full Name..." 
            value={this.state.val}
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            onChange={e => this.onChange(e)}/>
          </Form.Group>
        </Form>
      </div>
      <div className='desc'>{this.state.desc}</div>
      <JSONPretty 
      data={this.state.spell} 
      mainStyle="{
        main: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;padding:1rem',
        error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;',
        key: 'color:#f92672;',
        string: 'color:#fd971f;',
        value: 'color:#a6e22e;',
        boolean: 'color:#ac81fe;',
      }"
      theme={JSONPrettyMon}></JSONPretty>

    </div>
    )
  }
}

export default App;

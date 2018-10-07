import React, {Component} from 'react';
import fetchAPI from '../utils/fetchAPI';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        };
    }
    componentDidMount() {
        fetchAPI({
            url: 'https://foaas.com/cool/shubham',
            method: 'GET',
            headers: {
                'Accept': 'text/plain'
            },
        })
        .then((response) => {
            this.setState({
                content: response
            })
        })

    }

    render(){
        return (
            <div>
                {this.state.content}
            </div>
        )
    }
}

export default App;
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            body: ''
        }
    }
    doName(e) {
        this.setState({ name: e.target.value })
    }
    doBody(e) {
        this.setState({ body: e.target.value })
    }
    post(e) {
        request
            .get('/api/write')
            .query({
                name: this.state.name,
                body: this.state.body
            })
            .end((err, data) => {
                if (err) return
                this.setState({ body: '' })
                /*  後に親コンポーネントにロード処理を渡される  */
                if (this.props.onPost) {
                    this.props.onPost()
                }
            })
    }
    render() {
        return (
            <div style={styles.form}>
                名前:<br />
                <input value={this.state.name} onChange={e => this.doName(e)} /><br />
                本文:<br />
                <input value={this.state.body} size='60' onChange={e => this.doBody(e)} /><br />
                <button onClick={e => this.post()}>投稿</button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
    }
    componentWillMount() {
        this.loadLogs()
    }
    loadLogs() {
        console.log('start')
        request
            .get('/api/getItems')
            .end((err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                this.setState({ items: data.body.logs })
            })
    }
    render() {
        const html = this.state.items.map(e => {
            return <li key={e._id}>{e.name} - {e.body}</li>
        })
        return (
            <div>
                <h1 style={styles.h1}>掲示板だよー！</h1>
                <Form onPost={e => this.loadLogs()} />
                <p style={styles.right}><button onClick={e => this.loadLogs()}>再読み込み</button></p>
                <ul>{html}</ul>
            </div>
        )
    }
}

const styles = {
    h1: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 24,
        padding: 12
    },
    form: {
        padding: 12,
        border: '1px solid sliver',
        backgroundColor: '#f0f0f0'
    },
    right: {
        textAlign: 'right'
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
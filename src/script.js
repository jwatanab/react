import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './component/Header'
import { css } from 'aphrodite'
import { Title } from './component/Styles'


class Hello extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '' }
    }
    doClick(e) {
        window.alert('これからマスターしていくぞ！')
        console.log('success')
    }
    componentWillMount() {
        this.setState({ title: 'きたー！' })
    }
    render() {
        console.log(this, window)
        return (
            <div>
                <Header />
                <h1 className={css(Title.h1)} onClick={e => this.doClick(e)}>{this.state.title}</h1>
                <p>{this.props.message}</p>
                <a href='more.html'>リンク</a>
            </div>
        )
    }
}

Hello.defaultProps = { message: 'ようやくできたよー！' }

Header.defaultProps = {
    ary: {
        item1: 'こんばんわ',
        item2: 'おはよごずあいます'
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)
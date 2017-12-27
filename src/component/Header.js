import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        /*  外部からの規定値はprops  */
        super(props)
        /*  内部からの動作による値変動はstate  */
        this.state = {}
    }
    render() {
        return (
            <div>
                <h1>Headerだよー！</h1>
                {
                    /*  4  */
                    (() => {
                        const list = []
                        const par = this.props.ary
                        if (par.item1) {
                            list.push(<div>{par.item1}</div>)
                        }
                        if (par.item2) {
                            list.push(<div>{par.item2}</div>)
                        }
                        return list
                    })()
                }

            </div>
        )
    }
}

module.exports = Header
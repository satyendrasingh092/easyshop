import React from 'react'

export default class Header extends React.Component {

    static defaultProps = {
        'shopName': 'MY AWESOME SHOP'
    }

    render() {
        let menu
        if (window.matchMedia("(max-width: 700px)").matches) {
            menu = <div><img style={{width: '50px'}} src="../../threelines.png"/></div>
        } else {
            menu = (<React.Fragment>
                <div style={{marginRight: '10px'}}>HOME</div>
                <div style={{marginRight: '10px'}}>ABOUT</div>
                <div style={{marginRight: '10px'}}>CONTACT</div>
                <div style={{marginRight: 'px'}}>BAG</div>
            </React.Fragment>)
        }
        return (<div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center',
            fontSize: '14px', width: '100%'}}>
            <div>{this.props.shopName}</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {menu}
            </div>
        </div>)
    }
}
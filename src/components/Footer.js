import React from 'react'

export default class Footer extends React.Component{

    static defaultProps = {
        'shopName' : 'MY AWESOME SHOP'
    }

    render(){
        return (<div style={{display:'flex',justifyContent :'space-around',fontSize:'14px',width:'100%'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{marginRight:'10px'}}>About |</div>
                <div style={{marginRight:'10px'}}>Contact |</div>
                <div style={{marginRight:'10px'}}>Privacy Policy |</div>
                <div style={{marginRight:'10px'}}>Return Policy</div>
            </div>
        </div>)
    }
}
import React from 'react'
import {Link} from 'react-router-dom'

export default class ProductView extends React.Component {

    static defaultProps = {
        imgSrc: './../dummy.jpg',
        name: 'Sample',
        sale_price: 0,
        mark_price: 0,
        sale_msg: '0%'
    }

    render() {
        let {product} = this.props
        if (!product || !product.size) {
            return (<div className="productBox" style={{
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
                fontSize: 20,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}></div>)
        }

        let productId = product.get('_id')
        let imgSrc = product.getIn(['images','0'])
        let name = product.get('name')
        let sale_price = product.get('sale_price')
        let mark_price = product.get('mark_price')
        let sale_msg = product.get('sale_msg')
        return(<div className="productBox" style={{
            borderRadius: '0.5rem',
            marginBottom: '0.5rem',
            width: '100%',
            fontSize: 20,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="item">
                <Link to={"/product/" + productId}>
                    <div>
                        <img src={imgSrc}/>
                    </div>
                </Link>
                <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="productName">
                        {name}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className="sales-price">
                            <span>&#8377;</span>
                            {Math.round(sale_price)}
                        </div>
                        <div className="mark-price">
                            <span>&#8377;</span>
                            {Math.round(mark_price)}
                        </div>
                        <div className="sales-msg">
                            {sale_msg}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

}
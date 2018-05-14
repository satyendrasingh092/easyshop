import React from 'react'
import {connect} from 'react-redux'
import ProductDetailedView from "../components/ProductDetailedView";
import {fetchProductDetail, updateProductDetails} from "../actions/AppAction";
const _URL =  "https://assignment-appstreet.herokuapp.com/api/v1/products/"

class DetailedViewContainer extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        let productId = this.props.match.params.productId
        let url = _URL + productId
        this.props.fetchProductDetail(url)
    }

    render(){
       return (<div style={{overflowY:'auto',height:'100%'}}><ProductDetailedView featureSelection = {this.featureSelection}
                                    productDetail={this.props.productDetail}/></div>)
    }

    featureSelection = (params) =>{
        this.props.updateProductDetails(params)
    }
}

function mapStateToProps(state){
    return { productDetail : state.getIn(['productDetail']) }
}

function mapDispatchToProps(dispatch){
    return {
        fetchProductDetail: (url) => dispatch(fetchProductDetail(url)),
        updateProductDetails : (param) => dispatch(updateProductDetails(param))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailedViewContainer)
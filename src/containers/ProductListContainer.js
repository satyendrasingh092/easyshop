import React from 'react'
import I from 'immutable'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import ProductListComponent from '../components/ProductListComponent'
import {fetchProductList} from "../actions/AppAction";
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "./AppContainer";

const _URL = "https://assignment-appstreet.herokuapp.com/api/v1/products?page="

class ProductListContainer extends React.Component {

    static childContextTypes = {
        list: PropTypes.instanceOf(I.List).isRequired
    };

    getChildContext() {
        console.log(this.props.productList)
        return {list: this.props.productList};
    }

    constructor(props) {
        super(props)
        this.currentPage = 1
        this.counter = 1
    }


    componentDidMount() {
        let url = _URL + this.currentPage
        this.props.fetchProductList(url)
    }

    render() {
        return (<ProductListComponent
            key={this.counter++}
            noMoreData={this.props.noMoreData}
            productList={this.props.productList}
            height={window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 80}
            loadMore={this.loadMore}/>)
    }

    loadMore = () => {
        let page = this.currentPage + 1
        this.currentPage = page
        let url = _URL + page
        this.props.fetchProductList(url)
    }
}

function mapStateToProps(state) {
    return {
        productList: state.getIn(['productList']),
        noMoreData: state.getIn(['noMoreData'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProductList: (url) => dispatch(fetchProductList(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer)
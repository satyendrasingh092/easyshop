import React from 'react'
import I from 'immutable'
import {Carousel,Thumbs} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const LIMITED_DESC = 200

export default class ProductDetailedView extends React.Component {
  state = {
    moreClicked: false
  }

    render() {

        return <div className="detailedView" style={{width:'100%'}}>
            {this.getDetailView()}
        </div>
    }

    getDetailView() {
        let {productDetail} = this.props
        if (!productDetail || !productDetail.size) {
            return null
        }
        return (
            <React.Fragment>
                <div className="detailedImg">
                    {this.getImages(productDetail)}
                </div>
                <div className="detailedTxt">
                    {this.getTextualView(productDetail)}
                </div>
            </React.Fragment>)
    }

    getImages(productDetail) {
        let images = productDetail.getIn(['primary_product', 'images'])
        return (<Carousel width="100%" showThumbs={false} dynamicHeight={true} showArrows={true} autoPlay={false}>
            {images.map(function(src){
                return <img src={src}/>
            })}
        </Carousel>)
    }

    getTextualView(productDetail) {
        let product = productDetail.getIn(['primary_product'])

        let desc = this.getDesc(product)
        let price = this.getPrice(product)
        let featureOptions = this.getFeatureOptions(productDetail)
        return (<React.Fragment>
                {desc}
                {price}
                {featureOptions}
            </React.Fragment>

        )
    }

    getDesc(product) {
        let name = product.get('name')
    let desc = product.get('desc', '')
    if (!this.state.moreClicked) {
      desc = desc.substring(0, LIMITED_DESC)
    }

        return (<div style={{paddingTop : '15px',paddingBottom : '15px', borderBottom:'1px solid lightgray'}}>
            <div style={{fontSize:'14px',fontWeight:'550',paddingBottom:'15px'}}>{name}</div>
            <div style={{fontSize:'12px',paddingBottom:'15px'}}>{desc}</div>
            {!this.state.moreClicked && <button className="moreLess" onClick={this.moreClicked}> +More </button>}
            {this.state.moreClicked && <button className="moreLess" onClick={this.moreClicked}> Less </button>}
        </div>)
    }

    getPrice(product) {
        let sale_price = product.get('sale_price')
        let mark_price = product.get('mark_price')
        let sale_msg = product.get('sale_msg')
        return (<div style={{paddingTop : '15px',paddingBottom : '15px', borderBottom:'1px solid lightgray'}}>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <div className="sales-price">
                    <span>&#8377;</span>
                    {Math.round(sale_price)}
                </div>
                <div className="mark-price">
                    <span>&#8377;</span>
                    {Math.round(mark_price)}
                </div>
            </div>
            <div className="sales-msg">
                {sale_msg}
            </div>
        </div>)
    }

    getFeatureOptions(productDetail) {
        let attributes = productDetail.get('attributes')
        if (!attributes || !attributes.size)
            return null
        let self = this

        return attributes.map(function (attribute) {
            let name = attribute.get('name')
            let attrOptions = attribute.get('attrOptions')
            let attrId = attribute.get('_id')
            let size = attrOptions.size
            let selectedOption = productDetail.getIn(['selectedOptions',attrId])
            return (<div style={{paddingTop : '15px',paddingBottom : '15px'}}>
                <div style={{fontSize:'12px',paddingBottom:'15px'}}>{`${size} ${name} available`}</div>
                <div>{attrOptions.map(function (option) {
                    let name = option.get('name')
                    let optionId = option.get('_id')
                    let className="featureButton"
                    if(selectedOption === optionId){
                        className="selectedFeatureButton "
                    }
                    return <button className={className} style={{marginRight:'10px'}} onClick={() =>
                        self.props.featureSelection(I.fromJS({'key':attrId,'val':optionId}))}>{name}</button>
                })}</div>
            </div>)
        })
    }

  moreClicked = () => {
    this.setState({ moreClicked: !this.state.moreClicked })
  }


}
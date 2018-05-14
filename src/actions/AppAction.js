import I from 'immutable'
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST"
export function setProductList(payload) {
    return {
        type : SET_PRODUCT_LIST,
        payload : payload
    }
}

export const SET_NO_MORE_DATA = "SET_NO_MORE_DATA"
export function setNoMoreData(payload) {
    return {
        type : SET_NO_MORE_DATA,
        payload : payload
    }
}

export const SET_PRODUCT_DETAIL = "SET_PRODUCT_DETAIL"
export function setProductDetail(payload) {
    return {
        type : SET_PRODUCT_DETAIL,
        payload : payload
    }
}

function convertSelectedIdsIntoKeyValuePair(productDetail){
    let selected_option_ids = productDetail.get('selected_option_ids')
    let options = productDetail.get('options')
    let selectedOptions = I.Map()
    selected_option_ids.map(function (selected_option_id) {
        for(let val of options){
            if(val.get('_id') === selected_option_id){
                selectedOptions = selectedOptions.set(val.get('attrib_id'),selected_option_id)
                break
            }
        }
    })
    productDetail = productDetail.set('selectedOptions',selectedOptions)
    return productDetail
}

function addOptionsToAttribute(attributes,options) {
    if (!attributes || !attributes.size)
        return I.List()
    attributes = attributes.map(function (attribute) {
        let attrib_id = attribute.get('_id')
        let attrOptions = I.List()
        options.map(function (option) {
            if (option.get('attrib_id') === attrib_id) {
                attrOptions = attrOptions.push(option)
            }
        })
        attribute = attribute.set('attrOptions', attrOptions)
        return attribute
    })
    return attributes
}

export const fetchProductDetail = (url) => (dispatch) =>{
    fetch(url).then(function (res) {
        if (res.status !== 200)
            return
        return res.json()
    }).then((item) => {
        if(item){
            let _iITem =I.fromJS(item)
            _iITem = convertSelectedIdsIntoKeyValuePair(_iITem)
            let options = _iITem.get('options')
            let attributes = _iITem.get('attributes')
            _iITem =_iITem.set('attributes',addOptionsToAttribute(attributes,options))
            dispatch(setProductDetail(_iITem))
        }

    }).catch(()=>{
        dispatch(setProductDetail({}))
    })
}

export const fetchProductList = (url) => (dispatch,getState) =>{
    fetch(url).then(function (res) {
        if (res.status !== 200)
            return
        return res.json()
    }).then((items) => {
        let productList = getState().get('productList')
        if(items.products && items.products.length){
            productList = productList.concat(I.fromJS(items.products))
            dispatch(setProductList(productList))
        }else{
            dispatch(setNoMoreData(true))
        }

    }).catch((err)=>{
       console.log(err)
    })
}

export const updateProductDetails = (param) => (dispatch,getState) => {
        let productDetail = getState().get('productDetail')
        productDetail = productDetail.setIn(['selectedOptions',param.get('key') ],param.get('val'))
        let selectedOptions =  productDetail.get('selectedOptions')
        let product_variations = productDetail.get('product_variations')
        let selectedVariation
        for(let variations of product_variations){
            let sign = variations.get('sign')
            let notMatch = 0
            for(let val of sign){
                if(!selectedOptions.includes(val)){
                    notMatch = 1
                }
            }
            if(notMatch === 0){
                selectedVariation = variations
                break
            }
        }
        if(selectedVariation){
            let new_mark_price = selectedVariation.get('mark_price')
            let new_name = selectedVariation.get('name')
            let new_sale_price = selectedVariation.get('sale_price')
            let new_sale_msg = selectedVariation.get('sale_msg')
            let new_images = selectedVariation.get('images')
            productDetail = productDetail.setIn(['primary_product','mark_price'],new_mark_price)
            productDetail = productDetail.setIn(['primary_product','name'],new_name)
            productDetail = productDetail.setIn(['primary_product','sale_price'],new_sale_price)
            productDetail = productDetail.setIn(['primary_product','sale_msg'],new_sale_msg)
            productDetail = productDetail.setIn(['primary_product','images'],new_images)
        }
    dispatch(setProductDetail(productDetail))
}
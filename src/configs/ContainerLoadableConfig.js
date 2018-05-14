import Loadable from 'react-loadable';
const Loading = () => <div style={{width:'100%',display:'flex',justifyContent:'center'}}>Loading...</div>

export const ProductListContainer = Loadable({
    loader: () => import(/* webpackChunkName: 'productList' */'../containers/ProductListContainer'),
    loading: Loading,
})


export const DetailedViewContainer = Loadable({
    loader: () => import(/* webpackChunkName: 'detailView' */'../containers/DetailedViewContainer'),
    loading: Loading
})
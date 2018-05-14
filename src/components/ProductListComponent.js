import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import {CellMeasurer, CellMeasurerCache} from 'react-virtualized/dist/es/CellMeasurer';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';
import createCellPositioner from 'react-virtualized/dist/es/Masonry/createCellPositioner';
import Masonry from 'react-virtualized/dist/es/Masonry';
import ProductView from "./ProductView";


export default class ProductListComponent extends React.PureComponent {

    static contextTypes = {
        list: PropTypes.instanceOf(Immutable.List).isRequired
    };

    constructor(props, context) {
        super(props, context);

        this._columnCount = 0;

        this._cache = new CellMeasurerCache({
            defaultHeight: 250,
            defaultWidth: 250,
            fixedWidth: true,
        });

        this._columnHeights = {};

        this.state = {
            columnWidth: 250,
            height: '100%',
            gutterSize: 10,
            windowScrollerEnabled: false,
        };


        this._cellRenderer = this._cellRenderer.bind(this);
        this._onResize = this._onResize.bind(this);
        this._renderAutoSizer = this._renderAutoSizer.bind(this);
        this._renderMasonry = this._renderMasonry.bind(this);
        this._setMasonryRef = this._setMasonryRef.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            height: nextProps.height,
        }
    }

    render() {
        const {
            height,
            windowScrollerEnabled,
        } = this.state;

        let child;

        if (windowScrollerEnabled) {
            child = (
                <WindowScroller>
                    {this._renderAutoSizer}
                </WindowScroller>
            );
        } else {
            child = this._renderAutoSizer({height});
        }

        if (this.props.noMoreData) {
            return child
        }
        return (<React.Fragment>{child}
            <div id="loadMore" style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={this.props.loadMore}>Load More</button>
            </div>
        </React.Fragment>)
    }

    _calculateColumnCount() {
        const {columnWidth, gutterSize} = this.state;

        this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
    }

    _cellRenderer = ({index, key, parent, style}) => {
        const list = this.props.productList;
        if (!list || !list.size)
            return null
        const datum = list.get(index % list.size);
        const {columnWidth} = this.state;
        return (
            <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
                <div
                    style={{
                        ...style,
                        width: columnWidth,
                        padding: '10px',
                        outline: 'none'
                    }}>
                    <ProductView product={datum}/>
                </div>
            </CellMeasurer>
        );
    }

    _initCellPositioner() {
        if (typeof this._cellPositioner === 'undefined') {
            const {columnWidth, gutterSize} = this.state;

            this._cellPositioner = createCellPositioner({
                cellMeasurerCache: this._cache,
                columnCount: this._columnCount,
                columnWidth,
                spacer: gutterSize,
            });
        }
    }

    _onResize({width}) {
        this._width = width;
        this._columnHeights = {};
        this._calculateColumnCount();
        this._resetCellPositioner();
        this._masonry.recomputeCellPositions();
    }

    _renderAutoSizer({height, scrollTop}) {
        this._height = height;
        this._scrollTop = scrollTop;
        return (
            <AutoSizer
                disableHeight
                height={height}
                onResize={this._onResize}
                scrollTop={this._scrollTop}>
                {this._renderMasonry}
            </AutoSizer>
        );
    }

    _renderMasonry = ({width}) => {
        this._width = width;
        this._calculateColumnCount();
        this._initCellPositioner();
        const {height, windowScrollerEnabled} = this.state;

        return (
            <Masonry
                autoHeight={windowScrollerEnabled}
                cellCount={this.props.productList.size}
                cellMeasurerCache={this._cache}
                cellPositioner={this._cellPositioner}
                cellRenderer={this._cellRenderer}
                height={windowScrollerEnabled ? this._height : height}
                ref={this._setMasonryRef}
                scrollTop={this._scrollTop}
                width={width}
            />
        );
    }


    _resetCellPositioner() {
        const {columnWidth, gutterSize} = this.state;
        this._cellPositioner.reset({
            columnCount: this._columnCount,
            columnWidth,
            spacer: gutterSize,
        });
    }

    _setMasonryRef(ref) {
        this._masonry = ref;
    }
}
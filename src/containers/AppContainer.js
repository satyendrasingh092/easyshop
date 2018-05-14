import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {containerRouter} from "../configs/RouteConf";
export const HEADER_HEIGHT = 60
export const FOOTER_HEIGHT = 60

class App extends React.Component {

    componentDidMount(){
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-50px";
            }
            prevScrollpos = currentScrollPos;
        }
    }

    render() {
        let mainDivHeight = this.calculateMainDivHeight()
        return (
            <div>
                <div id="navbar" style={{height:HEADER_HEIGHT}}>
                    <Header/>
                </div>
                <main id="mainDiv" style={{
                    position: 'relative',
                    top: HEADER_HEIGHT + 10,
                    height: mainDivHeight,
                    overflow:'hidden',
                    alignItems:'center'}}>
                    <div style={{height:'100%'}}>
                    {containerRouter()}
                    </div>
                </main>
                <footer id="footer" style={{height: FOOTER_HEIGHT}}>
                    <Footer/>
                </footer>
            </div>
        );
    }

    calculateMainDivHeight(){
        return window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 50
    }
}

export default App;
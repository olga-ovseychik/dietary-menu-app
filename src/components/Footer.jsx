import { Component } from "react";
import ai_icon from '../assets/icons/ai.png';
import icons8 from '../assets/icons/icons8.png';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-info">
                    <div className="icon">
                        <img src={ai_icon} alt="AI Generated" className="footer-img"/><span className="footer-info-span">powered</span>
                    </div> 
                    <div className="icon">
                        <span className="footer-info-span footer-info-span-link">Icons by</span><a className="footer-info-span footer-info-span-link" href="https://icons8.com"><img src={icons8} alt="AI Generated" className="footer-img"/></a>
                    </div> 
                    
                </div>

            </footer>   
        )
    }
}

export default Footer;
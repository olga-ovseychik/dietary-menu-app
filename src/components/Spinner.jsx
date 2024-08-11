
import { Component } from "react";

class Spinner extends Component {
    render() {

        return (
            <div className="spinner-overlay" id="spinner">
                <div className="spinner">
                    <div className="spinner-dot spinner-dot--1"></div>
                    <div className="spinner-dot spinner-dot--2"></div>
                    <div className="spinner-dot spinner-dot--3"></div>
                </div>
            </div>
        )
    }
}

export default Spinner;
import { Component } from "react";

class Promo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleOnClick: this.props.handleOnClick,
        }
    }

    render() {
        return (
            <section className='promo' id="promo">
                <div className="promo-content">
                    <div className='promo-title'>Get your personal dietary menu</div>
                    <div className="promo-text">
                        Tailored meal plan based on individual dietary needs, preferences, and health goals
                    </div>
                    <button onClick={this.state.handleOnClick} className="btn btn--promo" id="promo-btn">Go to survey</button>
                </div>
            </section>
        )
    }
}

export default Promo;
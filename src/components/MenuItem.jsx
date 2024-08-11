import { Component } from "react";

class MenuItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-item">
                <h3 className="menu-item__title">{this.props.day}</h3>
                <div>
                    <div className="menu-item__content">
                        <div className="menu-item__type">Breakfast</div>
                        <div>{this.props.breakfast}</div>
                    </div>
                    <div className="menu-item__content">
                        <div className="menu-item__type">Lunch</div>
                        <div>{this.props.lunch}</div>
                    </div>
                    <div className="menu-item__content">
                        <div className="menu-item__type">Dinner</div>
                        <div>{this.props.dinner}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuItem;
import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

class SurveyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qText: this.props.qText,
            qAnswers: this.props.qAnswers,
            next: this.props.next,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, answ, qst) {
        this.props.setUserAnswer(qst, answ, this.props.id );

        this.state.qAnswers.forEach(q => {
            let btn = document.getElementById(`${q.id}`);
            if (q.id == event.target.id) {
                btn?.classList.add('btn--active')
            } else {
                btn?.classList.remove('btn--active')
            }
        });
    }
    
    render() {
        return (
            <div className="survey-item">
                <div className="survey-item__question">
                    {this.state.qText}
                </div>
                <div className="survey-item__answers">
                    {this.state.qAnswers.map((answ) => {
                        return (
                            <button key={answ.id} id={answ.id} className="btn" onClick={(event) => this.handleClick(event, answ, this.state.qText)}>{answ.answer}</button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default SurveyItem;
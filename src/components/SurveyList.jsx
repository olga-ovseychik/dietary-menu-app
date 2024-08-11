import { Component } from "react";
import SurveyItem from "./SurveyItem";

class Surveylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.data,
        };
        this.setUserAnswer = this.setUserAnswer.bind(this);
    }

    setUserAnswer(qst, userAnsw, id) {
        this.props.setUserAnswers(qst, userAnsw, id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ questions: this.props.data });
        }
    }
    
    render() {
        return (
            <section className='survey hide' id="survey">
                <div className="survey-list">
                    {this.state.questions ? this.state.questions.map((q) => {
                            return (
                                <SurveyItem 
                                    key={q.id} 
                                    id={q.id}
                                    next={this.next} 
                                    qText={q.question} 
                                    qAnswers={q.answers}
                                    setUserAnswer={this.setUserAnswer}/> 
                            )
                        })
                    : null
                    } 
                </div>
                <button id="submit-btn" onClick={this.props.submitHandler} className="btn btn--submit hide">Send my answers</button>
            </section>
        )
    }
}

export default Surveylist;
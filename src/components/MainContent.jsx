import { Component } from 'react';
import Surveylist from './SurveyList';
import Spinner from './Spinner';
import Promo from './Promo';
import Menu from './Menu';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: [],
            userInfo: {},
            status: 'idle',
            userAnswers: [],
            message: "Give me a JSON for an object 'questions' that contains exactly 15 questions (including questions about gender, age, food allergies (include main allergies), restrictions, goals), (not including question: 'How many meals do you eat per day?'), with 'id' field, 'question' field and 'answers' filed that contsins 3 answers (with 'id' filed for each answer field, id is a random number starting from 101) for each question for make dietary menu",
        };
        this.apiRequest = this.apiRequest.bind(this);
        this.setUserAnswers = this.setUserAnswers.bind(this);
        this.updateUserAnawers = this.updateUserAnawers.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.message !== this.state.message) {
            const btn = document.querySelector('#submit-btn');
            btn.classList.remove('show');
            btn.classList.add('hide');
            this.apiRequest();
        } 
        if (prevState.apiResponse !== this.state.apiResponse) {
            const { menu } = this.state.apiResponse;
            if (menu) {
                const menuSection = document.querySelector("#menu");
                menuSection?.scrollIntoView({ block: 'start', behavior: 'smooth' });
            } else {
                const surveySection = document.querySelector("#survey");
                surveySection.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
      }
    
    apiRequest = async () => {
        this.setState({ status: 'pending' });
        const surveySection = document.querySelector("#survey");
        surveySection.scrollIntoView({ block: 'start', behavior: 'smooth' });

            await fetch("https://api.openai.com/v1/chat/completions",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                  },
                  body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { 
                            "role": "user", 
                            "content": this.state.message
                        },
                    ],
                    temperature: 1,
                    max_tokens: 2000,
                    response_format: { "type": "json_object" }
                  }),
                },
            )
            .then(response => response.json())
            .then(data => this.setState( {apiResponse: JSON.parse(data.choices[0].message.content)} ))
            .then(() => this.setState({ status: 'succeeded' }))
            .catch((e) => console.error(e.message));

            surveySection?.classList.remove("hide");
            surveySection?.classList.add("show");
    };

    updateUserAnawers(qst, userAnsw, id) {
        let arr = [...this.state.userAnswers];
        this.setState(
            {userAnswers: arr.map(answ =>
                answ.q_id === id ? { ...answ, qst: qst, userAnsw: userAnsw } : {...answ}
            )}
        );
    }

    setUserAnswers (qst, userAnsw, id) {
        const btn = document.querySelector('#submit-btn');
        btn.classList.remove('hide');
        btn.classList.add('show');

        let arr = [...this.state.userAnswers];
        for (let elem of arr) {
            if (elem.q_id == id) {
                this.updateUserAnawers(qst, userAnsw, id);
                return
            } 
        };

        this.setState(
            { userAnswers: [...this.state.userAnswers, { qst: qst, userAnsw: userAnsw, q_id: id}] }
        );
    }

    handleRestart() {
        const promo = document.querySelector("#promo");
        promo.scrollIntoView({ block: 'end', behavior: 'smooth' });
        this.setState({message: "Give me a JSON for an object 'questions' that contains exactly 15 questions (among others questions about gender, age, food allergies (include main allergies), restrictions), (not including question: 'How many meals do you eat per day?'), with 'id' field, 'question' field and 'answers' filed that contsins 3 answers (with 'id' field for each 'answer' field, id is a random number starting from 101) for each question for make dietary menu"});
        const menu = document.querySelector('#menu-section');
        menu.classList.add('hide');
    }

    submitHandler() {
        let msg = '';
        if (this.state.userAnswers.length < this.state.apiResponse.questions.length) {
            window.confirm("You need to answer all questions for more accurate results.");
        } else {
            this.state.userAnswers.forEach((answ) => {
                msg = msg + `${answ.qst}: ${answ.userAnsw.answer}; `;
            })
            this.setState({ message: `Give me a JSON for an array 'menu' with ready menu for a week (each day is a separate object whitch includes breakfast, lunch, dinner) with 'id' field, based on follow questions with answers: ${msg}` });
        }
    }

    render() {
        const { questions } = this.state.apiResponse;
        const { menu } = this.state.apiResponse;
        const { status } = this.state;

        return (
            <div className="main">
                <Promo handleOnClick={this.apiRequest} />
                {status === 'pending' ? <Spinner /> : null}
                {menu ? <Menu data={menu} handleRestart={this.handleRestart}/> : null}
                <Surveylist data={questions} setUserAnswers={this.setUserAnswers} submitHandler={this.submitHandler}/>      
            </div>
        )
    }
}

export default MainPage;
import { Component } from "react";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import MenuItem from "./MenuItem";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.generatePdf = this.generatePdf.bind(this);
    }

    generatePdf() {
        const content = document.querySelector('#menu'); 
            if (content) {
                html2canvas(content).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 190;
                    const pageHeight = 290;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;
                    const pdf = new jsPDF('pt', 'mm');
                    let position = 0;
                    pdf.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight + 25);
                    heightLeft -= pageHeight;
                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 25);
                        heightLeft -= pageHeight;
                    }
                    pdf.save('Menu.pdf');
                });
            }
        }
    

    render() {
        return (
            <section className="menu" id="menu-section">
                <ul className="menu-list" id="menu">
                    {this.props.data.map((item) => {
                        return (
                            <MenuItem 
                                key={item.id}
                                day={item.day}
                                breakfast={item.breakfast}
                                lunch={item.lunch}
                                dinner={item.dinner}
                            />
                        )
                    })}
                </ul>
                <button className="btn btn--submit" onClick={this.generatePdf}>Save PDF file</button>
                <button className="btn btn--submit btn--restart" onClick={this.props.handleRestart}>Restart survey</button>
            </section>

        )
    }
}

export default Menu;
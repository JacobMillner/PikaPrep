import React, { Component } from "react";
import { Calendar } from "antd";
import API from '../../Util/api';

class PrepCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mealEntries: {}
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const mealEntries = (await API.get(`/mealEntry/${params.id}`)).data;
        console.log("Meal entries", mealEntries);
        this.setState({
            mealEntries: mealEntries.data
        });
    }

    onPanelChange = (value, mode) => {
        console.log(value, mode);
    }

    getCalData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'normal', content: 'This is usual event.' },
                ]; break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'normal', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ]; break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'normal', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ]; break;
            default:
        }
        return listData || [];
    }

    dateCellRender = (value) => {
        const listData = this.getCalData(value);
        console.log(listData);
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <span className={`event-${item.type}`}>●</span>
                            {item.content}
                        </li>
                    ))
                }
            </ul>
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Calendar 
                onPanelChange={this.onPanelChange}
                dateCellRender={this.dateCellRender}
                />
            </div>
        )
    };
}

export default PrepCalendar;
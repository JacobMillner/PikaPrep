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
        let mealDic = {};
        const { match: { params } } = this.props;
        const mealEntries = (await API.get(`/mealEntry/${params.id}`)).data;
        mealEntries.data.map((mealEntry) => {
            mealDic[mealEntry.meal_date] = [mealEntry];
        });
        console.log("Meal entries", mealDic);
        this.setState({
            mealEntries: mealDic
        });
    }

    onPanelChange = (value, mode) => {
        console.log(value, mode);
    }

    getCalData = (value) => {
        let listData;
        if (this.state.mealEntries[value.format("YYYY-MM-DD")]) {
            listData = [];
            this.state.mealEntries[value.format("YYYY-MM-DD")].map((mealEntry) => {
                listData.push({ type: 'normal', content: 'Meal ID: ' + mealEntry.meal_id});
            });
        }
        return listData || [];
    }

    dateCellRender = (value) => {
        const listData = this.getCalData(value);
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
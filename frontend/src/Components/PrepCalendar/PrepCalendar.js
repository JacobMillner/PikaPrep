import React, { Component } from "react";
import { Link } from "react-router-dom";
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

        // create dictionary with date key to quickly look up entries
        const mealEntries = (await API.get(`/mealEntry/${params.id}`)).data;
        this.setState({
            mealEntries: mealEntries.data
        });
    }

    onPanelChange = (value, mode) => {
        console.log(value, mode);
    }

    getCalData = (value) => {
        let listData = {};
        if (this.state.mealEntries[value.format("YYYY-MM-DD")]) {
            let mealData = [];
            this.state.mealEntries[value.format("YYYY-MM-DD")].meal.map((mealEntry) => {
                 return mealData.push({ type: 'normal', content: mealEntry, date: value.format("YYYY-MM-DD")});
            });
            listData = {
                meals: mealData,
                totalCal: this.state.mealEntries[value.format("YYYY-MM-DD")].total_cal
            }
        }
        return listData || {};
    }

    dateCellRender = (value) => {
        const listData = this.getCalData(value);
        const meals = listData.meals || [];
        return (
            <ul className="events">
                {
                    meals.map(item => (
                        <Link to={"/meals/" + item.content.id}>
                            <li key={item.date}>
                                {item.content.name}
                            </li>
                        </Link>
                    ))
                }
                {listData.totalCal && (<li>Total Cal: {listData.totalCal}</li>)}
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
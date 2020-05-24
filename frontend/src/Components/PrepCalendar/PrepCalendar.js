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
        let mealDic = {};
        const { match: { params } } = this.props;

        // create dictionary with date key to quickly look up entries
        // TODO: allow for multiple meal entries on same date.
        const mealEntries = (await API.get(`/mealEntry/${params.id}`)).data;
        mealEntries.data.map((mealEntry) => {
            let totalCals = 0;
            console.log("total cals: ", totalCals);
            if (mealDic[mealEntry['entry'].meal_date]) {
                let mealArray = mealDic[mealEntry['entry'].meal_date].mealEntries;
                totalCals = mealEntry['entry'].calories;
                console.log("total cals: ", totalCals);
                let data = {'mealEntry': [mealEntry['meal']], 'totalCals': totalCals}
                mealArray.push(data);
            } else {
                console.log("total cals: ", totalCals);
                totalCals = mealEntry['entry'].calories;
                let data = {'mealEntries': [mealEntry['meal']], 'totalCals': totalCals}
                mealDic[mealEntry['entry'].meal_date] = data;
            }
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
            this.state.mealEntries[value.format("YYYY-MM-DD")].mealEntries.map((mealEntry) => {
                listData.push({ type: 'normal', content: mealEntry, totalCals: this.state.mealEntries[value.format("YYYY-MM-DD")].totalCals});
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
                        <Link to={"/meals/" + item.content.id}>
                            <li key={item.content.id}>
                                {item.content.name} - 
                                Cals: {item.content.calories}
                            </li>
                        </Link>
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
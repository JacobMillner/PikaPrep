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
        // TODO: allow for multiple meal entries on same date.
        const mealEntries = (await API.get(`/mealEntry/${params.id}`)).data;
        console.log("Meal entries", mealEntries);
        this.setState({
            mealEntries: mealEntries
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
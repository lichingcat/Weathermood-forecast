import React from 'react';
import PropTypes from 'prop-types';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import ForecastDisplay from 'components/ForecastDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {getForecast} from 'api/open-weather-map.js';

import './weather.css';
import { cancelForecast } from '../api/open-weather-map';

export default class Forecast extends React.Component {

    static propTypes = {
        masking: PropTypes.bool,

        groupFirst: PropTypes.string, 
        groupSecond: PropTypes.string, 
        groupThird: PropTypes.string, 
        groupFourth: PropTypes.string, 
        groupFifth: PropTypes.string,

        descriptionFirst: PropTypes.string, 
        descriptionSecond: PropTypes.string, 
        descriptionThird: PropTypes.string, 
        descriptionFourth: PropTypes.string, 
        descriptionFifth: PropTypes.string,

        tempFirst: PropTypes.number, 
        tempSecond: PropTypes.number, 
        tempThird: PropTypes.number, 
        tempFourth: PropTypes.number, 
        tempFifth: PropTypes.number,

        dtFirst: PropTypes.number, 
        dtSecond: PropTypes.number, 
        dtThird: PropTypes.number, 
        dtFourth: PropTypes.number, 
        dtFifth: PropTypes.number,


        unit: PropTypes.string,

    };

    static getInitForecastState() {
        return {
            city: 'na',

            codeFirst: -1, 
            codeSecond: -1, 
            codeThird: -1, 
            codeFourth: -1, 
            codeFifth: -1,

            groupFirst: 'na', 
            groupSecond: 'na', 
            groupThird: 'na', 
            groupFourth: 'na', 
            groupFifth: 'na',

            descriptionFirst: 'N/A', 
            descriptionSecond: 'N/A', 
            descriptionThird: 'N/A', 
            descriptionFourth: 'N/A', 
            descriptionFifth: 'N/A',

            dtFirst: 'na', 
            dtSecond: 'na', 
            dtThird: 'na', 
            dtFourth: 'na', 
            dtFifth: 'na',
            
            tempFirst: NaN, 
            tempSecond: NaN, 
            tempThird: NaN, 
            tempFourth: NaN, 
            tempFifth: NaN,

        };
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitForecastState(),
            loading: false,
            masking: false
        };

        // TODO
        this.handleFormQuery = this.handleFormQuery.bind(this);
    }

    componentDidMount() {
        this.getForecast('Hsinchu', 'metric');
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelForecast();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            city: nextProps.city,
            unit: nextProps.unit
        }, ()=>{
            this.getForecast(this.state.city, this.state.unit);
        });
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.groupFirst}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                {/* <WeatherDisplay {...this.state}/> */}
                <ForecastDisplay {...this.state}/>
                
                </div>
            </div>
        );
    }

    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city 
        }, () => { 
            getForecast(city, unit).then(forecast => {
                this.setState({
                    ...forecast,
                    loading: false
                });
            }).catch(err => {
                console.error('Error getting forecast', err);

                this.setState({
                    ...Forecast.getInitForecastState(unit),
                    loading: false
                });
            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }

    

    handleFormQuery(city, unit) {
        this.props.onQuery(city, unit);
        this.getForecast(city, unit);
    }

}

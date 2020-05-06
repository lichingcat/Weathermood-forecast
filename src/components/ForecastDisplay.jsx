import React from 'react';
import PropTypes from 'prop-types';
import './ForecastDisplay.css';

export default class ForecastDisplay extends React.Component {
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

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={`forecast-display ${this.props.masking
                ? 'masking'
                : ''}`}>
                <div className="container">
                    <img src={`images/w-${this.props.groupFirst}.png`}/>
                    <p className='description'> Tomorrow: {this.props.descriptionFirst}</p>&nbsp;
                    <h1 className='temp'>
                        <span className='display-3'>{(this.props.unit === 'metric')
                        ? (this.props.tempFirst - 273.15).toFixed(0) 
                        : ((this.props.tempFirst-273.15)*9/5+32).toFixed(0)}&ordm;
                        </span>
                        &nbsp;{(this.props.unit === 'metric')
                            ? 'C'
                            : 'F'}
                    </h1>
                </div>

                <div>
                    <div class="d-flex justify-content-around">
                        <div>
                            <ForecastIcon code={this.props.codeSecond} temp={this.props.tempSecond} date={this.props.dtSecond} unit={this.props.unit}/>

                        </div> 
                        <div>
                            <ForecastIcon code={this.props.codeThird} temp={this.props.tempThird} date={this.props.dtThird} unit={this.props.unit}/>

                        </div>

                        <div className="responsive">
                            <ForecastIcon code={this.props.codeFourth} temp={this.props.tempFourth} date={this.props.dtFourth} unit={this.props.unit}/>
                            &nbsp;
                        </div>
                        <div className="responsive">
                                <ForecastIcon code={this.props.codeFifth} temp={this.props.tempFifth} date={this.props.dtFifth} unit={this.props.unit}/>
                        </div>
                        
                    </div>
                </div>

        

            </div>
        );
    }
}

class ForecastIcon extends React.Component {


    constructor(props) {
        super(props);
    }
    
    render() {
        var iconType="owf owf-" + this.props.code + " owf-3x"; 
        const weekday = new Date(this.props.date*1000).getDay();
        var weekdayDescription;
        if (weekday == 0) weekdayDescription = "Sun";
        else if (weekday == 1) weekdayDescription = "Mon";
        else if (weekday == 2) weekdayDescription = "Tue";
        else if (weekday == 3) weekdayDescription = "Wed";
        else if (weekday == 4) weekdayDescription = "Thu";
        else if (weekday == 5) weekdayDescription = "Fri";
        else if (weekday == 6) weekdayDescription = "Sat";

        console.log(weekdayDescription);

        return (

            <div class="d-inline-flex flex-row">
                <h4 className="smallText">
                    {weekdayDescription}:&nbsp;
                    {(this.props.unit === 'metric')
                    ? (this.props.temp - 273.15).toFixed(0) 
                    : ((this.props.temp-273.15)*9/5+32).toFixed(0)}&ordm;
                    {/* {(this.props.unit === 'metric')
                        ? 'C'
                        : 'F'} */}
                </h4>
                <i class={iconType}></i>
            </div>

        )
    }


}

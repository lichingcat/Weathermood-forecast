import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';
import { instanceOf, element } from 'prop-types';
import { withCookies, Cookies, useCookies } from 'react-cookie';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            unit: 'metric',
            city: 'na',
            navbarToggle: false,
            favoriteCities: cookies.get('cities')? cookies.get('cities').split(';') : []
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.setFavoriteCities = this.setFavoriteCities.bind(this);
        this.clearFavoriteCities = this.clearFavoriteCities.bind(this);
        this.handleFavoriteCities = this.handleFavoriteCities.bind(this);
    }

    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>
                        <Navbar color="faded" light expand="md">
                            <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                            <NavbarToggler onClick={this.handleNavbarToggle}/>
                            <Collapse isOpen={this.state.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown>
                                        <DropdownToggle nav caret>
                                            Favorite City
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                                {
                                                    this.state.favoriteCities.map((m => <DropdownItem key = {m} onClick = {()=>this.handleFavoriteCities(m)}>{m}</DropdownItem>))
                                                }
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.clearFavoriteCities}>
                                                Clear
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                                <span className='navbar-text ml-auto'>DataLab</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today city={this.state.city} unit={this.state.unit} onQuery={this.handleFormQuery} />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast city={this.state.city} unit={this.state.unit} onUnitChange={()=>this.handleUnitChange(unit)} onQuery={this.handleFormQuery} />
                    )}/>
                </div>
            </Router>
        );
    }

    setFavoriteCities(city) {
        const { cookies } = this.props;

        var originList = cookies.get('cities');

        if (originList) {
            var list = originList.split(';');
            if (list.indexOf(city) == -1) {
                cookies.set('cities', originList+';'+city);
            }
        } else {
            cookies.set('cities', city);
        }
        console.log(cookies.get('cities'))
        this.setState ({
            favoriteCities: cookies.get('cities').split(';')
        })
        
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleFormQuery(city, unit) {
        this.setState({
            city: city,
            unit: unit
        }, ()=>{
            this.setFavoriteCities(city);
        });
        
    }

    clearFavoriteCities() {
        const { cookies } = this.props;
        cookies.remove('cities');
        this.setState ({
            favoriteCities: []
        })
    }

    handleFavoriteCities(m) {
        this.setState ({
            city: m
        })
    }

    handleUnitChange(unit) {
        this.setState ({
            unit: unit
        }, ()=>{
            this.handleFormQuery(this.state.city, unit);
        })
    }
}

export default withCookies(Main);

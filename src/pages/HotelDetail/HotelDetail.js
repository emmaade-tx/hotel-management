import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import './HotelDetail.scss';

import  { Redirect } from 'react-router-dom';

import _ from 'lodash';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchHotel,
    updateHotel,
    clearStore
} from '../../actions/HotelActions';
import { validateEmail } from '../../helpers/helper';
import { closeNotification } from '../../actions/NotificationActions';
import api from '../../config/config.js';
class Hotel extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            data: {
                name: '',
                email: '',
                state: '',
                city: '',
                country: '',
                phone_number: '',
                address: '',
                zip_code: '',
            },
            errors: {},
            change: false
        };
    }

    componentDidMount () {
        this.props.actions.fetchHotel();
    }

    componentWillUnmount(){
        this.props.actions.clearStore();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {

        if (!_.isEqual(nextProps.HotelStore.hotel, this.props.HotelStore.hotel)) {
                const { hotel } = nextProps.HotelStore;
                this.setState({
                    data: {
                        name: hotel.name,
                        email: hotel.email,
                        address: hotel.address,
                        city: hotel.city,
                        state: hotel.state,
                        country: hotel.country,
                        phone_number: hotel.phone_number,
                        zip_code: hotel.zip_code,
                        image: hotel.image
                    }
                })

            }

       
        return true;
    }


    handleChange = name => event => {
        this.setState({
            data: {
                ...this.state.data,
                [name]: event.target.value
            },
            change: true
        })
    };

    handleSubmit() {
        if (this.handleValidation()) {
            this.props.actions.updateHotel(this.state.data);
        }
    }

    handleValidation() {
        let fields = this.state.data;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = 'Name is required.';
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = 'Email is required.';
        }
        if (fields["email"] && !validateEmail(fields["email"])) {
            formIsValid = false;
            errors["email"] = 'Email is invalid.';
        }
        if (!fields["address"]) {
            formIsValid = false;
            errors["address"] = 'Address is required.';
        }
        if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = 'City is required.';
        }
        if (!fields["state"]) {
            formIsValid = false;
            errors["state"] = 'State is required.';
        }
        if (!fields["country"]) {
            formIsValid = false;
            errors["country"] = 'Country is required.';
        }
        if (!fields["zip_code"]) {
            formIsValid = false;
            errors["zip_code"] = 'Zipcode is required.';
        }
        if (!fields["phone_number"]) {
            formIsValid = false;
            errors["phone_number"] = 'Phone is number.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    renderRedirect() {
        if (this.props.HotelStore.hasSaved) {
            return (
                <Redirect to="/hotel">
                </Redirect>
            )
        } else {
            return null
        }
    }

    render() {
    	const {hotel} = this.props.HotelStore;
    	return (
		    <form className="import-form" autoComplete="off">
		    	<InputLabel htmlFor='name'>
                	Name                        
                </InputLabel>
                <TextField
                    required
                    id="import-form-name"
                    className="import-form-textfield"
                    fullWidth
                    value={hotel.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["name"]}</strong></span>
                <InputLabel htmlFor='email'>
                	Email                        
                </InputLabel>
                <TextField
                    required
                    id="import-form-email"
                    className="import-form-textfield"
                    fullWidth
                    value={hotel.email}
                    type="email"
                    onChange={this.handleChange('email')}
                    margin="normal"
                    disabled={this.state.isEditMode}
                    autoComplete="off"
                />
                <span className="form-error"><strong>{this.state.errors["email"]}</strong></span>
                <InputLabel htmlFor='address'>
                	Address                        
                </InputLabel>
                <TextField
                    id="import-form-start-date"
                    fullWidth
                    className="import-form-textfield"
                    value={hotel.address}
                    onChange={this.handleChange('address')}
                    margin="normal"
                    autoComplete="off"
                />
                <span className="form-error"><strong>{this.state.errors["address"]}</strong></span>
                <InputLabel htmlFor='city'>
                	City                        
                </InputLabel>
                <TextField
                    id="import-form-city"
                    fullWidth
                    className="import-form-textfield"
                    value={hotel.city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                    autoComplete="off"
                />
                <span className="form-error"><strong>{this.state.errors["city"]}</strong></span>
                <InputLabel htmlFor='state'>
                	city                        
                </InputLabel>
                <TextField
                    required
                    id="import-form-name"
                    className="import-form-textfield"
                    fullWidth
                    value={hotel.state}
                    onChange={this.handleChange('state')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["state"]}</strong></span>

                <InputLabel htmlFor='country'>
                	Country                        
                </InputLabel>
                <TextField
                    required
                    id="import-form-country"
                    className="import-form-textfield"
                    fullWidth
                    value={hotel.country}
                    onChange={this.handleChange('country')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["country"]}</strong></span>
                <InputLabel htmlFor='phone_number'>
                	Phone Number                        
                </InputLabel>
                <TextField
                    required
                    id="import-form-phone-number"
                    className="import-form-textfield"
                    fullWidth
                    value={hotel.phone_number}
                    onChange={this.handleChange('phone_number')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["phone_number"]}</strong></span>
                <InputLabel htmlFor='zip_code'>
                	Zip code                       
                </InputLabel>
                <TextField
                    required
                    id="import-form-zip-code"
                    className="import-form-textfield"
                    fullWidth
                    value={hotel.zip_code}
                    onChange={this.handleChange('zip_code')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["zip_code"]}</strong></span>
                <Button
	                variant="contained"
	                color="secondary"
	                size="medium"
	                className="container-bottombar-btn"
	                onClick={() => this.handleSubmit()}
	            >
	                Save
	            </Button>
	            { this.renderRedirect() }
            </form>

	  );
    }
}


function mapStateToProps(state) {
    return {
        HotelStore: state.HotelStore,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                updateHotel,
                fetchHotel,
                clearStore
            },
            dispatch
        ),
    };
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(Hotel)

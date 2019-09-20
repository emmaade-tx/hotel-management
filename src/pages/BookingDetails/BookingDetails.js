import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PreviewModal } from '../../components';

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

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveBooking, resetNotification, fetchBooking, resetActiveBooking, updateBooking, fetchRoomDetails } from '../../actions/BookingActions'
import  { Redirect } from 'react-router-dom';

import { getRoomTypeAndPrice, getRoomTypeAndPriceEdit, validateEmail } from '../../helpers/helper';
import _ from 'lodash';
import './BookingDetails.scss';

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewModalOpen: false,
            isEditMode: false,
            fetchRoomDetails: false,
            selectedValue: "Select a room",
            data: {
                full_name: '',
                email: '',
                start_date: '',
                end_date: '',
                room_id: ''
            },
            errors: {},
        };
    }

    componentDidMount(){
        //fetch the room details
        this.getAllRoomDetails();
        let editMode = false;
        const matchParams = this.props.match.params;
        if (!_.isEmpty(matchParams)) {
            if (typeof matchParams.id !== 'undefined') {
                editMode = true;
            }
            this.setState({
                isEditMode: editMode
            });

            //fetch bookings
            this.props.actions.fetchBooking(matchParams.id);
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.isEditMode) {
            if (_.isNil(this.props.BookingStore.activeBooking) && !_.isNil(nextProps.BookingStore.activeBooking)) {
                const { activeBooking } = nextProps.BookingStore;
                this.setState({
                    data: {
                        full_name: activeBooking.full_name,
                        email: activeBooking.email,
                        start_date: activeBooking.start_date,
                        end_date: activeBooking.end_date,
                        room_id: activeBooking.room_id
                    }
                })

                let roomDetailObj = getRoomTypeAndPriceEdit(this.props.BookingStore.allRoomDetails, activeBooking.room_id);
                if (roomDetailObj.length > 0) {
                    roomDetailObj = roomDetailObj[0];
                    this.setState({
                        selectedValue: roomDetailObj.display
                    })
                }
            }
        }

        return true;
    }

    componentWillUnmount(){
        this.props.actions.resetActiveBooking();
    }

    handleChange = name => event => {
        this.setState({
            data: {
                ...this.state.data,
                [name]: event.target.value
            }
        })
    };

    handleSubmit() {
        if (this.handleValidation()) {
            if (this.state.isEditMode) {
                this.props.actions.updateBooking(this.props.BookingStore.activeBooking.id, this.state.data);
            } else {
                this.props.actions.saveBooking(this.state.data);
            }
        }
    }

    renderRedirect() {
        if (this.props.BookingStore.hasSaved) {
            return (
                <Redirect to="/bookings">
                </Redirect>
            )
        } else {
            return null
        }
    }

    getAllRoomDetails = () => {
        this.props.actions.fetchRoomDetails();
    }

    handleDropdown = (e, value) => {
        this.setState({
            selectedValue: e.target.value,
            data: {
                ...this.state.data,
                room_id: value.key

            }
        });
    };

    handleValidation() {
        let fields = this.state.data;
        let errors = {};
        let formIsValid = true;

        if (!fields["full_name"]) {
            formIsValid = false;
            errors["full_name"] = 'Full name is required.';
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = 'Email is required.';
        }
        if (!fields["start_date"]) {
            formIsValid = false;
            errors["start_date"] = 'Start Date is required.';
        }
        if (fields["email"] && !validateEmail(fields["email"])) {
            formIsValid = false;
            errors["email"] = 'Email is invalid.';
        }

        if (!fields["end_date"]) {
            formIsValid = false;
            errors["end_date"] = 'End Date is required.';
        }
        if (!fields["room_id"]) {
            formIsValid = false;
            errors["room_id"] = 'Please select a room from the dropdown.';
        }

        this.setState({errors: errors});

        return formIsValid;
    }

    renderButtons() {
        return (
            <React.Fragment>
                <Link to="/bookings">
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        className="container-bottombar-btn"
                    >
                        Cancel
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    className="container-bottombar-btn"
                    onClick={() => this.handleSubmit()}
                >
                    Save
                </Button>
                
            </React.Fragment>
        );
    }
    renderForm() {
        const { allRoomDetails } = this.props.BookingStore;

        return (
            <form className="import-form" autoComplete="off">
                <TextField
                    required
                    id="import-form-name"
                    label="Full Name"
                    className="import-form-textfield"
                    fullWidth
                    value={this.state.data.full_name || ''}
                    onChange={this.handleChange('full_name')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["full_name"]}</strong></span>
                <TextField
                    required
                    id="import-form-email"
                    label="Email"
                    className="import-form-textfield"
                    fullWidth
                    value={this.state.data.email || ''}
                    type="email"
                    onChange={this.handleChange('email')}
                    margin="normal"
                    disabled={this.state.isEditMode}
                    autoComplete="off"
                />
                <span className="form-error"><strong>{this.state.errors["email"]}</strong></span>

                <TextField
                    id="import-form-start-date"
                    fullWidth
                    label="Start Date"
                    type="date"
                    className="import-form-textfield"
                    value={this.state.data.start_date || ''}
                    onChange={this.handleChange('start_date')}
                    margin="normal"
                    autoComplete="off"
                />
                <span className="form-error"><strong>{this.state.errors["start_date"]}</strong></span>

                <TextField
                    id="import-form-end-date"
                    fullWidth
                    label="End Date"
                    type="date"
                    className="import-form-textfield"
                    value={this.state.data.end_date || ''}
                    onChange={this.handleChange('end_date')}
                    margin="normal"
                    autoComplete="off"
                />
                <span className="form-error"><strong>{this.state.errors["end_date"]}</strong></span>

                <Select
                    onChange={this.handleDropdown}
                    value={this.state.selectedValue}
                    input={<FilledInput fullWidth />}
                    variant='standard'
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left'
                        }
                     }}
                    >
                    <MenuItem key={this.state.data.room_id} value={this.state.selectedValue}>
                        {this.state.selectedValue}
                    </MenuItem>
                    {allRoomDetails.length > 0 ? getRoomTypeAndPrice(allRoomDetails).map((room) => <MenuItem key={room.id} value={room.name}>{room.display}</MenuItem>) : ""}
                </Select>
            </form>
        );
    }
    render() {
        const { isEditMode } = this.state;
        return (
            <div className="booking-container">
                <Grid
                    container
                    className={'booking-container-main'}
                    spacing={24}
                    justify={'center'}
                >
                    <Grid item xs={12} md={10}>
                        <div className="container-topbar">
                            <Typography
                                variant="h1"
                                className="container-title"
                            >
                                {
                                    !isEditMode &&
                                    "Create"
                                }
                                {
                                    isEditMode &&
                                    "Edit"
                                }

                            </Typography>
                        </div>
                        <div className="container-middlebar">
                            { this.renderRedirect() }
                            {this.renderForm()}
                        </div>
                        <div className="container-bottombar">
                            {this.renderButtons()}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        BookingStore: state.BookingStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchBooking,
                saveBooking,
                resetNotification,
                resetActiveBooking,
                updateBooking,
                fetchRoomDetails
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingDetails)

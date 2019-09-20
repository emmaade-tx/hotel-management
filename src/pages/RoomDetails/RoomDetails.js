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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveRoom, resetNotification, fetchRoom, resetActiveRoom, updateRoom, fetchRoomTypes } from '../../actions/RoomActions'
import  { Redirect } from 'react-router-dom';

import { getSelectedRoomType } from '../../helpers/helper';
import _ from 'lodash';
import './RoomDetails.scss';

class RoomDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewModalOpen: false,
            isEditMode: false,
            fetchRoomTypes: false,
            selectedValue: "Select a room type",
            data: {
                name: '',
                room_type_id: '',
                availability: '',
            },
            value: '', 
            setValue: '',
            errors: {}
        };
    }

    componentDidMount(){
        //fetch the room details
        this.getAllRoomTypes();
        let editMode = false;
        const matchParams = this.props.match.params;
        if (!_.isEmpty(matchParams)) {
            if (typeof matchParams.id !== 'undefined') {
                editMode = true;
            }
            this.setState({
                isEditMode: editMode
            });

            //fetch Rooms
            this.props.actions.fetchRoom(matchParams.id);
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.isEditMode) {
            if (_.isNil(this.props.RoomStore.activeRoom) && !_.isNil(nextProps.RoomStore.activeRoom)) {
                const { activeRoom } = nextProps.RoomStore;
                this.setState({
                    data: {
                        name: activeRoom.name,
                        room_type_id: activeRoom.room_type_id,
                        availability: activeRoom.availability,
                    }
                })

                let roomTypeObj = getSelectedRoomType(this.props.RoomTypeStore.allRoomTypes, activeRoom.room_type_id);
                if (roomTypeObj.length > 0) {
                    roomTypeObj = roomTypeObj[0];
                    this.setState({
                        selectedValue: roomTypeObj.name
                    })
                }
            }
        }

        return true;
    }

    componentWillUnmount(){
        this.props.actions.resetActiveRoom();
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
                this.props.actions.updateRoom(this.props.RoomStore.activeRoom.id, this.state.data);
            } else {
                this.props.actions.saveRoom(this.state.data);
            }
        }
    }

    renderRedirect() {
        if (this.props.RoomStore.hasSaved) {
            return (
                <Redirect to="/rooms">
                </Redirect>
            )
        } else {
            return null
        }
    }

    getAllRoomTypes = () => {
        this.props.actions.fetchRoomTypes();
    }

    handleDropdown = (e, value) => {
        this.setState({
            selectedValue: e.target.value,
            data: {
                ...this.state.data,
                room_type_id: value.key

            }
        });
    };

    handleValidation() {
        let fields = this.state.data;
        // let room = this.state.room_id;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = 'Name is required.';
        }
        if (!fields["room_type_id"]) {
            formIsValid = false;
            errors["email"] = 'Please select a room type from the dropdown.';
        }

        return formIsValid;
    }

    setAvailability(availability) {
        if (availability === 1) {
            return "1";
        } else if (availability === 0) {
            return "0";
        } else {
            return availability;
        }
    }
    renderButtons() {
        return (
            <React.Fragment>
                <Link to="/rooms">
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
        const { allRoomTypes } = this.props.RoomTypeStore;
        return (
            <form className="import-form" autoComplete="off">
                <TextField
                    required
                    id="import-form-name"
                    label="Name"
                    className="import-form-textfield"
                    fullWidth
                    value={this.state.data.name || ''}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
                <span className="form-error"><strong>{this.state.errors["name"]}</strong></span>

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
                    <MenuItem key={this.state.data.room_type_id} value={this.state.selectedValue}>
                        {this.state.selectedValue}
                    </MenuItem>
                    {allRoomTypes.length > 0 ? allRoomTypes.map((roomType) => <MenuItem key={roomType.id} value={roomType.name}>{roomType.name}</MenuItem>) : ""}
                </Select>




                <RadioGroup
                  aria-label="Gender"
                  name="availability"
                  className={"import-form-textfield"}
                  value={this.setAvailability(this.state.data.availability)}
                  onChange={this.handleChange('availability')}
                >
                    <FormControlLabel value="1" control={<Radio />} label="Available" />
                    <FormControlLabel value="0" control={<Radio />} label="Unavailable" />
                </RadioGroup>
                
            </form>
        );
    }
    render() {
        const { isEditMode } = this.state;
        return (
            <div className="room-container">
                <Grid
                    container
                    className={'room-container-main'}
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
                                    "Create a Room"
                                }
                                {
                                    isEditMode &&
                                    "Edit a Room"
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
        RoomStore: state.RoomStore,
        RoomTypeStore: state.RoomTypeStore
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchRoom,
                saveRoom,
                resetNotification,
                resetActiveRoom,
                updateRoom,
                fetchRoomTypes
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomDetails)

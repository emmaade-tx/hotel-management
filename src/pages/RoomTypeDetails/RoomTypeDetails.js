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
import { saveRoomType, resetNotification, fetchRoomType, resetActiveRoomType, updateRoomType } from '../../actions/RoomTypeActions'
import  { Redirect } from 'react-router-dom';

import _ from 'lodash';
import './RoomTypeDetails.scss';

class RoomTypeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewModalOpen: false,
            isEditMode: false,
            selectedValue: "Select a room",
            data: {
                name: '',
            },
            errors: {},
        };
    }

    componentDidMount(){
        let editMode = false;
        const matchParams = this.props.match.params;
        if (!_.isEmpty(matchParams)) {
            if (typeof matchParams.id !== 'undefined') {
                editMode = true;
            }
            this.setState({
                isEditMode: editMode
            });

            //fetch room types
            this.props.actions.fetchRoomType(matchParams.id);
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.isEditMode) {
            if (_.isNil(this.props.RoomTypeStore.activeRoomType) && !_.isNil(nextProps.RoomTypeStore.activeRoomType)) {
                const { activeRoomType } = nextProps.RoomTypeStore;
                this.setState({
                    data: {
                        name: activeRoomType.name,
                    }
                })
            }
        }

        return true;
    }

    componentWillUnmount(){
        this.props.actions.resetActiveRoomType();
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
                this.props.actions.updateRoomType(this.props.RoomTypeStore.activeRoomType.id, this.state.data);
            } else {
                console.log("call save RoomType");
                this.props.actions.saveRoomType(this.state.data);
            }
        }
    }

    renderRedirect() {
        if (this.props.RoomTypeStore.hasSaved) {
            return (
                <Redirect to="/roomtypes">
                </Redirect>
            )
        } else {
            return null
        }
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
        // let room = this.state.room_id;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = 'Name is required.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    renderButtons() {
        return (
            <React.Fragment>
                <Link to="/roomtypes">
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
        const { allRoomDetails } = this.props.RoomTypeStore;
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
            </form>
        );
    }
    render() {
        const { isEditMode } = this.state;
        return (
            <div className="roomtype-container">
                <Grid
                    container
                    className={'roomtype-container-main'}
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
        RoomTypeStore: state.RoomTypeStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchRoomType,
                saveRoomType,
                resetNotification,
                resetActiveRoomType,
                updateRoomType
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomTypeDetails)

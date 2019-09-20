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
import { savePriceList, resetNotification, fetchPriceList, resetActivePriceList, updatePriceList, fetchRoomTypes } from '../../actions/PriceListActions'
import  { Redirect } from 'react-router-dom';

import { getSelectedRoomType } from '../../helpers/helper';
import _ from 'lodash';
import './PriceListDetails.scss';

class PriceListDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewModalOpen: false,
            isEditMode: false,
            fetchRoomTypes: false,
            selectedValue: "Select a PriceList type",
            data: {
                name: '',
                PriceList_type_id: '',
                availability: '',
            },
            value: '', 
            setValue: '',
            errors: {}
        };
    }

    componentDidMount(){
        //fetch the PriceList details
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

            //fetch PriceLists
            this.props.actions.fetchPriceList(matchParams.id);
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.isEditMode) {
            if (_.isNil(this.props.PriceListStore.activePriceList) && !_.isNil(nextProps.PriceListStore.activePriceList)) {
                const { activePriceList } = nextProps.PriceListStore;
                this.setState({
                    data: {
                        room_type_id: activePriceList.room_type_id,
                        price: activePriceList.price,
                    }
                })

                let roomTypeObj = getSelectedRoomType(this.props.RoomTypeStore.allRoomTypes, activePriceList.room_type_id);
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
        this.props.actions.resetActivePriceList();
    }

    handleChange = name => event => {
        console.log('handle change: ',name);
        console.log('handle change event target value: ',event.target.value);
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
                this.props.actions.updatePriceList(this.props.PriceListStore.activePriceList.id, this.state.data);
            } else {
                this.props.actions.savePriceList(this.state.data);
            }
        }
    }

    renderRedirect() {
        if (this.props.PriceListStore.hasSaved) {
            return (
                <Redirect to="/PriceLists">
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
        let errors = {};
        let formIsValid = true;

        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = 'Price is required.';
        }
        if (!fields["room_type_id"]) {
            formIsValid = false;
            errors["room_type_id"] = 'Please select a room type from the dropdown.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    renderButtons() {
        return (
            <React.Fragment>
                <Link to="/pricelists">
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
                    id="import-form-price"
                    label="Price"
                    className="import-form-textfield"
                    fullWidth
                    value={this.state.data.price || ''}
                    onChange={this.handleChange('price')}
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
            </form>
        );
    }
    render() {
        const { isEditMode } = this.state;
        return (
            <div className="priceist-container">
                <Grid
                    container
                    className={'pricelist-container-main'}
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
                                    "Create a PriceList"
                                }
                                {
                                    isEditMode &&
                                    "Edit a PriceList"
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
        PriceListStore: state.PriceListStore,
        RoomTypeStore: state.RoomTypeStore
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchPriceList,
                savePriceList,
                resetNotification,
                resetActivePriceList,
                updatePriceList,
                fetchRoomTypes
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceListDetails)

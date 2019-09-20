import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import './Bookings.scss';
import Typography from '@material-ui/core/Typography';

import {
    PaginationTable,
    ModalContainer,
    SearchField,
    PreviewModal
} from '../../components';
import _ from 'lodash';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchAllBookings,
    deleteBooking,
    dispatchFetchBookingError,
} from '../../actions/BookingActions';
import { showNotification } from '../../actions/NotificationActions';
import {
    TABLE_BOOKINGS,
    TABLE_LOAD_SIZE,
} from '../../constants/constants.js';
import { bookingsTableConfig } from '../../config/tableConfig.js';
import api from '../../config/config.js';
class Bookings extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            selectedBookingId: '',
            livestreamPreviewLink: '',
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false
        };
    }

    componentDidMount () {
        this.getAllBookings();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {

        if (!_.isEqual(nextProps.BookingStore.allBookings, this.props.BookingStore.allBookings)) {
            if (nextProps.BookingStore.allBookings.length === 0){
                //to determine if we should refetch
                if(_.isEqual(nextProps.BookingStore.sort, this.props.BookingStore.sort) && !_.isEqual(nextProps.BookingStore.allBookings, this.props.BookingStore.allBookings)){
                    this.getAllBookings();
                    if (this.state.selected.length > 0) {
                        this.setState({
                            selected: []
                        })
                    }
                }
            }
        }

        if (this.props.location !== nextProps.location) {
            //if user navigated to the same page, for example,
            //clicking same tab
            this.props.actions.fetchAllBookings();
        }
        return true;
    }

    getAllBookings = () => {
        this.props.actions.fetchAllBookings();
        if (this.props.BookingStore.hasSaved && !this.props.BookingStore.hasError) {
            this.props.actions.showNotification();
        }
        if (this.props.BookingStore.hasError) {
            this.props.actions.dispatchFetchBookingError();
        }
    };

    displayError () {
        return (
            <Typography variant="h2" gutterBottom className="text-center">
                Sorry, something went wrong.
            </Typography>
        );
    }

    handleCloseModal = e => {
        this.setState({
            modalOpen: false,
            confirmDelete: false
        });
    };

    deleteBooking = id => {
        this.props.actions.deleteBooking(
            id
        );
        this.setState({
            modalOpen: false,
            selectedBookingId: ''
        });
    };

    handleDelete = (index, id) => {
        // this.props.actions.getStreamStatus(streamId);
        // this.renderModal()
        this.setState({
            selectedBookingId: id,
            modalOpen: true,
        });
    };

    handleContentDelete = (selected) => {
        this.setState({
            confirmDelete: true
        })
    }

    handleFetchContent = (id) =>{
        this.props.history.push(api.bookings_path + "/" + id);
    }

    updateSelected = (selected) => {
        this.setState({ selected });
    }

    renderModal () {
        return (
            <ModalContainer
                handleCancel={e => this.handleCloseModal(e)}
                handleContinue={id =>
                    this.deleteBooking(this.state.selectedBookingId)
                }
                open={this.state.modalOpen}
                modalHeader={"Delete Bookings?"}
                buttonLeft={"Cancel"}
                buttonRight={"Delete"}
                includeModalFooter={true}
                includeModalHeader={true}
            >
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        Are you sure you want to delete this booking?
                    </Typography>
                </DialogContent>
            </ModalContainer>
        );
    }

    renderTable () {
        const {isLoading, allBookings, totalRecords} = this.props.BookingStore;
        const menuFields = [
            {
                fieldName: 'edit',
                isLink: true,
            },
            {
                fieldName: 'delete',
                isLink: false,
                eventHandler: (index, id) =>
                    this.handleDelete(index, id),
            },
        ];
        let { selected } = this.state;
        return (
            //column names are rendered based on the order in colNames.
            <div id="pagination-table">
                <PaginationTable
                    columns={6}
                    contentType={TABLE_BOOKINGS}
                    includeActionColumn={true}
                    menuFields={menuFields}
                    fields={bookingsTableConfig}
                    data={allBookings}
                    isLoading={isLoading}
                    count={totalRecords}
                    selectable={true}
                    selectId={"id"}
                    selected={selected}
                    handleContentDelete={this.handleContentDelete}
                    fetchContent={this.handleFetchContent}
                    updateSelected={this.updateSelected}
                />
            </div>
        );

    }

    renderConfirmDeleteModal() {
        return (
            <ModalContainer
                handleCancel={e => this.handleCloseModal(e)}
                handleContinue={this.deleteBooking}
                open={this.state.confirmDelete}
                modalHeader={"Delete Bookings"}
                buttonLeft={"cancel"}
                buttonRight={"confirm"}
                includeModalFooter={true}
                includeModalHeader={true}
            >
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        
                    </Typography>
                </DialogContent>
            </ModalContainer>
        );
    }

    render () {
        // console.log('store: ',this.props.BookingStore)
        const {hasError} = this.props.BookingStore;
        const { selected } = this.state;

        return (
            <div className="booking-container">
                <div className="booking-container-main">
                    <div className={"container-topbar" + (selected.length > 0 ? " has-toolbar" : "")}>
                        <div>
                            <Typography variant="h1" className="container-title">
                                Bookings
                            </Typography>
                        </div>
                        <div className="container-topbar-right">
                            <Link to="/booking/new">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="container-topbar-btn"
                                >
                                    Create new booking
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {hasError && this.displayError()}
                    {!hasError && this.renderTable()}
                    {this.renderModal()}
                    {this.renderConfirmDeleteModal()}
                </div>
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
                fetchAllBookings,
                deleteBooking,
                showNotification,
                dispatchFetchBookingError,
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bookings)

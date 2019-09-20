import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import './Rooms.scss';
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
    fetchAllRooms,
    deleteRoom,
    fetchRoomTypes,
    dispatchFetchRoomError,
} from '../../actions/RoomActions';
import { showNotification } from '../../actions/NotificationActions';
import {
    TABLE_ROOMS,
    TABLE_LOAD_SIZE,
} from '../../constants/constants.js';
import { roomsTableConfig } from '../../config/tableConfig.js';
import api from '../../config/config.js';
class Rooms extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            selectedRoomId: '',
            livestreamPreviewLink: '',
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false
        };
    }

    componentDidMount () {
        this.getAllRooms();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {

        if (!_.isEqual(nextProps.RoomStore.allRooms, this.props.RoomStore.allRooms)) {
            if (nextProps.RoomStore.allRooms.length === 0){
                //to determine if we should refetch
                if(_.isEqual(nextProps.RoomStore.sort, this.props.RoomStore.sort) && !_.isEqual(nextProps.RoomStore.allRooms, this.props.RoomStore.allRooms)){
                    this.getAllRooms();
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
            this.props.actions.fetchAllRooms();
        }
        return true;
    }

    getAllRooms = () => {
        this.props.actions.fetchAllRooms();
        if (this.props.RoomStore.hasSaved && !this.props.RoomStore.hasError) {
            this.props.actions.showNotification();
        }
        if (this.props.RoomStore.hasError) {
            this.props.actions.dispatchFetchRoomError();
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

    deleteRoom = id => {
        this.props.actions.deleteRoom(
            id
        );
        this.setState({
            modalOpen: false,
            selectedRoomId: ''
        });
    };

    handleDelete = (index, id) => {
        this.setState({
            selectedRoomId: id,
            modalOpen: true,
        });
    };

    handleContentDelete = (selected) => {
        this.setState({
            confirmDelete: true
        })
    }

    handleFetchContent = (id) =>{
        this.props.history.push(api.rooms_path + "/" + id);
    }

    updateSelected = (selected) => {
        this.setState({ selected });
    }

    renderModal () {
        return (
            <ModalContainer
                handleCancel={e => this.handleCloseModal(e)}
                handleContinue={id =>
                    this.deleteRoom(this.state.selectedRoomId)
                }
                open={this.state.modalOpen}
                modalHeader={"Delete Rooms?"}
                buttonLeft={"Cancel"}
                buttonRight={"Delete"}
                includeModalFooter={true}
                includeModalHeader={true}
            >
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        Are you sure you want to delete this Room?
                    </Typography>
                </DialogContent>
            </ModalContainer>
        );
    }

    renderTable () {
        const {isLoading, allRooms, totalRecords} = this.props.RoomStore;
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
                    contentType={TABLE_ROOMS}
                    includeActionColumn={true}
                    menuFields={menuFields}
                    fields={roomsTableConfig}
                    data={allRooms}
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
                handleContinue={this.handleBulkDelete}
                open={this.state.confirmDelete}
                modalHeader={"Delete"}
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
        const {hasError} = this.props.RoomStore;
        const { selected } = this.state;

        return (
            <div className="room-container">
                <div className="room-container-main">
                    <div className={"container-topbar" + (selected.length > 0 ? " has-toolbar" : "")}>
                        <div>
                            <Typography variant="h1" className="container-title">
                                Rooms
                            </Typography>
                        </div>
                        <div className="container-topbar-right">
                            <Link to="/room/new">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="container-topbar-btn"
                                >
                                    Create new Room
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
        RoomStore: state.RoomStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchAllRooms,
                deleteRoom,
                showNotification,
                dispatchFetchRoomError,
                fetchRoomTypes
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rooms)

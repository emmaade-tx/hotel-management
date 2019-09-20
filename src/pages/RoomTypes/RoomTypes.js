import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import './RoomTypes.scss';
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
    fetchAllRoomTypes,
    deleteRoomType,
    dispatchFetchRoomTypeError,
} from '../../actions/RoomTypeActions';
import { showNotification } from '../../actions/NotificationActions';
import {
    TABLE_ROOMTYPES,
    TABLE_LOAD_SIZE,
} from '../../constants/constants.js';
import { roomTypesTableConfig } from '../../config/tableConfig.js';
import api from '../../config/config.js';
class RoomTypes extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            selectedRoomTypeId: '',
            livestreamPreviewLink: '',
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false
        };
    }

    componentDidMount () {
        this.getAllRoomTypes();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {

        if (!_.isEqual(nextProps.RoomTypeStore.allRoomTypes, this.props.RoomTypeStore.allRoomTypes)) {
            if (nextProps.RoomTypeStore.allRoomTypes.length === 0){
                //to determine if we should refetch
                if(_.isEqual(nextProps.RoomTypeStore.sort, this.props.RoomTypeStore.sort) && !_.isEqual(nextProps.RoomTypeStore.allRoomTypes, this.props.RoomTypeStore.allRoomTypes)){
                    this.getAllRoomTypes();
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
            this.props.actions.fetchAllRoomTypes();
        }
        return true;
    }

    displayError () {
        return (
            <Typography variant="h2" gutterBottom className="text-center">
                Sorry, something went wrong.
            </Typography>
        );
    }

    getAllRoomTypes = () => {
        this.props.actions.fetchAllRoomTypes();
        if (this.props.RoomTypeStore.hasSaved && !this.props.RoomTypeStore.hasError) {
            this.props.actions.showNotification();
        }
        if (this.props.RoomTypeStore.hasError) {
            this.props.actions.dispatchFetchRoomTypeError();
        }
    };

    handleCloseModal = e => {
        this.setState({
            modalOpen: false,
            confirmDelete: false
        });
    };

    deleteRoomType = id => {
        this.props.actions.deleteRoomType(
            id
        );
        this.setState({
            modalOpen: false,
            selectedRoomTypeId: ''
        });
    };

    handleDelete = (index, id) => {
        // this.props.actions.getStreamStatus(streamId);
        // this.renderModal()
        this.setState({
            selectedRoomTypeId: id,
            modalOpen: true,
        });
    };

    handleContentDelete = (selected) => {
        this.setState({
            confirmDelete: true
        })
    }

    handleFetchContent = (id) =>{
        this.props.history.push(api.roomTypes_path + "/" + id);
    }

    updateSelected = (selected) => {
        this.setState({ selected });
    }

    renderModal () {
        return (
            <ModalContainer
                handleCancel={e => this.handleCloseModal(e)}
                handleContinue={id =>
                    this.deleteRoomType(this.state.selectedRoomTypeId)
                }
                open={this.state.modalOpen}
                modalHeader={"Delete RoomTypes?"}
                buttonLeft={"Cancel"}
                buttonRight={"Delete"}
                includeModalFooter={true}
                includeModalHeader={true}
            >
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        Are you sure you want to delete this RoomType?
                    </Typography>
                </DialogContent>
            </ModalContainer>
        );
    }

    renderTable () {
        const {isLoading, allRoomTypes, totalRecords} = this.props.RoomTypeStore;
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
                    contentType={TABLE_ROOMTYPES}
                    includeActionColumn={true}
                    menuFields={menuFields}
                    fields={roomTypesTableConfig}
                    data={allRoomTypes}
                    isLoading={isLoading}
                    selectable={true}
                    count={totalRecords}
                    selectId={"id"}
                    selected={selected}
                    addTag={false}
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
                modalHeader={"acacwcw"}
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
        // console.log('store: ',this.props.RoomTypeStore)
        const {hasError} = this.props.RoomTypeStore;
        const { selected } = this.state;

        return (
            <div className="RoomType-container">
                <div className="RoomType-container-main">
                    <div className={"container-topbar" + (selected.length > 0 ? " has-toolbar" : "")}>
                        <div>
                            <Typography variant="h1" className="container-title">
                                RoomTypes
                            </Typography>
                        </div>
                        <div className="container-topbar-right">
                            <Link to="/RoomType/new">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="container-topbar-btn"
                                >
                                    Create new RoomType
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
        RoomTypeStore: state.RoomTypeStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchAllRoomTypes,
                deleteRoomType,
                showNotification,
                dispatchFetchRoomTypeError,
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomTypes)

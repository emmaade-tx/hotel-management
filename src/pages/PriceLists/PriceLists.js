import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import './PriceLists.scss';
import Typography from '@material-ui/core/Typography';
import {
    PaginationTable,
    ModalContainer,
    SearchField,
    PreviewModal
} from '../../components';
import _ from 'lodash';

import { formatPriceLists } from '../../helpers/helper';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchAllPriceLists,
    deletePriceList,
    dispatchFetchPriceListError,
    fetchRoomDetails
} from '../../actions/PriceListActions';
import { showNotification } from '../../actions/NotificationActions';
import {
    TABLE_PRICELISTS,
    TABLE_LOAD_SIZE,
} from '../../constants/constants.js';
import { priceListsTableConfig } from '../../config/tableConfig.js';
import api from '../../config/config.js';
class PriceLists extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            selectedPriceListId: '',
            livestreamPreviewLink: '',
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false
        };
    }

    componentDidMount () {
        this.getAllPriceLists();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {

        if (!_.isEqual(nextProps.PriceListStore.allPriceLists, this.props.PriceListStore.allPriceLists)) {
            if (nextProps.PriceListStore.allPriceLists.length === 0){
                //to determine if we should refetch
                if(_.isEqual(nextProps.PriceListStore.sort, this.props.PriceListStore.sort) && !_.isEqual(nextProps.PriceListStore.allPriceLists, this.props.PriceListStore.allPriceLists)){
                    this.getAllPriceLists();
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
            this.props.actions.fetchAllPriceLists();
        }
        return true;
    }

    getAllPriceLists = () => {
        this.props.actions.fetchAllPriceLists();
        if (this.props.PriceListStore.hasSaved && !this.props.PriceListStore.hasError) {
            this.props.actions.showNotification();
        }
        if (this.props.PriceListStore.hasError) {
            this.props.actions.dispatchFetchPriceListError();
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

    deletePriceList = id => {
        this.props.actions.deletePriceList(
            id
        );
        this.setState({
            modalOpen: false,
            selectedPriceListId: ''
        });
    };

    handleDelete = (index, id) => {
        // this.props.actions.getStreamStatus(streamId);
        // this.renderModal()
        this.setState({
            selectedPriceListId: id,
            modalOpen: true,
        });
    };

    handleContentDelete = (selected) => {
        this.setState({
            confirmDelete: true
        })
    }

    handleFetchContent = (id) =>{
        this.props.history.push(api.priceLists_path + "/" + id);
    }

    updateSelected = (selected) => {
        this.setState({ selected });
    }

    renderModal () {
        return (
            <ModalContainer
                handleCancel={e => this.handleCloseModal(e)}
                handleContinue={id =>
                    this.deletePriceList(this.state.selectedPriceListId)
                }
                open={this.state.modalOpen}
                modalHeader={"Delete PriceLists?"}
                buttonLeft={"Cancel"}
                buttonRight={"Delete"}
                includeModalFooter={true}
                includeModalHeader={true}
            >
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        Are you sure you want to delete this PriceList?
                    </Typography>
                </DialogContent>
            </ModalContainer>
        );
    }

    renderTable () {
        const {isLoading, allPriceLists, totalRecords} = this.props.PriceListStore;
        const newPriceLists = formatPriceLists(allPriceLists);
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
                    contentType={TABLE_PRICELISTS}
                    includeActionColumn={true}
                    menuFields={menuFields}
                    fields={priceListsTableConfig}
                    data={allPriceLists}
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
        const {hasError} = this.props.PriceListStore;
        const { selected } = this.state;

        return (
            <div className="pricelist-container">
                <div className="priceList-container-main">
                    <div className={"container-topbar" + (selected.length > 0 ? " has-toolbar" : "")}>
                        <div>
                            <Typography variant="h1" className="container-title">
                                PriceLists
                            </Typography>
                        </div>
                        <div className="container-topbar-right">
                            <Link to="/pricelist/new">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="container-topbar-btn"
                                >
                                    Create new PriceList
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
        PriceListStore: state.PriceListStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchAllPriceLists,
                deletePriceList,
                showNotification,
                dispatchFetchPriceListError,
                fetchRoomDetails
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceLists)

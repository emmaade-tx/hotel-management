import React, { Component } from 'react';
import './PaginationTable.scss';
import PropTypes from 'prop-types';

//material-ui
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography'
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions';
import { EnhancedTableBody, EnhancedTableHead, Loading, EnhancedTableToolbar } from '../../../../components';
import _ from 'lodash';
class PaginationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            anchorEl: null,
            menus: [],
            page: 0,
            numSelectedByPage: []
        };
    }
    shouldComponentUpdate(nextProps, nextState){
        if (
          nextProps.data !==
          this.props.data
        ) {

          this.setState({
            menus:
                nextProps.count > 0
                ? nextProps.data.map(m => false)
                : [],
            numSelectedByPage: this.adjustNumSelectedByPage(nextProps)
          });
        }
        if (!_.isEqual(nextProps.selected, this.props.selected) &&
            this.props.selected.length > 0 && nextProps.selected.length === 0
        ){
            this.setState({
                numSelectedByPage: nextProps.count > 0 ?
                _.fill(Array(Math.ceil(nextProps.count/nextProps.limit)-1), 0) : []
            })
        }
        if(nextProps.page!==this.props.page && nextProps.page!==this.state.page){
            this.setState({page: nextProps.page });
        }

        return true;
    }

    componentWillMount(){
        if(this.props.page !== this.state.page){
            this.setState({ page: this.props.page });
        }
    }

    adjustNumSelectedByPage = (nextProps) => {
        const { data, selectId, selected } = nextProps;
        let numSelectedByPage = [...this.state.numSelectedByPage];

        //find the number of selected items are in the data
        const currentDataIds = _.map(data, selectId);
        const intersect = _.intersection(currentDataIds, selected);
        numSelectedByPage[this.state.page] = intersect.length;
        return numSelectedByPage;
    }

    handleCheckboxClicked = (event, id) => {
        const { selected } = this.props;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        let num = 0;
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            num += 1;
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            num -= 1;
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            num -= 1;
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            num -= 1;
        }
        let numSelectedByPage = [...this.state.numSelectedByPage];
        numSelectedByPage[this.state.page] += num;
        this.setState({ numSelectedByPage }) ;
        this.props.updateSelected(newSelected);
    }

    renderSortData = (property) => {
        const { limit } = this.props;
        const orderBy = property;
        let order = 'desc';

        if (this.props.orderBy === property && this.props.order === 'desc') {
            order = 'asc';
        }
        const offset = 0;
        this.props.onSortingChange({ limit, offset, order, orderBy, page: 0 });
        this.setState({page: 0});
    };

    setPageAndRefetch = (page, sortObject) => {
        this.setState({ page }, () => {
            this.props.onSortingChange(sortObject);
        });
    }

    handleChangePage = (event, page) => {
        const { order, orderBy, limit } = this.props;
        const offset = page * limit;
        this.setPageAndRefetch(page, { limit, offset, order, orderBy, page });
    };

    handleChangeRowsPerPage = event => {
        const { order, orderBy } = this.props;
        const limit = parseInt(event.target.value, 10);
        const offset = 0;
        const page = 0;
        this.setPageAndRefetch(page, { limit, offset, order, orderBy, page });
    };

    handleClose = index => {
        //event handler for dropdown menu
        const { menus } = this.state;
        menus[index] = false;
        this.setState({ anchorEl: null, menus });
    };

    handleClick = (index, event) => {
        //event handler for dropdown menu
        const { menus } = this.state;
        menus[index] = true;
        this.setState({ anchorEl: event.currentTarget, menus });
    };

    selectAllHandler = (event) => {
        const { selectId, data } = this.props;
        const { page } = this.state;
        let selected = [];
        let itemsToRemoved = [];
        let numSelectedByPage = [...this.state.numSelectedByPage];

        if (event.target.checked) {
            selected = this.props.data.map(c => c[selectId]);
            selected = selected.concat(this.props.selected);
        } else {
            itemsToRemoved = _.map(data, selectId);
            selected = this.props.selected;
            _.pullAll(selected, itemsToRemoved);
        }
        numSelectedByPage[page] = event.target.checked ? data.length : 0;

        this.setState({ numSelectedByPage });
        this.props.updateSelected(_.uniq(selected));
    }

    renderTableHead() {
        const { data,
                order,
                orderBy,
                fields,
                contentType,
                includeActionColumn,
                selectable,
                selected,
                limit,
            } = this.props;
        const deletedRows = data.filter(datum => datum.isDeleted === true).length;
        return (
            <EnhancedTableHead
                includeActionMenu={includeActionColumn}
                order={order}
                orderBy={orderBy}
                contentType={contentType}
                sortLabelHandler={this.renderSortData}
                fields={fields}
                selectable={selectable}
                selectAllHandler={this.selectAllHandler}
                selected={selected}
                rowCount={data.length}
                deletedRows={deletedRows}
                limit={limit}
                page={this.state.page}
                numSelectedByPage={this.state.numSelectedByPage}
            />

        );
    }

    renderTableBody() {
        const { data,
                fields,
                contentType,
                menuFields,
                limit,
                includeActionColumn,
                selectId,
                selected,
                selectable,
                setContentUrlToPlay,
                fetchContent
            } = this.props;
        const {
            columns,
            anchorEl,
            menus
        } = this.state;
        return (
            <EnhancedTableBody
                fields={fields}
                includeActionMenu={includeActionColumn}
                contents={data}
                page={0} // always stay on the first page of the component, we are changing the content
                contentType={contentType}
                columns={columns}
                anchorEl={anchorEl}
                handleClose={this.handleClose}
                handleClickMore={this.handleClick}
                rowsPerPage={limit}
                menus={menus}
                menuFields={menuFields}
                selectable={selectable}
                selected={selected}
                selectId={selectId}
                handleCheckboxClicked={this.handleCheckboxClicked}
                setContentUrlToPlay={setContentUrlToPlay}
                fetchContent={fetchContent}
            />
        );
    }

    renderTableFooter() {
        const { limit, count } = this.props;
        const { page } = this.state;
        return (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        count={count}
                        rowsPerPage={limit}
                        page={page}
                        SelectProps={{
                            native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        );
    }

    renderEmptyTableBody(){
        const { limit, columns } = this.props;

        return (
            <TableBody>
                <TableRow style={{ height: 48 * limit }}>
                    <TableCell colSpan={columns}>
                        <Typography
                            variant='h2'
                            gutterBottom
                            className='text-center'
                        >
                            <FormattedMessage id={this.props.messageId} description='text' />
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }
    renderLoading(){
        const { limit, columns } = this.props;

        return(
            <TableBody>
                <TableRow style={{ height: 48 * limit }}>
                    <TableCell colSpan={columns}>
                        <Loading />
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }

    renderTableToolBar() {
        const { selected, onAddTagClick, handleContentDelete, addTag } = this.props;
        return (
            <EnhancedTableToolbar numSelected={selected.length}
                onAddTagClick={onAddTagClick}
                handleDelete={handleContentDelete}
                addTag={addTag}
            />
        );
    }

    render() {
        const { isLoading, count, selected } = this.props;
        return (
            <div className='pagination-table-component'>
                {selected && selected.length > 0 && this.renderTableToolBar()}
                <Table className='paginationTable'>
                    {this.renderTableHead()}
                    {isLoading && this.renderLoading()}
                    {!isLoading && count > 0 && this.renderTableBody()}
                    {!isLoading && count === 0 && this.renderEmptyTableBody()}
                    {this.renderTableFooter()}
                </Table>
            </div>
        );
    }
}


PaginationTable.defaultProps = {
    page:0,
    order: 'desc',
    orderBy: 'updated_at',
    limit: 10,
    offset: 0,
    columns: 8,
    data: [],
    includeActionColumn: true,
    fields: [],
    isLoading: true,
    count: 0,
    menuFields: [],
    selectable: false,
    selectId:'',
    addTag: true,
    selected: [],
    messageId:''
};

PaginationTable.propTypes = {
    page: PropTypes.number,
    columns: PropTypes.number.isRequired,
    contentType: PropTypes.string.isRequired,
    onSortingChange: PropTypes.func.isRequired,
    setContentUrlToPlay: PropTypes.func,
    onAddTagClick: PropTypes.func,
    handleContentDelete: PropTypes.func,
    selectable: PropTypes.bool,
    includeActionColumn: PropTypes.bool,
    fetchContent: PropTypes.func,
    addTag: PropTypes.bool,
    updateSelected: PropTypes.func,
    selected: PropTypes.array,
    isLoading: PropTypes.bool,
    messageId: PropTypes.string
};


export default PaginationTable;

import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

//material-ui'
import ButtonBase from '@material-ui/core/ButtonBase';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

class EnhancedTableHead extends Component {

    renderTableHeadCell(label, align, index, allowSort, width) {
        //contain sort handler and active status
        const { order, orderBy, contentType } = this.props;
        if (allowSort) {
            return (
                <TableCell
                    varient='head'
                    sortDirection={false}
                    align={align}
                    key={index}
                    className={'paginationTable-head label-' + align}
                    width={width}
                >
                    <ButtonBase
                        className='paginationTable-head-sortLabel'
                        onClick={() => this.props.sortLabelHandler(label)}
                    >
                        {
                            <FormattedMessage
                                id={ contentType + '.table.col.' + label}
                                description='table-head'
                            />
                        }
                        {orderBy === label && order === 'desc' && <ArrowDropDown />}
                        {orderBy === label && order === 'asc' && <ArrowDropUp />}
                        {orderBy !== label && <ArrowDropDown color='disabled' />}
                    </ButtonBase>
                </TableCell>
            );
        } else {
            return(
                <TableCell
                    varient='head'
                    align={align}
                    key={index}
                    className={'paginationTable-head label-' + align}
                    width={width}
                >
                    {
                        <FormattedMessage
                            id={ contentType + '.table.col.' + label}
                            description='table-head'
                        />
                    }
                </TableCell>
            );
        }

    }

    renderSelectBox() {
        const { selected, rowCount, deletedRows, limit, numSelectedByPage, page } = this.props;
        const isIndeterminate = selected.length > 0 && numSelectedByPage[page] > 0 && numSelectedByPage[page] < rowCount;
        const isChecked = rowCount > 0 && numSelectedByPage[page]=== rowCount;
        return <TableCell
            className={'paginationTable-head label-left checkbox-cell'}>
            <Checkbox
                className='paginationTable-head-checkbox'
                indeterminate={isIndeterminate}
                checked={isChecked}
                onClick={(event) => this.props.selectAllHandler(event)}
            />
        </TableCell>
    }

    render() {
        const { contentType, selectable } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {
                        selectable && this.renderSelectBox()
                    }
                    {
                        this.props.fields.map((field, index) => {
                            const label = field.name ? field.name : field.fieldName;
                            return this.renderTableHeadCell(label, field.alignment, index, field.allowSort, field.width)
                        })
                    }
                    {
                        this.props.includeActionMenu &&
                        <TableCell align='center' className='paginationTable-head'>
                        <FormattedMessage
                                id={contentType + '.table.col.actions'}
                                description='table-head'
                            />
                        </TableCell>
                    }

                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.defaultProps = {
    fields: [],
    includeActionMenu: true,
    order: 'desc',
    orderBy: 'updated_at',
    selectable: false,
    selected: [],
    rowCount: 10,
    deletedRows: 0,
}

EnhancedTableHead.propTypes = {
    contentType: PropTypes.string.isRequired,
    sortLabelHandler: PropTypes.func.isRequired,
    selectAllHandler: PropTypes.func,
    selected: PropTypes.array,
    rowCount: PropTypes.number,
    deletedRows: PropTypes.number,
    selectable: PropTypes.bool
}

export default EnhancedTableHead;

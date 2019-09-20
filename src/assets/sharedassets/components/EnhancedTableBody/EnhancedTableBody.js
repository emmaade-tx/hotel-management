import React, { Component } from 'react';

//external imports
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import _ from 'lodash';

//material-ui imports
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';
import { HighlightOffRounded } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

//imports from within the app
import './EnhancedTableBody.scss';
import { CONTENT_TYPE_LIVE } from '../../../../constants/constants.js';
import { renderModifiedTime, convertDurationToMin } from '../../../../helpers/helper.js';
import NoThumbnail from '../../images/no-thumbnail.jpg';

class EnhancedTableBody extends Component {

    handleMenuItemAction = (index, id, field) =>{
        this.props.handleClose(index)
        field.eventHandler(index, id)
    }

    handleBadgeEvent = (index, id) => {
        const previewAction = _.filter(this.props.menuFields, function(field) { return field.fieldName === 'preview'; });
        previewAction[0].eventHandler(index, id);
    }

    isSelected = (id) => {
        return this.props.selected.indexOf(id) !== -1;
    }

    loadNoThumbnailSrc = (ev) => {
        ev.target.src = NoThumbnail;
    }
    renderBadge(field, row, index){
        if (row.status === CONTENT_TYPE_LIVE){
            return (
                <div className={'live-class'}
                    onClick={() => this.handleBadgeEvent(index, row.id)}>
                    {row[field.fieldName]}
                </div>
            )
        } else {
            return (
                <div className={'stand-by-class'}>
                    {row[field.fieldName]}
                </div>
            )
        }
    }
    renderRowFirstCell(field, row, index) {
        const showCellField = () => {
            if (field.hasBadge) {
                return this.renderBadge(field, row, index);
            } else {
                return this.renderCellContent(row[field.fieldName], field.truncate);
            }
        }
        return (
            <TableCell
                className={this.props.selectable ? '' : 'paginationTable-left-cell'}
                varient='body'
                align={field.alignment}
                component='th'
                scope='row'
                key={index}
            >
               { showCellField() }
            </TableCell>
        )

    }

    renderSelectBox(row) {
        const { selectId } = this.props;
        const isSelected = this.isSelected(row[selectId]);
        return (
            <TableCell className='paginationTable-left-cell' variant='body' component='td'
                scope='row' align='left'>
                <Checkbox
                    disabled ={row.isDeleted}
                    checked={isSelected}
                    className={'paginationTable-checkbox-cell'}
                    onClick={event => this.props.handleCheckboxClicked(event, row[selectId])}
                />
            </TableCell>
        )
    }

    renderCellContent(fieldValue, truncate) {
        const maxChar = 75;
        if (_.isNil(truncate) || (truncate && _.isNil(fieldValue))){
            return fieldValue;
        } else if (typeof fieldValue !== 'string'){
            return fieldValue;
        } else if (fieldValue.length < maxChar) {
            return fieldValue;
        } else {
            return (fieldValue.substring(0,maxChar) + '...');
        }
    }

    renderCell(field, row, index) {
        let textTransform = !field.isCapitalize ? 'paginationTable-text-transform' : '';
        let preWrap = field.isPreWrap ? 'paginationTable-pre-wrap' : '';
        let deletedRow = row.isDeleted ? 'deleted-row' : '';
        let cellClassName = textTransform + ' ' + preWrap + ' ' + deletedRow;
        return (
            <TableCell className={cellClassName} varient='body' align={field.alignment} key={index}>
                {
                    field.isThumbnail && this.renderThumbnail(row[field.fieldName], row['renditions'], row['isDeleted'], row['transcode_status'])
                }
                {
                    field.hasBadge && this.props.selectable && this.renderBadge(field, row, index)
                }
                {
                    field.isDuration && !field.isDate &&
                    convertDurationToMin(row[field.fieldName])
                }
                {
                    field.isDate && !field.isDuration &&
                    renderModifiedTime(row[field.fieldName])
                }
                {/* TO INCLUDE HARD CODED STRINGS */}
                {
                    field.isHardcoded && field.hardcodedName
                }
                {
                    field.isLink && this.renderTitle(row[field.fieldName], row)
                }
                {
                    !field.isDate && !field.isDuration && !field.isThumbnail && !field.isHardcoded && !field.isLink && !field.hasBadge &&
                    this.renderCellContent(row[field.fieldName], field.truncate)
                }
            </TableCell>
        )
    }

    renderThumbnail(thumbnail, renditions, isDeleted, transcodeStatus) {

        const url = thumbnail
                        ? isDeleted? NoThumbnail : thumbnail
                        : '';
        const videoURL = renditions && renditions[0]['url'] ? renditions[0]['url'] : null;
        switch (transcodeStatus) {
            case 50:
                    return (
                        <div>
                            {
                                isDeleted
                                ?
                                <div className={'video-thumbail-container-deleted'}>
                                    <Tooltip
                                        title={this.props.intl.formatMessage({
                                            id: 'video.thumbnail.message.if.deleted'
                                        })}
                                        placement='top'>
                                            <div>
                                                <img
                                                    src={url}
                                                    className='thumbnail-image'
                                                    alt='No Thumbnail'
                                                    onError={this.loadNoThumbnailSrc}
                                                />
                                                <div className={'thumbnail-deleted-overlay'}></div>
                                            </div>
                                    </Tooltip>
                                </div>
                                :
                                <div className='preview-thumbnail-container-loading'>
                                    <Tooltip
                                        title={this.props.intl.formatMessage({
                                            id: 'video.thumbnail.transcoding.progress'
                                        })}
                                        placement='top'>
                                            <CircularProgress className='thumbnail-loading-icon' size={24} />
                                    </Tooltip>
                                </div>
                            }
                        </div>
                    );
            case 900:
            case 901:
                    return (
                        <div className='preview-thumbnail-container-error'>
                          <Tooltip title={isDeleted
                                              ? this.props.intl.formatMessage({
                                                  id: 'video.thumbnail.message.if.deleted'
                                                })
                                              : this.props.intl.formatMessage({
                                                  id: 'video.thumbnail.transcoding.failed'
                                                })
                                        }
                                  placement='top'>
                            <HighlightOffRounded className='highlightoff-icon' color='error' />
                          </Tooltip>
                        </div>
                    );
            default:
                    return (
                        <div
                            className={ 'video-thumbail-container' + (isDeleted ? '-deleted' : '') }
                            onClick={ !isDeleted ? () => this.props.setContentUrlToPlay(videoURL) : null }
                        >
                            <Tooltip
                                title={
                                    isDeleted ?
                                        this.props.intl.formatMessage({
                                            id: 'video.thumbnail.message.if.deleted',
                                        })
                                    : ''
                                }
                                placement='top'>
                                    <div>
                                        <img
                                            src={url}
                                            className='thumbnail-image'
                                            alt='No Thumbnail'
                                            onError={this.loadNoThumbnailSrc}
                                        />
                                        <div className={!isDeleted ? 'thumbnail-overlay': 'thumbnail-deleted-overlay'}></div>
                                        <PlayIcon color='primary' className='play-icon' />
                                    </div>
                            </Tooltip>
                        </div>
                );
        }
    }

    renderTitle(title, rowBody) {
        const isDeleted = rowBody.isDeleted;
        const {fetchContent, selectId} = this.props;
        return (
            <p
                onClick={!isDeleted ? () => fetchContent(rowBody[selectId]) : null}
                className={isDeleted ? '' : 'video-title'}
            >
                {title}
            </p>
        )
    }

    renderActionCell(rowIndex, row){
        const { anchorEl } = this.props;
        return(
            <TableCell
                className='paginationTable-right-cell action-cells'
                varient='body'
                align='center'
            >
                <IconButton
                    aria-owns={
                        anchorEl
                            ? 'action-menu-' + rowIndex
                            : undefined
                    }
                    aria-haspopup='true'
                    onClick={ (event) => this.props.handleClickMore(rowIndex, event)}
                >
                    <MoreHoriz />
                </IconButton>
                {
                    this.renderTableMenu(rowIndex, row.id, row.name)
                }
            </TableCell>
        )

    }
    renderMenuItemWithLink(index, field, id, rowIndex) {
        if (field.fieldName.toLowerCase() === 'edit') {
            return (
                <Link key={rowIndex} to={'/' + this.props.contentType + '/' + id}>
                    <MenuItem key={rowIndex}>
                        <FormattedMessage
                            id={this.props.contentType + '.table.actions.edit'}
                            description='menu-actions'
                        />
                    </MenuItem>
                </Link>
            )
        }

    }
    renderMenuItemWithHandler(index, field, id, rowIndex) {
        return(
            <MenuItem key={rowIndex}
                onClick={ () => this.handleMenuItemAction(index, id, field)}
            >
                <FormattedMessage
                    id={this.props.contentType + '.table.actions.' + field.fieldName}
                    description='menu-actions'
                />
            </MenuItem>
        )
    }

    renderTableMenu(index, id, name) {
        const {
            anchorEl,
            menus,
            menuFields
        } = this.props;
        const open = (menus.length > 0) ? (_.isNil(menus[index]) ? false : menus[index]): false
        return(
            <Menu
                id={'action-menu-' + index}
                className='dropdown-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={() => this.props.handleClose(index)}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {
                    menuFields.map((field, rowIndex) => {
                        if (!field.isLink) {
                            return this.renderMenuItemWithHandler(index, field, id, rowIndex)
                        } else {
                            return this.renderMenuItemWithLink(index, field, id, rowIndex)
                        }
                    })
                }

            </Menu>
        )
    }

    renderTableRow(row, rowIndex) {
        const { fields, selectable, selectId } = this.props;
        if (selectable) {
            const isSelected = this.isSelected(row[selectId]);
            return (
                <TableRow key={rowIndex}
                    hover={false}
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                    className={'selectableTableRow' + (isSelected ? '-selected': '')} >
                    {
                        this.renderSelectBox(row)
                    }
                    {
                        fields.map((field, index) => {
                            return this.renderCell(field, row, index)
                        })
                    }
                    {
                        this.props.includeActionMenu && this.renderActionCell(rowIndex, row)
                    }

                </TableRow>
            )
        }
        else {
            return (
                <TableRow key={rowIndex}>
                    {
                        fields.map((field, index) => {
                            if (index === 0) {
                                return this.renderRowFirstCell(field, row, index)
                            } else {
                                return this.renderCell(field, row, index)
                            }
                        })
                    }
                    {
                        this.props.includeActionMenu && this.renderActionCell(rowIndex, row)
                    }

                </TableRow>
            )
        }


    }

    render() {
        const { rowsPerPage, page, contents, columns } = this.props;

        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, contents.length - page * rowsPerPage);

       return(
            <TableBody>
                {contents
                    .map((row, index) => (
                        this.renderTableRow(row, index)
                    ))
                }
                {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={columns} />
                    </TableRow>
                )}
            </TableBody>
        );
    }
}

EnhancedTableBody.defaultProps = {
    fields: [],
    includeActionMenu: true,
    contents: [],
    menuFields: [],
    selectId: '',
    selected:[],
    menus:[]
}

EnhancedTableBody.propTypes = {
    contentType: PropTypes.string.isRequired,
    handleCheckboxClicked: PropTypes.func,
    setContentUrlToPlay: PropTypes.func,
    fetchContent: PropTypes.func,
    selectable: PropTypes.bool.isRequired,
    selectId: PropTypes.string,
    selected: PropTypes.array
}

export default injectIntl(EnhancedTableBody)

import React, { Component } from 'react';
import './EnhancedTableToolbar.scss';

//material ui imports
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';

import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

class EnhancedTableToolbar extends Component {
    renderActions() {
        return (
            <div>
                {
                    this.props.addTag &&
                    <Tooltip
                        title={this.props.intl.formatMessage({
                            id: 'video.add.tags.text',
                            defaultMessage: 'default.empty.string'
                        })}
                    >
                        <IconButton
                            aria-label='Tags'
                            onClick={(event) => this.props.onAddTagClick(event)}
                        >
                            <LabelIcon className='actionIcon' />
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip
                    title={this.props.intl.formatMessage({
                        id: 'toolbar.actions.delete',
                    })}
                >
                    <IconButton
                        aria-label='Delete'
                        onClick={() => {
                            this.props.handleDelete(true)
                        }}
                    >
                        <DeleteIcon className='actionIcon' />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
    render() {
        const { numSelected } = this.props;
        return (
            <Toolbar
                className={
                    'enhanced-toolbar-root' +
                    (numSelected > 0 ? '-highlight' : '')
                }
            >
                <div className='title'>
                    {numSelected > 0 ? (
                        <Typography color='inherit' variant='subtitle1'>
                            <FormattedMessage
                                id='toolbar.selected.number'
                                values={{ num: numSelected }}
                                description='text'
                            />
                        </Typography>
                    ) : (
                        ''
                    )}
                </div>
                <div className='spacer' />
                <div className='actions'>
                    {numSelected > 0 ? this.renderActions() : ''}
                </div>
            </Toolbar>
        )
    }
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    addTag: PropTypes.bool.isRequired,
    onAddTagClick: function(props, propName, componentName) {
        if (
            props['addTag'] &&
            (props[propName] == undefined ||
                typeof props[propName] != 'function')
        ) {
            return new Error('Please provide a onAddTagClick function!')
        }
    },
    handleDelete: PropTypes.func.isRequired,
}

export default injectIntl(EnhancedTableToolbar);

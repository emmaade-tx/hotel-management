import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import './ModalContainer.scss';
import _ from 'lodash';
//material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

class ModalContainer extends Component {
    renderModalHeader () {
        const {
            modalHeader,
            handleCancel,
            includeCloseBtn,
            closeBtnDisabled,
            tooltipMessage
        } = this.props;
        return (
            <React.Fragment>
                <DialogTitle disableTypography className='modal-header'>
                    <Typography variant='h6' className='modal-title'>
                        <FormattedMessage
                            id={modalHeader}
                            description='text'
                        />
                    </Typography>
                    {
                        includeCloseBtn &&
                        <Tooltip
                            title={
                                tooltipMessage &&
                                this.props.intl.formatMessage({ id: tooltipMessage })
                            }
                            placement='top'>
                            <span>
                                <IconButton disabled={closeBtnDisabled} aria-label='Close' onClick={handleCancel}>
                                  <Close />
                                </IconButton>
                            </span>
                        </Tooltip>
                    }
                </DialogTitle>
            </React.Fragment>
        );
    }

    renderModalFooter () {
        const {
            buttonLeft,
            buttonCentre,
            buttonRight,
            handleCancel,
            handleContinue,
            handleCentreBtnAction,
            isButtonRightDisabled
        } = this.props;

        return (
            <DialogActions className='modal-footer'>
                <Button onClick={handleCancel} size='medium' variant='outlined' color='secondary'>
                    <FormattedMessage
                        id={buttonLeft}
                        description='btn-text'
                    />
                </Button>
                {!_.isEmpty(buttonCentre) &&
                <Button onClick={handleCentreBtnAction} size='medium' color='secondary' variant='contained'>
                    <FormattedMessage
                        id={buttonCentre}
                        description='btn-text'
                    />
                </Button>
                }
                <Button disabled={isButtonRightDisabled} onClick={handleContinue} color='secondary' size='medium' variant='contained'>
                    <FormattedMessage
                        id={buttonRight}
                        description='btn-text'
                    />
                </Button>
            </DialogActions>
        );
    }

    render () {
        const {
            includeModalHeader,
            includeModalFooter,
            fullScreen,
            fullWidth,
            maxWidth,
            className,
            open,
            handleCancel,
            children,
            disableBackdropClick
        } = this.props;
        return (
            <Dialog
                onClose={handleCancel}
                aria-labelledby='customized-dialog-title'
                open={open}
                className={'default-modal ' + className}
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                PaperProps={{className: 'modal-content-grid'}}
                disableBackdropClick={disableBackdropClick}
            >
                {includeModalHeader && this.renderModalHeader()}
                <div className='modal-content'>
                    {children}
                </div>
                {includeModalFooter && this.renderModalFooter()}
            </Dialog>
        );
    }
}

ModalContainer.propTypes = {
    includeModalHeader: PropTypes.bool.isRequired,
    includeModalFooter: PropTypes.bool.isRequired,
    handleCentreBtnAction: PropTypes.func,
    handleContinue: PropTypes.func,
    handleCancel: PropTypes.func,
    open: PropTypes.bool.isRequired,
    disableBackdropClick: PropTypes.bool,
    className: PropTypes.string,
    fullScreen: PropTypes.bool,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string
};

ModalContainer.defaultProps = {
    includeModalHeader: true,
    includeModalFooter: true,
    open: false,
    fullScreen: false,
    fullWidth: false,
    maxWidth: 'sm',
    className: '',
    includeCloseBtn: false,
    closeBtnDisabled: false,
    tooltipMessage: '',
    disableBackdropClick: false,
    isButtonRightDisabled: false
};

export default injectIntl(ModalContainer);

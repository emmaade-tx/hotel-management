import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
//material-ui
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeNotification } from '../../../../actions/NotificationActions';

const styles = theme => ({
    success: {
        backgroundColor: '#97CE60'
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

class NotificationSnackbar extends React.Component {
    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        //dispatch an action
        this.props.actions.closeNotification();
    };

    render() {
        const {
            open,
            classes,
            anchorOriginVertical,
            anchorOriginHorizontal,
            className,
            message,
            variant
        } = this.props;
        const Icon = variantIcon[variant];

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: anchorOriginVertical,
                        horizontal: anchorOriginHorizontal
                    }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={this.handleCloseSnackbar}
                >
                    <SnackbarContent
                        className={classNames(classes[variant], className)}
                        aria-describedby='client-snackbar'
                        message={
                            <span
                                id='client-snackbar'
                                className={classes.message}
                            >
                                <Icon
                                    className={classNames(
                                        classes.icon,
                                        classes.iconVariant
                                    )}
                                />
                                {message}
                            </span>
                        }
                    />
                </Snackbar>
            </div>
        );
    }
}

NotificationSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
        .isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    anchorOriginVertical: PropTypes.string,
    anchorOriginHorizontal: PropTypes.string
};

NotificationSnackbar.defaultProps = {
    variant: 'info',
    open: false,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'right'
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                closeNotification
            },
            dispatch
        )
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(NotificationSnackbar));

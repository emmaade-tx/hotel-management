import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

//material-ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { SearchField } from '../../../../components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './TabHeader.scss';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    indicator: {
        backgroundColor: 'transparent'
    },
    tabsRoot: {
        backgroundColor: 'transparent'
    },
    tabRoot: {
        textTransform: 'initial',
        fontSize: '16px',
        opacity: 1,
        minWidth: '91px',
        maxWidth: '91px',
        padding: '0',
        '&:hover': {
            background: '#5B3FD1',
            color: 'white',
            opacity: 1
        },
        '&$tabSelected': {
            color: 'white',
            '&:hover': {
                color: 'white',
                opacity: 1
            },
            '&:focus': {
                color: 'white'
            }
        }
    },
    tabSelected: {},
    labelContainer: {
        padding: '0'
    }
});

function LinkTab(props) {
    return <FormattedMessage id={props.message}>
        {(labelstr)=>
            (<Tab
                component='a'
                icon={props.icon}
                onClick={event => event.preventDefault()} {...props} label={labelstr}
                />
            )
        }
    </FormattedMessage>
}

class TabHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
           selectedValue: this.props.intl.formatMessage({id: 'tabHeader.subHeader.producerFilter.default'})
        };
    }

    handleChange = (e, value) => {
        this.props.onChange(e, value);
    };

    handleDropdown = (e, value) => {
        this.props.filters(value.key);
        this.setState({ selectedValue: e.target.value });
    };

    render(){
        const { classes, value, tabsName, className } = this.props;
        return (
            <div id='tab-sub-header' className={className}>
                <AppBar style={{background: 'transparent', boxShadow: 'none'}} position='static'>
                    <Tabs
                        indicatorColor='primary'
                        classes={{root: classes.tabsRoot, indicator: classes.indicator}}
                        value={value}
                        onChange={this.handleChange}
                    >
                        {
                            tabsName.map((item, key) =>
                                <LinkTab
                                    key={key}
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected,
                                        labelContainer: classes.labelContainer
                                    }}
                                    disableRipple
                                    message={item.name}
                                    icon={item.icon}
                                />
                            )
                        }
                    </Tabs>
                </AppBar>
                {/* div to hold filters and search */}
                <div id='tab-header-filters'>
                    { value === 0 && this.renderField() }
                </div>
            </div>
        )
    }

    renderField () {

        const {filterValues, showSearch, search} = this.props;

        return (
            <React.Fragment>
                {filterValues &&
                <Select
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        },
                        getContentAnchorEl: null,
                        className: 'select-menu-popover'
                    }}
                    inputProps={{
                        className: 'select-menu-display'
                    }}

                    disableUnderline={true}
                    value={this.state.selectedValue}
                    onChange={this.handleDropdown}
                    className={filterValues.greyFilter ? 'tabHeader-grey-producer' : 'tabHeader-producer'}
                >
                    <MenuItem value={this.props.intl.formatMessage({id: 'tabHeader.subHeader.producerFilter.default'})}>
                        {this.props.intl.formatMessage({id: 'tabHeader.subHeader.producerFilter.default'})}
                    </MenuItem>
                    {filterValues.filterOptions ? filterValues.filterOptions.map((option) => <MenuItem
                        key={option.id} value={option.name}>{option.name}</MenuItem>) : ''}
                    }
                </Select>
                }
                {showSearch &&
                <SearchField
                    search={search}
                    placeholder={this.props.intl.formatMessage({id: 'tabHeader.subHeader.search.default'})}
                />
                }
            </React.Fragment>);
    }
}

TabHeader.propTypes = {
    tabsName: PropTypes.array,
    handleSearch: PropTypes.func,
    handleFilters: PropTypes.func,
    filterValues: PropTypes.object,
    showSearch: PropTypes.bool,
    value: PropTypes.number.isRequired,
    className: PropTypes.string
};

TabHeader.defaultProps = {
    tabsName: [],
    value: 0,
    showSearch: true,
    search: '',
    className: ''
};

export default injectIntl(withStyles(styles)(TabHeader));

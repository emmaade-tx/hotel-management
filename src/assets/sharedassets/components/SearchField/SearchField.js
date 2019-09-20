import React, { Component } from 'react';
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Search } from '@material-ui/icons';
import _ from 'lodash';
import './SearchField.scss'

class SearchField extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
            type: ''
        }

        this.emitSearchDebounced = _.debounce(this.handleSearchClick, 1000);
    }

    componentWillMount(){
        const { searchValue } = this.props;
        if(searchValue){
            this.setState({ searchValue });
        }
    }

    componentWillUnmount() {
        this.emitSearchDebounced.cancel();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.type !== this.state.type) {
            this.setState({type: nextProps.type, searchValue: ''});
        }
        return true;
    }

    handleSearchClick = (value, event) => {
        if (value.length > 2 || value.length === 0) {
            this.props.search(value);
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        event.persist();
        this.emitSearchDebounced(event.target.value, event);
    }

    handleKeyPress = event => {
        if (!event) return
        if (event.key === 'Enter') {
            this.emitSearchDebounced.cancel();
            this.props.search(this.state.searchValue)
        }
    }

    render() {
        return (
            <TextField
                margin='normal'
                className='inputField search-field'
                placeholder={this.props.placeholder}
                variant='outlined'
                value={this.state.searchValue}
                onChange={this.handleChange('searchValue')}
                onKeyPress={this.handleKeyPress}
                InputProps={{
                    className: 'inputFieldProps',
                    endAdornment: <InputAdornment position='end'>
                        <IconButton aria-label='Search' onClick={() => this.props.search(this.state.searchValue)}>
                            <Search />
                        </IconButton>
                    </InputAdornment>
                }}
            />
        )
    }
}
SearchField.defaultProps = {
    type: '',
    searchValue: ''
}

SearchField.propTypes = {
    search: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    searchValue: PropTypes.string
}

export default SearchField;

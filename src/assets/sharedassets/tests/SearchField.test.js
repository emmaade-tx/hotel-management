import React from 'react';
import { IntlProvider } from 'react-intl';
import SearchField from '../components/SearchField/SearchField';
import messages_en from '../../../translation/en.json';
import { mount } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

// declare messages
const messages = {
    en: messages_en
};

describe('SearchField', () => {
    it('renders correctly', () => {
        const props = {
            placeholder: 'segments.subHeader.search.default',
            search: jest.fn()
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <SearchField {...props} />
            </IntlProvider>
        );
        expect(component.find('SearchField').exists()).toBeTruthy();
        expect(component.find('SearchField').prop('placeholder')).toBe(
            'segments.subHeader.search.default'
        );
        expect(component.find('TextField').exists()).toBeTruthy();
        expect(component.find('FormControl').exists()).toBeTruthy();
        expect(component.find('FormControl').prop('className')).toBe(
            'inputField search-field'
        );
        expect(component.find('SearchIcon').exists()).toBeTruthy();
    });

    it('should call search prop with on clicking the search icon', () => {
        const onSearchMock = jest.fn();
        const props = {
            placeholder: 'segments.subHeader.search.default',
            search: onSearchMock
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <SearchField {...props} />
            </IntlProvider>
        );

        component.find('TextField').simulate('change', { target: { value: 'matched' } });
        expect(onSearchMock).not.toHaveBeenCalled();
        component.find('IconButton').simulate('click');
        expect(onSearchMock).toHaveBeenCalledTimes(1);
    });

    it('should call search prop when enter is pressed on textfield', () => {
        const onSearchMock = jest.fn();
        const props = {
            placeholder: 'segments.subHeader.search.default',
            search: onSearchMock
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <SearchField {...props} />
            </IntlProvider>
        );

        component.find('TextField').simulate('keypress', { key: 'Enter' });
        expect(onSearchMock).toHaveBeenCalledTimes(1);
    });
});

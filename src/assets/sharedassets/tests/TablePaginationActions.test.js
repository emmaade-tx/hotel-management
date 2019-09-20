import React from 'react';
import { IntlProvider } from 'react-intl';
import TablePaginationActions from '../components/TablePaginationActions/TablePaginationActions';
import messages_en from '../../../translation/en.json';
import { mount } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

// declare messages
const messages = {
    en: messages_en
};

describe('TablePaginationActions', () => {
    it('renders correctly', () => {
        const props = {
            count: 0,
            onChangePage: jest.fn(),
            page: 0,
            rowsPerPage:0
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <TablePaginationActions {...props} />
            </IntlProvider>
        );
        expect(component.find('TablePaginationActions').exists()).toBeTruthy();
        expect(component.find('IconButton')).toHaveLength(4);
        expect(component.find('FirstPageIcon').closest('IconButton').prop('disabled')).toBe(true);
        expect(component.find('KeyboardArrowLeftIcon').closest('IconButton').prop('disabled')).toBe(true);
        expect(component.find('KeyboardArrowRightIcon').closest('IconButton').prop('disabled')).toBe(false);
        expect(component.find('LastPageIcon').closest('IconButton').prop('disabled')).toBe(false);
    });

    it('onChangePage function is trigged every time a button is clicked', () => {
        const onChangePageMock = jest.fn();
        const props = {
            count: 0,
            onChangePage: onChangePageMock,
            page: 0,
            rowsPerPage:0
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <TablePaginationActions {...props} />
            </IntlProvider>
        );

        component.find('FirstPageIcon').closest('IconButton').simulate('click');
        //button is disabled
        expect(onChangePageMock).toHaveBeenCalledTimes(0);

        component.find('KeyboardArrowLeftIcon').closest('IconButton').simulate('click');
        //button is disabled
        expect(onChangePageMock).toHaveBeenCalledTimes(0);

        component.find('KeyboardArrowRightIcon').closest('IconButton').simulate('click');
        expect(onChangePageMock).toHaveBeenCalledTimes(1);

        component.find('LastPageIcon').closest('IconButton').simulate('click');
        expect(onChangePageMock).toHaveBeenCalledTimes(2);

    });

    it('renders correctly based on the props', () => {
        const props = {
            count: 15,
            onChangePage: jest.fn(),
            page: 1,
            rowsPerPage:10
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <TablePaginationActions {...props} />
            </IntlProvider>
        );
        expect(component.find('TablePaginationActions').exists()).toBeTruthy();
        expect(component.find('IconButton')).toHaveLength(4);
        expect(component.find('FirstPageIcon').closest('IconButton').prop('disabled')).toBe(false);
        expect(component.find('KeyboardArrowLeftIcon').closest('IconButton').prop('disabled')).toBe(false);
        expect(component.find('KeyboardArrowRightIcon').closest('IconButton').prop('disabled')).toBe(true);
        expect(component.find('LastPageIcon').closest('IconButton').prop('disabled')).toBe(true);

        const newProps = {
            ...props,
            page: 0
        }

        component.setProps({
            children: (
                <TablePaginationActions {...newProps}/>
            )
        });

        //changes will be reflected if we call find again
        expect(component.find('FirstPageIcon').closest('IconButton').prop('disabled')).toBe(true);
        expect(component.find('KeyboardArrowLeftIcon').closest('IconButton').prop('disabled')).toBe(true);
        expect(component.find('KeyboardArrowRightIcon').closest('IconButton').prop('disabled')).toBe(false);
        expect(component.find('LastPageIcon').closest('IconButton').prop('disabled')).toBe(false);
    });
});

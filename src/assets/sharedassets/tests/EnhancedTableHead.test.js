import React from 'react';
import { IntlProvider } from 'react-intl';
import EnhancedTableHead from '../components/EnhancedTableHead/EnhancedTableHead';
import messages_en from '../../../translation/en.json';
import { mount } from 'enzyme';
import helperFactory from './factory/helperFactory';


// declare messages
const messages = {
    en: messages_en
};

describe('EnhancedTableHead', () => {
    beforeEach(() => {
        //suppressing all the console.error coming from FormattedMessage if our translation file does not contain certain strings as the file changes in different projects
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders correctly', () => {
        const props = {
            contentType: 'test',
            sortLabelHandler: jest.fn()
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableHead {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableHead').exists()).toBeTruthy();
        expect(component.find('FormattedMessage').prop('id')).toEqual('test.table.col.actions');
        expect(component.find('Checkbox').exists()).toBeFalsy();
    });
    it('should not display sort label if the config is false', () => {
        const props = {
            contentType: 'test',
            sortLabelHandler: jest.fn(),
            fields: helperFactory.tableFields
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableHead {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableHead').exists()).toBeTruthy();
        expect(component.find('.paginationTable-head-sortLabel').exists()).toBeFalsy();
        expect(component.find('ArrowDropDownIcon')).toHaveLength(0);
        expect(component.find('ArrowDropUpIcon')).toHaveLength(0);
    });

    it('should call sortLabelHandler function prop with on clicking the sort label', () => {
        const sortLabelHandlerMock = jest.fn();
        const props = {
            contentType: 'test',
            sortLabelHandler: sortLabelHandlerMock,
            fields: helperFactory.sortableTableFields
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableHead {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableHead').exists()).toBeTruthy();
        expect(component.find('.paginationTable-head-sortLabel').exists()).toBeTruthy();
        expect(component.find('ArrowDropDownIcon')).toHaveLength(1);
        expect(component.find('ArrowDropUpIcon')).toHaveLength(0);

        component.find('ButtonBase').simulate('click');
        expect(sortLabelHandlerMock).toHaveBeenCalledTimes(1);

        const newProps = {...props, order: 'asc'};
        component.setProps({
          children: (
            <EnhancedTableHead {...newProps}/>
          )
        });

        //changes will be reflected if we call find again
        const newComponent = component.find('.paginationTable-head-sortLabel');
        expect(newComponent.find('ArrowDropDownIcon')).toHaveLength(0);
        expect(newComponent.find('ArrowDropUpIcon')).toHaveLength(1);
    });

    it('should call selectAllHandler function prop with on clicking checkbox', () => {
        const sortLabelHandlerMock = jest.fn();
        const selectAllHandlerMock = jest.fn();
        const props = {
            contentType: 'test',
            sortLabelHandler: sortLabelHandlerMock,
            selectAllHandler: selectAllHandlerMock,
            selectable: true,
            page:0,
            numSelectedByPage: [1],
            fields: helperFactory.sortableTableFields
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableHead {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableHead').exists()).toBeTruthy();
        expect(component.find('.paginationTable-head-sortLabel').exists()).toBeTruthy();
        expect(component.find('Checkbox').exists()).toBeTruthy();
        expect(component.find('Checkbox').prop('checked')).toBe(false);
        expect(component.find('Checkbox').prop('indeterminate')).toBe(false);

        component.find('Checkbox').simulate('click');
        expect(selectAllHandlerMock).toHaveBeenCalledTimes(1);
        const newProps = {
            ...props,
            selected: new Array(10),
            rowCount: 10,
            numSelectedByPage: [10]
        };
        component.setProps({
          children: (
            <EnhancedTableHead {...newProps}/>
          )
        });
        //changes will be reflected if we call find again
        const newComponent = component.find('.checkbox-cell');
        expect(newComponent.find('Checkbox').prop('checked')).toBe(true);
        expect(newComponent.find('Checkbox').prop('indeterminate')).toBe(false);
    });
});

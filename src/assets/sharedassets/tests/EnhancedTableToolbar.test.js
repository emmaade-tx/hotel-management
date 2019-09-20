import React from 'react';
import { IntlProvider } from 'react-intl';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar/EnhancedTableToolbar';
import messages_en from '../../../translation/en.json';
import { mount } from 'enzyme';

import { createMount } from '@material-ui/core/test-utils';

// declare messages
const messages = {
    en: messages_en
};

describe('EnhancedTableToolbar', () => {
    it('renders correctly', () => {
        const props = {
            numSelected: 0,
            handleDelete: jest.fn(),
            addTag: false
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableToolbar {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableToolbar').exists()).toBeTruthy();
        expect(component.find('.enhanced-toolbar-root-highlight').exists()).toBeFalsy();
        expect(component.find('.actions')).toEqual({});
        expect(component.find('.title')).toEqual({});
    });

    it('should call handleDelete function prop with on clicking the delete icon', () => {
        const handleDeleteMock = jest.fn();
        const props = {
            numSelected: 1,
            handleDelete: handleDeleteMock,
            addTag: false
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableToolbar {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableToolbar').exists()).toBeTruthy();
        expect(component.find('.enhanced-toolbar-root-highlight').exists()).toBeTruthy();
        //actions div
        expect(component.find('.actions').equals({})).toBe(false);
        expect(component.find('LabelIcon')).toHaveLength(0);
        expect(component.find('DeleteIcon')).toHaveLength(1);
        expect(component.find('Tooltip').prop('title')).toEqual(messages['en']['toolbar.actions.delete']);
        component.find('IconButton').simulate('click');
        expect(handleDeleteMock).toHaveBeenCalledTimes(1);

        //title div
        const titleComponent = component.find('.title');
        expect(titleComponent.equals({})).toBe(false);
        expect(titleComponent.find('FormattedMessage')).toHaveLength(1);
    });

    it('should call onAddTagClick function prop with on clicking the ad tag icon', () => {
        const handleDeleteMock = jest.fn();
        const onAddTagClickMock = jest.fn();
        const mockedEvent = { stopPropagation: jest.fn() };
        const props = {
            numSelected: 1,
            handleDelete: handleDeleteMock,
            addTag: true,
            onAddTagClick: onAddTagClickMock
        };
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <EnhancedTableToolbar {...props} />
            </IntlProvider>
        );

        expect(component.find('EnhancedTableToolbar').exists()).toBeTruthy();
        expect(component.find('.enhanced-toolbar-root-highlight').exists()).toBeTruthy();

        //actions div
        expect(component.find('.actions').equals({})).toBe(false);
        expect(component.find('LabelIcon')).toHaveLength(1);
        expect(component.find('DeleteIcon')).toHaveLength(1);
        expect(component.find('Tooltip')).toHaveLength(2);
        expect(onAddTagClickMock).toHaveBeenCalledTimes(0);
        component.find('IconButton').at(0).simulate('click', mockedEvent);
        expect(handleDeleteMock).toHaveBeenCalledTimes(0);
        expect(onAddTagClickMock).toHaveBeenCalledTimes(1);

        //title div
        const titleComponent = component.find('.title');
        expect(titleComponent.equals({})).toBe(false);
        expect(titleComponent.find('FormattedMessage')).toHaveLength(1);
    });
});

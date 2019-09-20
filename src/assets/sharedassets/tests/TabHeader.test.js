import { IntlProvider } from 'react-intl';
import React from 'react';
import { mount } from 'enzyme';
import TabHeader from '../components/TabHeader/TabHeader';
import messages_en from '../../../translation/en.json';

const messages = {
    en: messages_en
};

describe('TabHeader test', () => {
    beforeEach(() => {
        //suppressing all the console.error coming from FormattedMessage if our translation file does not contain certain strings as the file changes in different projects
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders correctly when value is 0', () => {
        const props = {
            filterValues: { id: 'Test', name: 'test' },
            search: jest.fn()
        };
        const component = mount(
            <IntlProvider locale="en" messages={messages['en']}>
                <TabHeader {...props} />
            </IntlProvider>
        );

        const tabHeader = component.find('TabHeader');
        expect(tabHeader).toHaveLength(1);

        expect(
            component
                .find('div')
                .at(0)
                .prop('id')
        ).toBe('tab-sub-header');
        expect(component.find('AppBar').exists()).toBeTruthy();
        expect(component.find('Paper').exists()).toBeTruthy();
        expect(component.find('Tabs').exists()).toBeTruthy();
        expect(component.find('EventListener').exists()).toBeTruthy();
        expect(component.find('TabIndicator').exists()).toBeTruthy();

        const select = component.find('Select');
        expect(select.exists()).toBeTruthy();

        expect(component.find('Input').exists()).toBeTruthy();
        expect(component.find('InputBase').exists()).toBeTruthy();
        expect(component.find('SelectInput').exists()).toBeTruthy();
        expect(component.find('ArrowDropDown').exists()).toBeTruthy();
        expect(component.find('Menu').exists()).toBeTruthy();
        expect(component.find('Menu').prop('className')).toBe(
            'select-menu-popover'
        );
        expect(component.find('Modal').prop('className')).toBe(
            'select-menu-popover'
        );

        expect(component.find('SearchField').exists()).toBeTruthy();
        expect(component.find('SearchField').prop('placeholder')).toBe(
            'Search...'
        );
        expect(component.find('TextField').exists()).toBeTruthy();
        expect(component.find('FormControl').exists()).toBeTruthy();
        expect(component.find('FormControl').prop('className')).toBe(
            'inputField search-field'
        );
        expect(component.find('IconButton').prop('aria-label')).toBe('Search');
    });

    it('renders correctly when value is not 0', () => {
        const props = {
            filterValues: { id: 'Test', name: 'test' },
            search: jest.fn(),
            value: 1
        };
        const component = mount(
            <IntlProvider locale="en" messages={messages['en']}>
                <TabHeader {...props} />
            </IntlProvider>
        );

        const tabHeader = component.find('TabHeader');
        expect(tabHeader).toHaveLength(1);

        expect(
            component
                .find('div')
                .at(0)
                .prop('id')
        ).toBe('tab-sub-header');
        expect(component.find('AppBar').exists()).toBeTruthy();
        expect(component.find('Paper').exists()).toBeTruthy();
        expect(component.find('Tabs').exists()).toBeTruthy();
        expect(component.find('EventListener').exists()).toBeTruthy();
        expect(component.find('TabIndicator').exists()).toBeTruthy();

        const select = component.find('Select');
        expect(select.exists()).toBeFalsy();

        expect(component.find('Input').exists()).toBeFalsy();
        expect(component.find('InputBase').exists()).toBeFalsy();
        expect(component.find('SelectInput').exists()).toBeFalsy();
        expect(component.find('ArrowDropDown').exists()).toBeFalsy();
        expect(component.find('Menu').exists()).toBeFalsy();

        expect(component.find('SearchField').exists()).toBeFalsy();
        expect(component.find('TextField').exists()).toBeFalsy();
        expect(component.find('FormControl').exists()).toBeFalsy();
    });

    it('render correct tab names', () => {
        const props = {
            tabsName: [
                { name: 'tabHeaders.test1' },
                { name: 'tabHeaders.test2' },
                { name: 'tabHeaders.test3' }
            ]
        };

        const component = mount(
            <IntlProvider locale="en" messages={messages['en']}>
                <TabHeader {...props} />
            </IntlProvider>
        );

        expect(component.find('LinkTab')).toHaveLength(3);
        expect(
            component
                .find('LinkTab')
                .at(0)
                .find('FormattedMessage')
                .prop('id')
        ).toBe('tabHeaders.test1');
        expect(
            component
                .find('LinkTab')
                .at(1)
                .find('FormattedMessage')
                .prop('id')
        ).toBe('tabHeaders.test2');
        expect(
            component
                .find('LinkTab')
                .at(2)
                .find('FormattedMessage')
                .prop('id')
        ).toBe('tabHeaders.test3');
    });
});

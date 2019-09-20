import React from 'react';
import { IntlProvider } from 'react-intl';
import EnhancedTableBody from '../components/EnhancedTableBody/EnhancedTableBody';
import messages_en from '../../../translation/en.json';
import { mount } from 'enzyme';
import helperFactory from './factory/helperFactory';

// declare messages
const messages = {
    en: messages_en
};
const intl = {
    locale: 'en',
    messages: messages['en']
}

describe('EnhancedTableBody', () => {
    it('renders correctly with empty content', () => {
        const props = {
            contentType: 'test',
            selectable: false
        };
        const component = mount(
            <IntlProvider {...intl}>
                <table>
                    <EnhancedTableBody {...props} />
                </table>
            </IntlProvider>
        );
        expect(component.find('EnhancedTableBody').exists()).toBeTruthy();
        expect(component.find('tbody')).toHaveLength(1);
    });

    it('renders correctly with non empty content and disable selectable', () => {
        const props = {
            contentType: 'test',
            selectable: false,
            includeActionMenu: false,
            contents: helperFactory.tableContents,
            fields: helperFactory.tableFields
        };
        const component = mount(
            <IntlProvider {...intl}>
                <table>
                    <EnhancedTableBody {...props} />
                </table>
            </IntlProvider>
        );
        expect(component.find('TableRow')).toHaveLength(2);
        component.find('TableRow').forEach((node,index) => {
            expect(node.hasClass('selectableTableRow')).toBeFalsy();
            expect(node.find('Checkbox')).toHaveLength(0);
            expect(node.find('TableCell')).toHaveLength(1);
            expect(node.find('TableCell').text()).toBe(props.contents[index].name);
        });
    });

    it('renders correctly with non empty content and enable selectable', () => {
        const props = {
            contentType: 'test',
            selectable: true,
            selectId: 'id',
            includeActionMenu: false,
            contents: helperFactory.tableContents,
            selected:[1],
            fields: helperFactory.tableFields
        };
        const component = mount(
            <IntlProvider {...intl}>
                <table>
                    <EnhancedTableBody {...props} />
                </table>
            </IntlProvider>
        );

        expect(component.find('TableRow')).toHaveLength(2);
        component.find('TableRow').forEach((node,index) => {
            expect(node.find('Checkbox')).toHaveLength(1);
            expect(node.find('TableCell')).toHaveLength(2);
            expect(node.find('TableCell').at(1).text()).toBe(props.contents[index].name);
        });
        expect(component.find('TableRow').at(0).hasClass('selectableTableRow-selected')).toBeTruthy();
        expect(component.find('TableRow').at(1).hasClass('selectableTableRow-selected')).toBeFalsy();
    });

    it('renders correctly with non empty content and enable action menu', () => {
        const props = {
            contentType: 'test',
            selectable: false,
            includeActionMenu: true,
            contents: helperFactory.tableContents,
            fields: helperFactory.tableFields
        };
        const component = mount(
            <IntlProvider {...intl}>
                <table>
                    <EnhancedTableBody {...props} />
                </table>
            </IntlProvider>
        );

        expect(component.find('TableRow')).toHaveLength(2);
        component.find('TableRow').forEach((node,index) => {
            expect(node.find('Checkbox')).toHaveLength(0);
            expect(node.find('TableCell')).toHaveLength(2);
            expect(node.find('TableCell').at(0).text()).toBe(props.contents[index].name);
            expect(node.find('Menu')).toHaveLength(1);
            expect(node.find('TableCell').at(1).hasClass('action-cells')).toBeTruthy();
            expect(node.find('TableCell').at(1).find('MoreHorizIcon')).toHaveLength(1);
        });
    });

});

import React from 'react';
import {IntlProvider} from 'react-intl';
import {mount} from 'enzyme';
import PaginationTable from '../components/PaginationTable/PaginationTable';
import messages_en from '../../../translation/en.json';

// declare messages
const messages = {
'en': messages_en
};

const onAddTagClick = (e) => {
    console.log('onAddTagClick empty method for testing');
}

const handleContentDelete = (e) => {
    console.log('handleContentDelete empty method for testing');
}

const sortLabelHandler = (e) => {
    console.log('sortLabelHandler empty method for testing');
}

const onSortingChange = (e) => {
    console.log('onSortingChange empty method for testing');
}

describe('PaginationTable test', () => {

    it('renders correctly for schedules', () => {

        const props = {contentType:'schedules', onSortingChange};
        const component = mount(
        <IntlProvider locale='en' messages={messages['en']}>
            <PaginationTable {...props}/>
        </IntlProvider>);

        expect(component.find('PaginationTable').exists()).toBeTruthy();
        expect(component.find('PaginationTable').prop('contentType')).toBe(props.contentType);
        expect(component.find('PaginationTable').prop('limit')).toBe(10);
        expect(component.find('Table').exists()).toBeTruthy();
        expect(component.find('EnhancedTableHead').exists()).toBeTruthy();
        expect(component.find('Loading').exists()).toBeTruthy();

        const formattedMsg = component.find('FormattedMessage');
        expect(formattedMsg.exists()).toBeTruthy();
        expect(formattedMsg.prop('id')).toEqual('schedules.table.col.actions');

        expect(component.find('TableFooter').exists()).toBeTruthy();
        expect(component.find('TablePagination').exists()).toBeTruthy();
        expect(component.find('Select').exists()).toBeTruthy();
        expect(component.find('ArrowDropDown').exists()).toBeTruthy();
        expect(component.find('TablePaginationActions').exists()).toBeTruthy();
    });

    it('renders EnhancedTableToolBar correctly', () => {

        const selected = new Array(5);
        const props = {contentType:'segments', onSortingChange, sortLabelHandler,
                       selected, handleContentDelete, onAddTagClick};

        const component = mount(
        <IntlProvider locale='en' messages={messages['en']}>
            <PaginationTable {...props}/>
        </IntlProvider>);

        expect(component.find('EnhancedTableToolbar').exists()).toBeTruthy();
        expect(component.find('EnhancedTableToolbar').prop('numSelected')).toEqual(selected.length);
    });

    it('renders correctly when count > 0 and isLoading=false', () => {

        const props = {contentType:'segments', onSortingChange, sortLabelHandler,
                       handleContentDelete, onAddTagClick, count:1, isLoading:false, messageId:''};

        const component = mount(
        <IntlProvider locale='en' messages={messages['en']}>
            <PaginationTable {...props}/>
        </IntlProvider>);

        expect(component.find('EnhancedTableBody').exists()).toBeTruthy();
        expect(component.find('EnhancedTableBody').prop('page')).toEqual(0);
    });

    it('renders correctly when count === 0 and isLoading=false', () => {

        const props = {contentType:'segments', onSortingChange, sortLabelHandler, handleContentDelete,
                       onAddTagClick, count:0, isLoading:false, messageId:'segments.search.segments.noResults'};

        const component = mount(
        <IntlProvider locale='en' messages={messages['en']}>
            <PaginationTable {...props}/>
        </IntlProvider>);

        const formattedMsg = component.find('FormattedMessage').at(1);
        expect(formattedMsg.exists()).toBeTruthy();
        expect(formattedMsg.prop('id')).toEqual(props.messageId);
    });
});

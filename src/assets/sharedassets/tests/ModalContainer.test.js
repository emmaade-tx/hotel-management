import {IntlProvider} from 'react-intl';
import React from 'react';
import {mount} from 'enzyme';
import ModalContainer from '../components/ModalContainer/ModalContainer';
import messages_en from '../../../translation/en.json';

const messages =
{
'en': messages_en
};

const handleCentreBtnAction = (e) => {
    console.log('handleTitleChange empty method for testing');
}

const handleContinue = (e) => {
    console.log('handleTitleChange empty method for testing');
}

const handleCancel = (e) => {
    console.log('handleTitleChange empty method for testing');
}

describe('ModalContainer test', () => {
    it('renders correctly with default props', () => {
        const props = { handleCentreBtnAction, handleContinue, handleCancel };
        const component = mount(<IntlProvider locale='en' messages={messages['en']}>
        <ModalContainer
        modalHeader={'livestreams.delete.modal.header'}
        buttonLeft={'segments.delete.modal.button.left'}
        buttonRight={'segments.delete.modal.button.right'}
        {...props}
        /></IntlProvider>);

        const modalContainer = component.find('ModalContainer');
        expect(modalContainer).toHaveLength(1);
        expect(modalContainer.prop('includeModalHeader')).toBe(true);
        expect(modalContainer.prop('includeCloseBtn')).toBe(false);
        expect(modalContainer.prop('fullScreen')).toBe(false);
        expect(modalContainer.prop('fullWidth')).toBe(false);
        expect(modalContainer.prop('open')).toBe(false);
        expect(modalContainer.prop('maxWidth')).toBe('sm');
        expect(modalContainer.prop('className')).toBe('');

        const dialog = component.find('Dialog');
        expect(dialog).toHaveLength(1);
        expect(dialog.prop('className')).toBe('default-modal ');

        const modal = component.find('Modal');
        expect(modal).toHaveLength(1);
   });

    it('renders correctly when open is set to true', () => {
        const props = { handleCentreBtnAction, handleContinue, handleCancel, open:true };
        const component = mount(<IntlProvider locale='en' messages={messages['en']}>
        <ModalContainer
        modalHeader={'livestreams.delete.modal.header'}
        buttonLeft={'segments.delete.modal.button.left'}
        buttonRight={'segments.delete.modal.button.right'}
        {...props}
        /></IntlProvider>);

        const formattedMsg_DltLivestream = component.find('FormattedMessage').at(0);
        expect(formattedMsg_DltLivestream.text()).toBe(messages['en']['livestreams.delete.modal.header']);

        const formattedMsg_Cancel = component.find('FormattedMessage').at(1);
        expect(formattedMsg_Cancel.text()).toBe(messages['en']['segments.delete.modal.button.left']);

        const formattedMsg_Delete = component.find('FormattedMessage').at(2);
        expect(formattedMsg_Delete.text()).toBe(messages['en']['segments.delete.modal.button.right']);
    });
});

import React from 'react';
import { mount } from 'enzyme';
import NotificationSnackbar from '../components/NotificationSnackbar/NotificationSnackbar';
import { IntlProvider } from 'react-intl';
import messages_en from '../../../translation/en.json';
// declare messages
const messages = {
    en: messages_en
};
//redux store
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);
import { Provider } from 'react-redux';

const initialState = {};
const store = mockStore(initialState);

describe('NotificationSnackbar', () => {
    it('renders correctly with default props', () => {
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <Provider store={store}>
                    <NotificationSnackbar />
                </Provider>
            </IntlProvider>
        );

        const snackbar = component.find('NotificationSnackbar');
        expect(snackbar.prop('variant')).toBe('info');
        expect(snackbar.prop('open')).toBe(false);
        expect(snackbar.find('InfoIcon')).toHaveLength(0);
        expect(snackbar.find('SnackbarContent')).toHaveLength(0);
    });
    it('renders correctly with variant info', () => {
        const props = {
            open: true,
            variant: 'info',
            message: 'testing info'
        }
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <Provider store={store}>
                    <NotificationSnackbar {...props}/>
                </Provider>
            </IntlProvider>
        );
        const snackbar = component.find('NotificationSnackbar');
        expect(snackbar.find('span').text()).toBe(props.message);
        expect(snackbar.prop('variant')).toBe(props.variant);
        expect(snackbar.exists()).toBeTruthy();
        expect(snackbar.prop('open')).toBe(true);
        expect(snackbar.find('InfoIcon')).toHaveLength(1);
        expect(snackbar.find('SnackbarContent')).toHaveLength(1);
    });

    it('renders correctly with variant success', () => {
        const props = {
            open: true,
            variant: 'success',
            message: 'testing success'
        }
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <Provider store={store}>
                    <NotificationSnackbar {...props}/>
                </Provider>
            </IntlProvider>
        );

        const snackbar = component.find('NotificationSnackbar');
        expect(snackbar.find('span').text()).toBe(props.message);
        expect(snackbar.prop('variant')).toBe(props.variant);
        expect(snackbar.exists()).toBeTruthy();
        expect(snackbar.prop('open')).toBe(true);
        expect(snackbar.find('CheckCircleIcon')).toHaveLength(1);
        expect(snackbar.find('SnackbarContent')).toHaveLength(1);
    });

    it('renders correctly with variant warning', () => {
        const props = {
            open: true,
            variant: 'warning',
            message: 'testing warning'
        }
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <Provider store={store}>
                    <NotificationSnackbar {...props}/>
                </Provider>
            </IntlProvider>
        );

        const snackbar = component.find('NotificationSnackbar');
        expect(snackbar.find('span').text()).toBe(props.message);
        expect(snackbar.prop('variant')).toBe(props.variant);
        expect(snackbar.exists()).toBeTruthy();
        expect(snackbar.prop('open')).toBe(true);
        expect(snackbar.find('WarningIcon')).toHaveLength(1);
        expect(snackbar.find('SnackbarContent')).toHaveLength(1);
    });

    it('renders correctly with variant error', () => {
        const props = {
            open: true,
            variant: 'error',
            message: 'testing error'
        }
        const component = mount(
            <IntlProvider locale='en' messages={messages['en']}>
                <Provider store={store}>
                    <NotificationSnackbar {...props}/>
                </Provider>
            </IntlProvider>
        );

        const snackbar = component.find('NotificationSnackbar');
        expect(snackbar.find('span').text()).toBe(props.message);
        expect(snackbar.prop('variant')).toBe(props.variant);
        expect(snackbar.exists()).toBeTruthy();
        expect(snackbar.prop('open')).toBe(true);
        expect(snackbar.find('ErrorIcon')).toHaveLength(1);
        expect(snackbar.find('SnackbarContent')).toHaveLength(1);
    });
});

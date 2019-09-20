import React from 'react';
import {IntlProvider} from 'react-intl';
import Loading from '../components/Loading/Loading';
import messages_en from '../../../translation/en.json';

import { createMount } from '@material-ui/core/test-utils';

// declare messages
const messages = {
    'en': messages_en
};

describe('Loading', () => {

    let mount;

    beforeEach(() => {
        mount = createMount();
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('renders correctly', () => {
        const component = mount(<IntlProvider locale='en' messages={messages['en']}><Loading/></IntlProvider>);
        // test
        const circularProgress = component.find('CircularProgress');
        expect(circularProgress).toHaveLength(1);
    });

});

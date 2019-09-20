import React from 'react';
import {IntlProvider} from 'react-intl';
import PreviewModal from '../components/PreviewModal/PreviewModal';

import messages_en from '../../../translation/en.json';
import { createMount } from '@material-ui/core/test-utils';


// declare messages
const messages = {
    'en': messages_en
};


const emptyMethod = (e) => {
    console.log('emptyMethod');
}

describe('PreviewModal', () => {

    let mount;

    beforeEach(() => {
        mount = createMount();
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('renders correctly', () => {

        const component = mount(<IntlProvider locale='en' messages={messages['en']}><PreviewModal
            openModal={true}
            handleCancel={e => emptyMethod(e)}
            url={'https://www.dingdong.com'}
            muted={false}
        /></IntlProvider>);
        // test PreviewModal props
        const modalProps = component.props().children.props;
        expect(modalProps.handleCancel).toBeDefined();
        expect(modalProps.url).toEqual('https://www.dingdong.com');

        const modal = component.children()
        const player = modal.find('ReactPlayer');
        expect(player).toBeDefined();
        // pip is an unused feature and should always be false
        expect(player.props().pip).toBe(false);
        expect(player.props().muted).toBe(false);

    });

});

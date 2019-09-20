import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

//material-ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//custom icons & material-ui icons
import { ScheduleIcon, PreviewIcon } from "../../assets/sharedassets/icons/icons.js";
import { checkIfAdmin, checkAdminAndManager } from '../../helpers/helper';

import { DataUsage, Airplay, VideoLibrary } from "@material-ui/icons";
const iconComponents = {
    hotel: ScheduleIcon,
    rooms: DataUsage,
    roomtypes: Airplay,
    bookings: VideoLibrary,
    pricelists: VideoLibrary,
    calendar: PreviewIcon
}
class Home extends Component {

    renderButton(type, buttonText) {
        const subText = "home." + type + ".subtext";
        const IconComponent = iconComponents[type.replace(/-/g, '')];
        const linkComponent = props => <Link className="btn-xl-link" to={"/" + type} {...props} />;
        return (
            <Button component={linkComponent} variant="contained" color="primary" className="btn-xl">
                <IconComponent className="icon-xl"/>
                <Typography variant="h1" color="secondary" gutterBottom>
                    {buttonText}
                </Typography>
                <Typography variant="h5" color="secondary" gutterBottom>
                   {type}
                </Typography>
                <hr className="btn-divider" width="25%"/>
            </Button>
        )
    }

    render() {
        return (
            <div className={"home-container"}>
                <div className="home-container-main">
                    { checkIfAdmin() && (
                        this.renderButton("hotel", "Hotel")
                    )}
                    { checkAdminAndManager() && (
                        this.renderButton("rooms", "Rooms")
                    )}
                    { checkAdminAndManager() && (
                        this.renderButton("roomtypes", "Room Types")
                    )}
                    { checkAdminAndManager() && (
                        this.renderButton("pricelists", "Price List")
                    )}
                    {this.renderButton("bookings", "Bookings")}
                    {this.renderButton("calendar", "Calendar")}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        UserStore: state.UserStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {},
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Home);

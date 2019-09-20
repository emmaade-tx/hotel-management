import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { Inbox, Drafts, Email, Phone, Code, Title } from '@material-ui/icons';

import './Hotel.scss';

import _ from 'lodash';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchHotel,
    updateHotel,
    clearStore
} from '../../actions/HotelActions';
import { closeNotification, showNotification } from '../../actions/NotificationActions';
import api from '../../config/config.js';
class Hotel extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            selectedBookingId: '',
            livestreamPreviewLink: '',
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false
        };
    }

    componentDidMount () {
        this.props.actions.fetchHotel();
        if (this.props.HotelStore.hasSaved && !this.props.HotelStore.hasError) {
            this.props.actions.showNotification();
        }
        if (this.props.HotelStore.hasError) {
            this.props.actions.dispatchFetchBookingError();
        }
    }

    componentWillUnmount(){
        this.props.actions.clearStore();
    }

    render() {
        const {hotel} = this.props.HotelStore;
        return (
		    <Card className={'card'}>
		      <CardActionArea>
		        <CardMedia
		          className={'media'}
		          image={hotel.image}
		          title="Contemplative Reptile"
		        />
		        <CardContent>
		          <Typography gutterBottom variant="h5" component="h2">
		            <strong>{hotel.name}</strong>
		          </Typography>
		          <List component="nav" aria-label="Main mailbox folders">
		          <ListItem button>
			          <ListItemIcon>
			            <Title />
			          </ListItemIcon>
			          <ListItemText primary={hotel.name} />
			       </ListItem>
			       <ListItem button>
			          <ListItemIcon>
			            <Drafts />
			          </ListItemIcon>
			          <ListItemText primary={hotel.address} />
			        </ListItem>
			        <ListItem button>
			          <ListItemIcon>
			            <Drafts />
			          </ListItemIcon>
			          <ListItemText primary={hotel.city} />
			        </ListItem>
			        <ListItem button>
			          <ListItemIcon>
			            <Drafts />
			          </ListItemIcon>
			          <ListItemText primary={hotel.state} />
			        </ListItem>
			        <ListItem button>
			          <ListItemIcon>
			            <Drafts />
			          </ListItemIcon>
			          <ListItemText primary={hotel.country} />
			        </ListItem>
			        <ListItem button>
			          <ListItemIcon>
			            <Phone />
			          </ListItemIcon>
			          <ListItemText primary={hotel.phone_number} />
			        </ListItem>
			        <ListItem button>
			          <ListItemIcon>
			            <Email />
			          </ListItemIcon>
			          <ListItemText primary={hotel.email} />
			        </ListItem>
			        <ListItem button>
			          <ListItemIcon>
			            <code />
			          </ListItemIcon>
			          <ListItemText primary={hotel.zip_code} />
			        </ListItem>
			      </List>
			      <Divider />
		        </CardContent>
		      </CardActionArea>
		      <CardActions>
		      <Link to="/hotel/1">
		        <Button color="secondary" size="medium">
		          Edit
		        </Button>
		        </Link>
		      </CardActions>
		    </Card>
        );
    }
}


function mapStateToProps(state) {
    return {
        HotelStore: state.HotelStore,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                updateHotel,
                fetchHotel,
                showNotification,
                clearStore,
                closeNotification
            },
            dispatch
        ),
    };
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(Hotel)

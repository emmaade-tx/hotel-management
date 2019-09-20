import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';

import {
    ModalContainer,
    PreviewModal
} from '../../components';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    fetchBookingDetails,
} from '../../actions/BookingActions';
import { formatBookings } from '../../helpers/helper';

const localizer = momentLocalizer(moment);
const CURRENT_DATE = moment().toDate();

const ColoredDateCellWrapper = ({children, value}) =>
  React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
    },
  });

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
          popoverOpen: false,
          handleClose: false,
          selectedInfo: {}
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount () {
        this.props.actions.fetchBookingDetails();
        if (this.props.BookingStore.hasSaved && !this.props.BookingStore.hasError) {
            this.props.actions.showNotification();
        }
        if (this.props.BookingStore.hasError) {
            this.props.actions.dispatchFetchBookingError();
        }
    }

    handleClick(e) {
      this.setState({
          modalOpen: true,
          selectedInfo: e,
      })
    }

    handleClose() {
      this.setState({
          modalOpen: false,
      })
    }

    handleCloseModal = e => {
        this.setState({
            modalOpen: false,
        });
    };

    renderModal () {
        return (
            <ModalContainer
                handleCancel={e => this.handleCloseModal(e)}
                open={this.state.modalOpen}
                handleContinue={e => this.handleCloseModal(e)}
                modalHeader={"More Details"}
                buttonLeft={"Cancel"}
                buttonRight={"Ok"}
                includeModalFooter={true}
                includeModalHeader={true}
            >
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                       <strong>Full Name: </strong> {this.state.selectedInfo.full_name}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <strong>Room: </strong> {this.state.selectedInfo.desc}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <strong>Check In: </strong> {this.state.selectedInfo.start}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <strong>Check Out: </strong> {this.state.selectedInfo.end}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <strong>Total Night: </strong> {this.state.selectedInfo.total_night}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <strong>Total Price: </strong> {this.state.selectedInfo.total_price}
                    </Typography>
                </DialogContent>
            </ModalContainer>
        );
    }

    render() {
      const { allBookingDetails } = this.props.BookingStore;
      const formattedBookings = formatBookings(allBookingDetails);

      return (
        <div style={{height: '100vh', margin: '10px'}}>
          <Calendar
            localizer={localizer}
            events={formattedBookings}
            startAccessor="start"
            endAccessor="end"
            components={{
              dateCellWrapper: ColoredDateCellWrapper,
            }}
            onSelectEvent={this.handleClick}
          />
          {this.renderModal()}
        </div>
        
      );
    }

}
 

function mapStateToProps (state) {
    return {
        BookingStore: state.BookingStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchBookingDetails
            },
            dispatch
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar)

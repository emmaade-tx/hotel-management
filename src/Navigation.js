import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute'
import { 
    Home,
    Login,
    Bookings,
    BookingDetails,
    Hotel,
    HotelDetail,
    RoomTypes,
    RoomTypeDetails,
    Rooms,
    RoomDetails,
    PriceLists,
    PriceListDetails,
    Calendar,
    Register
} from './pages';

// The Navigation component renders one of the provided
// Routes (provided that one matches). Both the /account, /segment
// and /schedule routes will match any pathname that starts
// with /account, /segment or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Navigation = ( props ) => (
    <main className="active-container">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute exact path="/bookings" component={Bookings}/>
            <PrivateRoute exact path="/booking/new" component={BookingDetails}/>
            <PrivateRoute exact path="/booking/:id" component={BookingDetails}/>
            <PrivateRoute exact path="/hotel" component={Hotel}/>
            <PrivateRoute exact path="/hotel/:id" component={HotelDetail}/>
            <PrivateRoute exact path="/roomtypes" component={RoomTypes}/>
            <PrivateRoute exact path="/roomtype/new" component={RoomTypeDetails}/>
            <PrivateRoute exact path="/roomtype/:id" component={RoomTypeDetails}/>
            <PrivateRoute exact path="/rooms" component={Rooms}/>
            <PrivateRoute exact path="/room/new" component={RoomDetails}/>
            <PrivateRoute exact path="/room/:id" component={RoomDetails}/>

            <PrivateRoute exact path="/pricelists" component={PriceLists}/>
            <PrivateRoute exact path="/pricelist/new" component={PriceListDetails}/>
            <PrivateRoute exact path="/pricelist/:id" component={PriceListDetails}/>

            <PrivateRoute exact path="/calendar" component={Calendar}/>
        </Switch>
    </main>
)

export default Navigation;

import React from 'react';
import styled from 'styled-components';
import { ajax } from 'jquery';
import ReserveFrom from './ReserveForm';


const Wrapper = styled.section`
  text-align: center;
  border: 0.5px solid grey;
  padding: 15px;
  position: fixed;
  top: 10%;
  left: 57.5%;
  width: 35%;
  height: 50%;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProperty: {},
      currentBookings: [],
      currentBlackOutDays: [],
    };
    this.getPropertiesBookingsBlackOuts = this.getPropertiesBookingsBlackOuts.bind(this);
    this.postNewBooking = this.postNewBooking.bind(this);
  }

  componentDidMount() {
    this.getPropertiesBookingsBlackOuts();
  }

  getPropertiesBookingsBlackOuts() {
    // all 3 initial gets should be refactored to just one ajax call
    ajax({
      method: 'GET',
      data: { property_id: 19 },
      url: '/api/reservations/properties',
      success: (data) => {
        this.setState({
          currentProperty: data[0],
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    ajax({
      method: 'GET',
      data: { property_id: 19 },
      url: '/api/reservations/bookings',
      success: (data) => {
        this.setState({
          currentBookings: data,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    ajax({
      method: 'GET',
      data: { property_id: 19 },
      url: '/api/reservations/blackout_days',
      success: (data) => {
        this.setState({
          currentBlackOutDays: data,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  postNewBooking(booking) {
    ajax({
      method: 'POST',
      data: JSON.stringify(booking),
      contentType: 'application/json',
      url: '/api/reservations/bookings',
      success: (uuid) => {
        this.getPropertiesBookingsBlackOuts();
        alert(`your booking id number is ${uuid}`);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    const { currentProperty, currentBookings, currentBlackOutDays } = this.state;
    return (
      <Wrapper>
        <ReserveFrom
          currentBlackOutDays={currentBlackOutDays}
          currentBookings={currentBookings}
          currentProperty={currentProperty}
          postNewBooking={this.postNewBooking}
        />
      </Wrapper>
    );
  }
}

export default App;

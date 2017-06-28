import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

export default class GoogleMapOutsideTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      directionDetails: {},
      mapUrl: '',
    };
    this.getWaypts = this.getWaypts.bind(this)
    this.getDirections = this.getDirections.bind(this)
  }

  componentWillMount() {
    this.setState({directionDetails: this.getWaypts(this.props.outsideTripDetails)});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outsideTripDetails !== this.props.outsideTripDetails) {
      this.setState({directionDetails: this.getWaypts(nextProps.outsideTripDetails)});
    }
  }

  componentDidMount() {
    this.getDirections();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.outsideTripDetails !== this.props.outsideTripDetails) {
      console.log('map updated!')
      this.getDirections();
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
      return nextProps.outsideTripDetails !== this.props.outsideTripDetails;
  }

  getWaypts = function(outsideTripDetails) {
    let waypts = [];
    const tripLength = outsideTripDetails.length;
    const origin = this.props.origin_location;
    const originUrl = '&origin=' + encodeURIComponent(origin);
    let location = '';
    let destination = '';
    let mapWayptUrl = 'https://www.google.com/maps/dir/?api=1&travelmode=driving';
    let mapWaypts = [];
    let destUrl = '';
    for (let i = 0; i < tripLength; i++){
      if (outsideTripDetails.check_full_address === 0){
        location = outsideTripDetails[i].name + ', ' + outsideTripDetails[i].city + ', ' + outsideTripDetails[i].state
      }
      else {
        location = outsideTripDetails[i].address
      }
      // location = new window.google.maps.LatLng(outsideTripDetails[i].coord_lat, outsideTripDetails[i].coord_long)
      if(i === tripLength - 1) {
        destination = location;
        destUrl = '&destination='+ destination; 
      }
      else {
        // console.log(location)
        waypts.push({location: location, stopover: true});
        mapWaypts.push(encodeURIComponent(location));
      }
    }
    const mapWayptsStr = mapWaypts.join('%7C');
    mapWayptUrl += originUrl + destUrl + '&waypoints=' + mapWayptsStr;
    this.props.getMapUrl(mapWayptUrl);
    return {
      origin: origin,
      destination: destination,
      waypts: waypts
    };
  }

  getDirections() {
    // console.log('get directions')
    const DirectionsService = new window.google.maps.DirectionsService();
    if(this.state.directionDetails.origin){ 
      DirectionsService.route({
        origin: this.state.directionDetails.origin,
        destination: this.state.directionDetails.destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: this.state.directionDetails.waypts,
        optimizeWaypoints: false,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          console.log('reuslt: ', result)
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  }

  render() {
    console.log('map re-renderred')
    const DirectionsGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={this.state.center}
      >
        {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
      </GoogleMap>
    ));

    return (
      <DirectionsGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.directionDetails.origin}
        directions={this.state.directions}
      />
    );
  }
}
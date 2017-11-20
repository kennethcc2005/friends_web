import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

class AdminPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            poi_id: null,
            poi_name: '',
            address: '',
            city: '',
            state: '',
            coord_lat: null,
            coord_long: null,
            photo_src: '',
            desc: '',
            rating: '',
            season: '',
            link: '',
            additional_info: '',
            visit_length: '',
            review_nums: '',
            importantEventValue: 1,
            eventTypeValue: 'seasonal',
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.handleDropDownChangeImportance = this.handleDropDownChangeImportance.bind(this);        
        this.onNewEventSubmit = this.onNewEventSubmit.bind(this);
    }

    handleOnChange (e) {
        const fieldId = e.target.id;
        const value = e.target.value;
        this.setState({[fieldId]: value});
    }

    handleDropDownChange = (event, index, value) => {
      this.setState({eventTypeValue: value});
    }
   
    handleDropDownChangeImportance = (event, index, value) => {
      this.setState({importantEventValue: value});
    }

    onNewEventSubmit = () => {
        const newPOISeasonalURI = 'http://localhost:8000/new_poi/seasonal/';
        const newPOIFestivalURI = 'http://localhost:8000/new_poi/feastival/';
        const editPOIURI = 'http://localhost:8000/edit_poi/';
        const _this = this;
        const poi_id = this.state.poi_id;
        const address = this.state.address;
        const city = this.state.city;
        const state = this.state.state;
        const coord_lat = this.state.coord_lat;
        const coord_long = this.state.coord_long;
        const poi_name = this.state.poi_name;
        const photo_src = this.state.photo_src;
        const desc = this.state.desc;
        const link = this.state.link;
        const season = this.state.season;
        const additional_info = this.state.additional_info;
        const important_event = this.state.importantEventValue;
        const eventTypeValue = this.state.eventTypeValue;
        const visit_length = this.state.visit_length;
        const rating = this.state.rating;
        const review_nums = this.state.review_nums;
        const eventType = {
          'seasonal': newPOISeasonalURI,
          'festival': newPOIFestivalURI,
          'editPOI': editPOIURI,
          'importance': editPOIURI,
          'new': editPOIURI
        }
        const newEventSubmitUrl = eventType[eventTypeValue];
        const data = {
          season: season,
          poi_id: poi_id,
          poi_name: poi_name, 
          address: address,
          city: city, 
          state: state,
          coord_lat: coord_lat,
          coord_long: coord_long,
          photo_src: photo_src,
          desc: desc,
          link: link, 
          additional_info: additional_info,
          important_event: important_event,
          event_type_value: eventTypeValue,
          visit_length: visit_length,
          review_nums: review_nums,
          rating: rating,
        }
        
        if(this.state.link !== '') {
          $.ajax({
            type: "POST",
            url: newEventSubmitUrl,
            data: data,
          }).done(function(res) {
            console.log('Done!')
            alert('Done! Please add new ones!')
            _this.setState({
              poi_id: null,
              address: '',
              poi_name: '',
              city: '',
              state: '',
              coord_lat: null,
              coord_long: null,
              photo_src: '',
              desc: '',
              season: '',
              link: '',
              additional_info: '',
              visit_length: '',
              review_nums: '',
              rating: '',
              importantEventValue: 1,
              eventTypeValue: 'seasonal',
            });
          });
        };
      }
    render() {
        const handleOnChange = this.handleOnChange;
        const {poi_id, poi_name, address, city, state, coord_lat, coord_long, photo_src, desc, season, link, additional_info } = this.state;
        return(
            <div className="col-md-6">
                <TextField
                hintText="POI ID"
                fullWidth={true}
                id="poi_id"
                value={poi_id}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="POI Name"
                fullWidth={true}
                id="poi_name"
                value={poi_name}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Address"
                id="address"
                fullWidth={true}
                value={address}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="City"
                id="city"
                fullWidth={true}
                value={city}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="State"
                id="state"
                fullWidth={true}
                value={state}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Coord Lat"
                id="coord_lat"
                fullWidth={true}
                value={coord_lat}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Coord Long"
                id="coord_long"
                fullWidth={true}
                value={coord_long}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Photo Source"
                id="photo_src"
                fullWidth={true}
                value={photo_src}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Description"
                id="desc"
                fullWidth={true}
                value={desc}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Season"
                id="season"
                fullWidth={true}
                value={season}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Link"
                id="link"
                fullWidth={true}
                value={link}
                onChange={handleOnChange}
                /><br />
                <TextField
                hintText="Additional Info"
                fullWidth={true}
                id="additional_info"
                value={additional_info}
                onChange={handleOnChange}
                /><br />
                <div className="col-md-6">
                  <DropDownMenu
                    value={this.state.importantEventValue}
                    onChange={this.handleDropDownChangeImportance}
                    style={{width: 300, marginLeft: -120}}
                    autoWidth={false}
                  >
                    <MenuItem value={1} primaryText="Important Event" />
                    <MenuItem value={0} primaryText="Not Important Event" />
                  </DropDownMenu>
                </div>
                <div className="col-md-6">
                  <DropDownMenu
                    value={this.state.eventTypeValue}
                    onChange={this.handleDropDownChange}
                    style={{width: 300, marginLeft: -120}}
                    autoWidth={false}
                  >
                    <MenuItem value={'seasonal'} primaryText="New Seasonal Event" />
                    <MenuItem value={'festival'} primaryText="New Festival Event" />
                    <MenuItem value={'editPOI'} primaryText="Update POI Table Address" />
                    <MenuItem value={'importance'} primaryText="Update POI Important" />
                    <MenuItem value={'new'} primaryText="New..." />
                  </DropDownMenu>
                </div>
                <br />
                <RaisedButton className="pull-right" label="Submit" primary={true} onClick={this.onNewEventSubmit} />
            </div>
        )
    }
};

export default AdminPage;
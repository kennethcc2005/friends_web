import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AdminPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            poi_name: '',
            city: '',
            state: '',
            photo_src: '',
            desc: '',
            season: '',
            link: '',
            additional_info: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange (e) {
        const fieldId = e.target.id;
        const value = e.target.value;
        this.setState({[fieldId]: value});
    }

    render() {
        const handleOnChange = this.handleOnChange;
        const {poi_name, city, state, photo_src, desc, season, link, additional_info } = this.state;
        return(
            <div className="col-md-6">
                <TextField
                hintText="POI Name"
                fullWidth={true}
                id="poi_name"
                value={poi_name}
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
                <RaisedButton className="pull-right" label="Submit" primary={true}/>
            </div>
        )
    }
};

export default AdminPage;
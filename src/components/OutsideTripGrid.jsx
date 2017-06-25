import React, {PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class OutisdeTripGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  render() {
    let tilesData = [];
    const numTiles = this.props.outsideTripRouteIdList.length;
    const tileDetails = this.props.handleOutsideTripDetails;
    for (var i=0; i<numTiles; i++) {
      tilesData.push(
        <GridTile
          key={this.props.outsideTripRouteIdList[i].id}
          title={"Explore Around "+this.props.handleOutsideTripDetails[i][0].name}
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={i===0 || i===numTiles-1 ? 2 : 1}
          rows={i===0 || i===numTiles-1 ? 2 : 1}
          onTouchTap={(e) => this.props.getOutsideTripTileTapName(this.props.outsideTripRouteIdList[i].id)} 
        >
          <img src={this.props.handleOutsideTripDetails[i][0].img_url} />
        </GridTile>
      );
    };
    return (
      <div>
        <GridList
          cols={2}
          cellHeight={200}
          padding={1}
        >
          {tilesData}
        </GridList>
      </div>
    );
  }
}

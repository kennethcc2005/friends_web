import React, {PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  imgStyle:{
    width: '250px',
  },
};

export default class OutisdeTripGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  render() {
    let tilesData = [];
    const numTiles = this.props.handleOutsideTripRouteIdList.length;
    const tileDetails = this.props.handleOutsideTripDetails;
    for (var i=0; i<numTiles; i++) {
      let routeIdx = i
      let name = decodeURI(this.props.handleOutsideTripDetails[i][0].name)
      let routeTitle = name
      tilesData.push(
        <GridTile
          key={i}
          title={routeTitle}
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          onTouchTap={(e) => this.props.getOutsideTripTileTapName(routeIdx, name)} 
        >
          <img src={this.props.handleOutsideTripDetails[i][0].img_url} style={styles.imgStyle}/>
        </GridTile>
      );
    };
    return (
      <div>
        <GridList
          style={styles.gridList} cols={1.3}
        >
          {tilesData}
        </GridList>
      </div>
    );
  }
}

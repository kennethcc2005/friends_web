import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';
import { browserHistory, Router} from 'react-router';
// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>, document.getElementById('root'));

// ReactDom.render(
//   <Router history={browserHistory} routes={routes} />,
//   document.getElementById('root')
// );
import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../services/AuthService';
import Avatar from 'material-ui/Avatar';
import BlogConstants from '../constants/BlogConstants.jsx';
import axios from 'axios';
class BlogPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    // set the initial component state
    this.state = {
      posts: [],
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.fetchAndFilterPosts = this.fetchAndFilterPosts.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  fetchPosts(filter) {
    const _this = this;
    const categoryUrl = BlogConstants.CATEGORY_URL;
    const tagUrl = BlogConstants.TAG_URL;
    let postsUrl = BlogConstants.POSTS_URL;
    let pageUrl = "";
    if (filter) {
      if (filter.currentPage) {
          pageUrl = "?page=" + filter.currentPage;
      }
      if (filter.category) {
          /* Posts filtered by category */
          postsUrl = categoryUrl + filter.category;
      }
      if (filter.tag) {
          /* Posts filtered by tag */
          postsUrl = tagUrl + filter.tag;
      }
    }
    const url = postsUrl + pageUrl;
    axios.get(url)
     .then(response => {
      _this.setState({
        posts: response.data.results
      });
    });
  };

  fetchAndFilterPosts () {
    const page = this.props.location.query.page;
    var filter = {category: "",
              tag: "",
              currentPage: page };
    if (this.props.params.category) {
        filter.category = this.props.params.category;
    }
    if (this.props.params.tag) {
        filter.tag = this.props.params.tag;
    }   
    console.log('filter: ', filter);
    this.fetchPosts(filter);
  }

  componentWillMount() {
    console.log(">>>> src/components/post_list.js:");
    console.log("Calling fetchPosts() action creator.");     
    /* Fetch posts when the app loads */
    this.fetchAndFilterPosts();
    // this.props.fetchSettings(); 
  }

  componentDidUpdate() {
    const _this = this;
    console.log('Did Mount: ', _this.state.posts)
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  // processForm(event) {
  //   // prevent default action. in this case, action is the form submission event
  //   event.preventDefault();
  //   const _this = this;
  //   // create a string for an HTTP body message
  //   const email = this.state.user.email;
  //   const password = encodeURIComponent(this.state.user.password);
  //   Auth.login(email, password)
  //           .catch(function(err) {
  //               alert("Error logging in", err)
  //           })
  //           .done(function(greeting) {
  //             if (greeting !== undefined) {
  //               console.log('greeting', greeting);
  //               _this.context.router.replace('/');
  //             }
  //           });
  // }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  // changeUser(event) {
  //   const field = event.target.name;
  //   const user = this.state.user;
  //   user[field] = event.target.value;

  //   this.setState({
  //     user
  //   });
  // }


  /**
   * Render the component.
   */
  render() {
    const imgUrl = 'https://s3.amazonaws.com/travel-with-friends/img_file/16232.jpg';
    const avatarUrl = 'https://s3.amazonaws.com/travel-with-friends/profile.jpg';
    const title = 'Trip to Vegas';
    const avatarStyle = {
      backgroundImage:`url(${avatarUrl})`,
      backgroundColor: '#263238',
    }
    const postBgImg = {
      backgroundImage: `url(${imgUrl})`,
      backgroundColor: '#263238',
    }
    const bgImg = {
      background: `linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(${imgUrl})`,
      backgroundSize: '200%',
      backgroundColor: '#263238',
    }
    return (
      <div className="demo-blog mdl-layout mdl-js-layout has-drawer is-upgraded" style={bgImg}>
        <main className="mdl-layout__content">
          <div className="demo-blog__posts mdl-grid">
            <div className="mdl-card mdl-cell mdl-cell--8-col">
              <div className="mdl-card__media mdl-color-text--grey-50" style={postBgImg}>
                <h3><a href="entry.html">{title}</a></h3>
              </div>
              <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
                <Avatar src={avatarUrl} />
                <div>
                  <strong>The Newist</strong>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
            <div className="mdl-card something-else mdl-cell mdl-cell--8-col mdl-cell--4-col-desktop">
              <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent">
                <i className="material-icons mdl-color-text--white" role="presentation">add</i>
                <span className="visuallyhidden">add</span>
              </button>
              <div className="mdl-card__media mdl-color--white mdl-color-text--grey-600">
                <img src="images/logo.png" />
                +1,337
              </div>
              <div className="mdl-card__supporting-text meta meta--fill mdl-color-text--grey-600">
                <div>
                  <strong>The Newist</strong>
                </div>
                <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" htmlFor="menubtn">
                  <li className="mdl-menu__item">About</li>
                  <li className="mdl-menu__item">Message</li>
                  <li className="mdl-menu__item">Favorite</li>
                  <li className="mdl-menu__item">Search</li>
                </ul>
                <button id="menubtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                  <i className="material-icons" role="presentation">more_vert</i>
                  <span className="visuallyhidden">show menu</span>
                </button>
              </div>
            </div>

            <div className="mdl-card mdl-cell mdl-cell--12-col">
              <div className="mdl-card__media mdl-color-text--grey-50" style={postBgImg}>
                <h3><a href="entry.html">On the road again</a></h3>
              </div>
              <div className="mdl-color-text--grey-600 mdl-card__supporting-text">
                Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
              </div>
              <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
                <div className="minilogo"></div>
                <div>
                  <strong>The Newist</strong>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>

            <div className="mdl-card amazing mdl-cell mdl-cell--12-col">
              <div className="mdl-card__title mdl-color-text--grey-50">
                <h3 className="quote"><a href="entry.html">I couldn’t take any pictures but this was an amazing thing…</a></h3>
              </div>
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
              </div>
              <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
                <div className="minilogo"></div>
                <div>
                  <strong>The Newist</strong>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
            <nav className="demo-nav mdl-cell mdl-cell--12-col">
              <div className="section-spacer"></div>
              <a href="entry.html" className="demo-nav__button" title="show more">
                More
                <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                  <i className="material-icons" role="presentation">arrow_forward</i>
                </button>
              </a>
            </nav>

          </div>
        </main>
      </div>
    );
  }

}

BlogPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BlogPage;
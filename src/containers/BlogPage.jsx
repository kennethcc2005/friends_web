import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../services/AuthService';
import Avatar from 'material-ui/Avatar';
import BlogConstants from '../constants/BlogConstants.jsx';
import axios from 'axios';
import moment from 'moment';
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
      nextPage: '',
      prevPage: '',
      baseBackgroundImg: '',

      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.fetchAndFilterPosts = this.fetchAndFilterPosts.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.postBase = this.postBase.bind(this);
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
        posts: response.data.results,
        nextPage: response.data.next,
        prevPage: response.data.previous
      });
      this.postBase();
    });
  }

  fetchAndFilterPosts () {
    const page = this.props.location.query.page;
    let filter = {category: "",
              tag: "",
              currentPage: page };
    if (this.props.params.category) {
        filter.category = this.props.params.category;
    }
    if (this.props.params.tag) {
        filter.tag = this.props.params.tag;
    }   
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
    console.log('Did Update: ', this.state.posts, this.state.prevPage, this.state.nextPage)
    console.log('backgroundImage: ', this.state.baseBackgroundImg)

  }

  postBase() {
    for (let post of this.state.posts) {
      if (post.full_trip_details !== null) {
        console.log('test1',post.full_trip_details[0].img_url)
        this.setState({
          baseBackgroundImg: post.full_trip_details[0].img_url
        });
        break;
      } else if (post.outside_trip_details !== null) {
        this.setState({
          baseBackgroundImg: post.outside_trip_details[0].img_url
        });
        break;
      }
    }
  }
  /**
   * Render the component.
   */
  render() {
    const imgUrl = this.state.baseBackgroundImg;
    const avatarUrl = 'https://s3.amazonaws.com/travel-with-friends/profile.jpg';
    const avatarStyle = {
      backgroundImage:`url(${avatarUrl})`,
      backgroundColor: '#263238',
    }
    const bgImg = {
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(${imgUrl})`,
      backgroundColor: '#263238',
    }


    let postLists = [];
    for (let i = 0; i< this.state.posts.length; i++) {
      const postImgUrl = this.state.posts[i].full_trip_details ? this.state.posts[i].full_trip_details[0].img_url : this.state.posts[i].outside_trip_details[0].img_url;
      const postDate = this.state.posts[i] ? moment(this.state.posts[i].pub_date).calendar() : moment().subtract(30, 'days').calendar();  
      const postTitle = this.state.posts[i].title;
      const postUsername = this.state.posts[i].username;
      const postBgImg = {
        backgroundImage: `url(${postImgUrl})`,
        backgroundColor: '#263238',
        backgroundSize: 'cover',
      }
      if(i===0) {
        postLists.push(
          <div className="mdl-card mdl-cell mdl-cell--8-col">
            <div className="mdl-card__media mdl-color-text--grey-50" style={postBgImg}>
              <h3><a href="entry.html">{postTitle}</a></h3>
            </div>
            <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
              <Avatar src={avatarUrl} />
              <div>
                <strong style= {{textAlign: 'left'}}>{postUsername}</strong>
                <span>{postDate}</span>
              </div>
            </div>
          </div>)
         postLists.push(
          <div className="mdl-card something-else mdl-cell mdl-cell--8-col mdl-cell--4-col-desktop">
            <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent">
              <i className="material-icons mdl-color-text--white" role="presentation">add</i>
              <span className="visuallyhidden">add</span>
            </button>
            <div className="mdl-card__media mdl-color--white mdl-color-text--grey-600">
              <img src={avatarUrl} />

            </div>
            <div className="mdl-card__supporting-text meta meta--fill mdl-color-text--grey-600">
              <div>
                <strong>History</strong>
              </div>
            </div>
          </div>
        ); 
      } else {
          if (i%2==1) {
          postLists.push(
            <div className="mdl-card mdl-cell mdl-cell--12-col">
              <div className="mdl-card__media mdl-color-text--grey-50" style={postBgImg}>
                <h3><a href="entry.html">{postTitle}</a></h3>
              </div>
              <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
                <Avatar src={avatarUrl} />
                <div>
                  <strong style={{textAlign: 'left'}}>{postUsername}</strong>
                  <span>{postDate}</span>
                </div>
              </div>
            </div>
          )
          } else {
          postLists.push(
            <div className="mdl-card mdl-cell mdl-cell--12-col">
              <div className="mdl-card__media mdl-color-text--grey-50">
                <h3><a href="entry.html">{postTitle}</a></h3>
              </div>
              <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
                <Avatar src={avatarUrl} />
                <div>
                  <strong style={{textAlign: 'left'}}>{postUsername}</strong>
                  <span>{postDate}</span>
                </div>
              </div>
            </div>
          )
          }
      }   
    }
    
    return (
      <div className="demo-blog mdl-layout mdl-js-layout has-drawer is-upgraded" style={bgImg}>
        <main className="mdl-layout__content">
          <div className="demo-blog__posts mdl-grid">
            {postLists}
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
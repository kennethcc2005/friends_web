import React, { PropTypes } from 'react';
import PostNewForm from '../components/LoginForm.jsx';
import Auth from '../services/AuthService';

class PostNewPage extends React.Component {

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
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const _this = this;
    // create a string for an HTTP body message
    const email = this.state.user.email;
    const password = encodeURIComponent(this.state.user.password);
    Auth.login(email, password)
            .catch(function(err) {
                alert("Error logging in", err)
            })
            .done(function(greeting) {
              if (greeting !== undefined) {
                console.log('greeting', greeting);
                _this.context.router.replace('/');
              }
            });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <PostNewForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

PostNewPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default PostNewPage;
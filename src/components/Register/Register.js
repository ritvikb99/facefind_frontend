import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      displayMessage: '',
    };
  }
  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  };

  onSubmit = () => {
    if (this.state.registerEmail === '') {
      this.setState({ displayMessage: 'no-email' });
    } else if (this.state.registerPassword === '') {
      this.setState({ displayMessage: 'no-password' });
    } else if (this.state.registerName === '') {
      this.setState({ displayMessage: 'no-name' });
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.registerEmail)) {
      this.setState({ displayMessage: 'invalid-email' });
    } else {
      fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: this.state.registerName,
          email: this.state.registerEmail,
          password: this.state.registerPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.setState({ displayMessage: 'success' });
            let list = document.getElementsByClassName('resetable');
            for (let element of list) {
              element.value = '';
            }
            this.props.loadUser(data);
            setTimeout(() => {
              this.props.changeRoute('signin');
            }, 5000);
          } else {
            this.setState({ displayMessage: 'wrong-password' });
          }
        });
    }
  };

  render() {
    return (
      <div>
        <article className='br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f2 fw6 ph0 mh0'>Register</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='email-address'>
                    Name
                  </label>
                  <input
                    onChange={this.onNameChange}
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 resetable'
                    type='text'
                    name='name'
                    id='name'
                    required
                  />
                </div>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 resetable'
                    type='email'
                    name='email-address'
                    id='email-address'
                    required
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='password'>
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 resetable'
                    type='password'
                    name='password'
                    id='password'
                    required
                  />
                </div>
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSubmit}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Register'
                />
              </div>
              {this.state.displayMessage === 'invalid-email' ? (
                <p style={{ color: 'red' }}>Please enter a valid email address </p>
              ) : this.state.displayMessage === 'no-email' ? (
                <p style={{ color: 'red' }}>Please enter your email address </p>
              ) : this.state.displayMessage === 'no-password' ? (
                <p style={{ color: 'red' }}>Please enter a password </p>
              ) : this.state.displayMessage === 'no-name' ? (
                <p style={{ color: 'red' }}>Please enter your name </p>
              ) : (
                <p style={{ color: 'red' }}></p>
              )}
            </div>
          </main>
        </article>
        {this.state.displayMessage === 'success' ? (
          <p className='f3 b' style={{ color: '#69d8ee' }}>
            Thanks for registering {this.state.registerName}.<br />
            You will be automatically redirected to the signin page in 5 seconds.
          </p>
        ) : (
          <p style={{ color: 'red' }}></p>
        )}
      </div>
    );
  }
}

export default Register;

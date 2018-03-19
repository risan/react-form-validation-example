import React, { Component } from 'react';
import RegistrationForm from './registration-form';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: null
    };
  }

  render() {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 600 }}>
          <div className="box">
            <RegistrationForm
              onSubmit={formData => this.setState({ formData })}
              onReset={() => this.setState({ formData: null })}
            />
            {this.state.formData ? (
              <div class="content" style={{ marginTop: 10 }}>
                <pre class="is-size-7">
                  {JSON.stringify(this.state.formData, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}

export default App;

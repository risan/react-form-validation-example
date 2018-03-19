import React, { Component } from 'react';
import validate from 'validate.js';
import { HorizontalField, HorizontalFieldGrouped } from './../bulma';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = RegistrationForm.INITIAL_STATES;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static get INITIAL_STATES() {
    return {
      email: '',
      password: '',
      planet: '',
      side: '',
      robots: [],
      errors: {}
    };
  }

  static get SIDES() {
    return {
      THE_DARK_SIDE: 'the dark side',
      THE_FORCE: 'the force'
    };
  }

  static get ROBOTS() {
    return {
      C_3PO: 'c-3po',
      R2_D2: 'r2-d2',
      BB_8: 'bb-8'
    };
  }

  static get RULES() {
    return {
      email: {
        presence: {
          allowEmpty: false
        },
        email: true
      },
      password: {
        presence: {
          allowEmpty: false
        },
        length: {
          minimum: 6
        }
      },
      planet: {
        presence: {
          allowEmpty: false
        }
      },
      side: {
        presence: {
          allowEmpty: false
        }
      },
      robots: {
        presence: {
          allowEmpty: false
        }
      }
    };
  }

  handleChange({ target }) {
    let { value, name, type } = target;

    if (type === 'checkbox') {
      value = this.getCheckboxValue(target);
    }

    const inputError = validate(
      { [name]: value },
      {
        [name]: RegistrationForm.RULES[name]
      }
    );

    this.setState({
      [name]: value,
      errors: Object.assign(
        {},
        this.state.errors,
        inputError ? inputError : { [name]: undefined }
      )
    });
  }

  getCheckboxValue({ value, name, checked }) {
    let checkedValue = checked ? value : '';

    if (!Array.isArray(this.state[name])) {
      return checkedValue;
    }

    let currentValues = this.state[name].slice();

    if (checkedValue) {
      currentValues.push(checkedValue);
    } else {
      currentValues.splice(currentValues.indexOf(value), 1);
    }

    return currentValues;
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = validate(this.state, RegistrationForm.RULES);

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({ errors: {} }, () => {
        const { email, password, planet, side, robots } = this.state;
        this.props.onSubmit({ email, password, planet, side, robots });
      });
    }
  }

  reset() {
    this.setState(RegistrationForm.INITIAL_STATES, () => this.props.onReset());
  }

  render() {
    const { email, password, planet, side, robots, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="registration-form">
        <HorizontalField
          label="Email"
          fieldLabel="normal"
          error={errors.email ? errors.email[0] : null}
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={this.handleChange}
            className={`input ${errors.email ? 'is-danger' : ''}`.trim()}
            autoComplete="off"
          />
        </HorizontalField>
        <HorizontalField
          label="Password"
          fieldLabel="normal"
          error={errors.password ? errors.password[0] : null}
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            className={`input ${errors.password ? 'is-danger' : ''}`.trim()}
          />
        </HorizontalField>
        <HorizontalField
          label="Planet"
          fieldLabel="normal"
          error={errors.planet ? errors.planet[0] : null}
        >
          <div className="select is-fullwidth">
            <select
              name="planet"
              value={planet}
              onChange={this.handleChange}
              className={`input ${errors.planet ? 'is-danger' : ''}`.trim()}
            >
              <option value="" disabled>
                Select Your Planet
              </option>
              <option value="alderaan">Alderaan</option>
              <option value="hoth">Hoth</option>
              <option value="jakku">Jakku</option>
              <option value="naboo">Naboo</option>
              <option value="tatooine">Tatooine</option>
            </select>
          </div>
        </HorizontalField>
        <HorizontalField
          label="Side"
          error={errors.side ? errors.side[0] : null}
        >
          <label className="radio">
            <input
              type="radio"
              name="side"
              value={RegistrationForm.SIDES.THE_DARK_SIDE}
              checked={side === RegistrationForm.SIDES.THE_DARK_SIDE}
              onChange={this.handleChange}
            />{' '}
            The Dark Side
          </label>
          <label className="radio">
            <input
              type="radio"
              name="side"
              value={RegistrationForm.SIDES.THE_FORCE}
              checked={side === RegistrationForm.SIDES.THE_FORCE}
              onChange={this.handleChange}
            />{' '}
            The Force
          </label>
        </HorizontalField>
        <HorizontalField
          label="Robots"
          error={errors.robots ? errors.robots[0] : null}
        >
          {Object.entries(RegistrationForm.ROBOTS).map(robot => (
            <label className="checkbox" key={robot[1]}>
              <input
                type="checkbox"
                name="robots"
                value={robot[1]}
                checked={robots.includes(robot[1])}
                onChange={this.handleChange}
              />{' '}
              {robot[1].toUpperCase()}
            </label>
          ))}
        </HorizontalField>
        <HorizontalFieldGrouped>
          <div className="control">
            <button type="submit" className="button is-info">
              Submit
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-text"
              onClick={() => this.reset()}
            >
              Reset
            </button>
          </div>
        </HorizontalFieldGrouped>
      </form>
    );
  }
}

export default RegistrationForm;

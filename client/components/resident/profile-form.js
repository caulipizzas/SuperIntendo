import React, {useState} from 'react'
import {makeOnChange, TextField} from '../utils'
import {updateProfile} from '../../store/resident'
import {connect} from 'react-redux'

export const ProfileForm = props => {
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
  const [address1, setAddress1] = useState(props.address1)
  const [address2, setAddress2] = useState(props.address2)
  const [city, setCity] = useState(props.city)
  const [state, setState] = useState(props.state)
  const [zipcode, setZipcode] = useState(props.zipcode)

  const onSubmit = event => {
    event.preventDefault()
    props.updateProfile({
      firstName,
      lastName,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zipcode
    })
  }

  return (
    <div className="body">
      <div>{/* <img src={props.photoUrl} /> */}</div>
      <div className="columns">
        <form onSubmit={onSubmit}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Basic Info</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={makeOnChange(setFirstName)}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={makeOnChange(setLastName)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label" />
            <div className="field-body">
              <div className="field is-expanded">
                <div className="field has-addons">
                  <p className="control">
                    <a className="button is-static">+1</a>
                  </p>
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={makeOnChange(setPhoneNumber)}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Alternative Address</label>
            </div>
            <div>
              <div className="field-body">
                <div className="field is-horizontal">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="Street Name"
                      value={address1}
                      onChange={makeOnChange(setAddress1)}
                    />
                  </p>
                </div>
                <div className="">
                  <div className="field is-horizontal">
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        placeholder="Apartment or Unit Number"
                        value={address2}
                        onChange={makeOnChange(setAddress2)}
                      />
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="field is-horizontal">
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={makeOnChange(setCity)}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="" />
              <div className="field is-horizontal">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={makeOnChange(setState)}
                  />
                </p>
              </div>
            </div>
            <div className="">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Zipcode"
                    value={zipcode}
                    onChange={makeOnChange(setZipcode)}
                  />
                </p>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label" />
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state.resident.self
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: updatedSelf => {
      dispatch(updateProfile(updatedSelf))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

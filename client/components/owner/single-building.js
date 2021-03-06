import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import {getABuilding, rejectUser, verifyUser} from '../../store/owner'
import '../css/owner/single-building.scss'
import News from './news'
import SingleBuildingHeader from './single-building-header'
import SingleBuildingResidents from './single-building-residents'
import Tickets from './single-building-tickets'
import SingleBuildingVacancy from './single-building-vacancy'
import SingleResident from './single-resident'

export const SingleBuilding = props => {
  useEffect(() => {
    props.getABuilding(props.match.params.id)
  }, [])

  if (!props.id) {
    return <div>Loading...</div>
  }

  const tickets = props.apartments
    .flatMap(apartment => apartment.tickets)
    .filter(ticket => ['pending', 'confirmed'].includes(ticket.status))
  const residents = props.apartments
    .map(apartment =>
      apartment.residents.map(resident => ({
        ...resident,
        number: apartment.unitNumber
      }))
    )
    .flat()
  const verifiedResidents = residents.filter(res => res.isVerified).sort()
  const unverifiedResidents = residents.filter(res => !res.isVerified).sort()
  const vacancies = props.apartments.filter(apt => apt.residents.length === 0)
  return (
    <div>
      <SingleBuildingHeader id={props.id} history={props.history} />
      <Switch>
        <Route
          path="/buildings/:id/residents/:residentId"
          exact
          component={() => (
            <SingleResident
              buildingAddress={props.address}
              residents={residents}
              verifyUser={props.verifyUser}
              rejectUser={props.rejectUser}
            />
          )}
        />
        <Route
          path="/buildings/:id/residents"
          component={() => (
            <SingleBuildingResidents
              verifiedResidents={verifiedResidents}
              unverifiedResidents={unverifiedResidents}
              id={props.id}
              verifyUser={props.verifyUser}
              rejectUser={props.rejectUser}
              getABuilding={props.getABuilding}
            />
          )}
        />
        <Route path="/buildings/:id/tickets" component={Tickets} />
        <Route path="/buildings/:id/news" component={News} />
        <Route
          path="*"
          component={() => (
            <SingleBuildingVacancy
              address={props.address}
              vacancies={vacancies}
              apartments={props.apartments}
            />
          )}
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state.owner.selectedBuilding
})

const mapDispatchToProps = dispatch => ({
  getABuilding: id => dispatch(getABuilding(id)),
  verifyUser: (bId, rId) => dispatch(verifyUser(bId, rId)),
  rejectUser: (bId, rId) => dispatch(rejectUser(bId, rId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBuilding)

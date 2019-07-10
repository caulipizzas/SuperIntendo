import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getWorkers, verifyWorker, rejectWorker} from '../../store/owner'

export const Workers = props => {
  useEffect(() => {
    props.getWorkers()
  }, [])

  return (
    <div>
      <h3>New Applicants</h3>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.workers.filter(worker => !worker.isVerified).map(worker => (
            <tr key={worker.id}>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>
                {/* <Link
                        to={`/buildings/${props.id}/residents/${resident.id}`}
                      >
                        details
                      </Link> */}
              </td>
              <td>
                <a
                  className="button is-success"
                  onClick={() => props.verifyWorker(worker.id)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-check" />
                  </span>
                  <span>Approve</span>
                </a>

                <a
                  className="button is-danger is-outlined"
                  onClick={() => props.rejectWorker(worker.id)}
                >
                  <span>Reject</span>
                  <span className="icon is-small">
                    <i className="fas fa-times" />
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  workers: state.owner.workers
})

const mapDispatchToProps = dispatch => ({
  getWorkers: () => dispatch(getWorkers()),
  verifyWorker: workerId => dispatch(verifyWorker(workerId)),
  rejectWorker: workerId => dispatch(rejectWorker(workerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Workers)

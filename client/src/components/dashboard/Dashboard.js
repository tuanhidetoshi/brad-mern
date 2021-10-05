import React from 'react';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { profile, loading } = useSelector(state => state.profile);

    React.useEffect(() => {
        dispatch(getCurrentProfile())
    }, [dispatch]);

    return loading && profile === null ? 
        <Spinner /> : 
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" />
                Welcome { user && user.name }
            </p>
            {
            profile ? 
            <>
                <DashboardActions />
                <Experience experiences={profile.experience} />
                <Education educations={profile.education} />
                
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                        <i className="fas fa-user-minus"></i> Delete My Account
                    </button>
                </div>
            </> : 
            <>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </>
            }
        </>
}

export default Dashboard;
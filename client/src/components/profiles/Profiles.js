import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import ProfileItem from '../profiles/ProfileItem';

const Profile = () => {
    const dispatch = useDispatch();
    const {profiles, loading} = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch])

    return (
        <>
            {loading ? 
            <Spinner /> : 
            <>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? 
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    )) : 
                    <h4>No profiles found...</h4>}
                </div>
            </>}
        </>
    )
}

export default Profile;
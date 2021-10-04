import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const alert = useSelector(state => state.alert)

    return (
        <>
            {alert && alert.length > 0 && alert.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ))}
        </>
    )
}

export default Alert;
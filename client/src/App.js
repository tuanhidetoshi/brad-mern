import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
// Redux
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/auth';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';

const App = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={ Landing } />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            <PrivateRoute exact path="/add-experience" component={ AddExperience } />
            <PrivateRoute exact path="/add-education" component={ AddEducation } />
          </Switch>
        </section>
      </>
    </Router>
    );
  }
export default App;

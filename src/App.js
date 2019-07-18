import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter } from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { autoLogin } from './redux/actions/authActions';


class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    }

    return (
      <div className="App">
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
});


export default compose(
  withRouter,
  connect(mapStateToProps, { autoLogin })
)(App);

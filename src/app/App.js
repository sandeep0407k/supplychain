import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import AppRoute from './AppRoute';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import User_Sidebar from './shared/User_Sidebar';
import Footer from './shared/Footer';
import CampaignIndex from './demo.js';

class App extends Component {
  state = {};
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : '';
    var a = 1;
    let sidebarComponent;
    let appRoute
    if (a === 2) {
      appRoute = !this.state.isFullPageLayout ? <AppRoutes /> : '';
      sidebarComponent = !this.state.isFullPageLayout ? <User_Sidebar /> : '';
    } else {
      appRoute = !this.state.isFullPageLayout ? <AppRoute /> : '';
      sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : '';

    }

    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              {appRoute}
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log('ROUTE CHANGED');
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      '/user-pages/login-1',
      '/user-pages/login-2',
      '/user-pages/register-1',
      '/user-pages/register-2',
      '/user-pages/lockscreen',
      '/error-pages/error-404',
      '/error-pages/error-500',
      '/general-pages/landing-page',
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector('.page-body-wrapper')
          .classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector('.page-body-wrapper')
          .classList.remove('full-page-wrapper');
      }
    }
  }
}

export default withRouter(App);

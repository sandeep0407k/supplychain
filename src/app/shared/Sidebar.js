import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },

      { path: '/user-pages', state: 'userPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html">
          <img src={require('../../assets/images/logo.PNG')} alt="logo" />
          </a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">
            <img
              src={require('../../assets/images/logo-mini.svg')}
              alt="logo"
            />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="profile-image">
                      <img
                        src={require('../../assets/images/faces/face8.jpg')}
                        alt="profile"
                      />
                    </div>
                    <div className="text-left ml-3">
                      <p className="profile-name"></p>
                      <small className="designation text-muted text-small">
                        Admin
                      </small>
                      <span className="status-indicator online"></span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item
                    className="dropdown-item p-0 preview-item d-flex align-items-center"
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item preview-item d-flex align-items-center text-small"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    Manage Accounts
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item preview-item d-flex align-items-center text-small"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    Change Password
                  </Dropdown.Item>
                  {/* <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Check Inbox
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    className="dropdown-item preview-item d-flex align-items-center text-small"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li
            className={
              this.isPathActive('/dashboard2') ? 'nav-item active' : 'nav-item'
            }
          >
            <Link className="nav-link" to="/dashboard2">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          {/* <li
            className={
              this.isPathActive('/user-pages/create-batch')
                ? 'nav-item active'
                : 'nav-item'
            }
          >
            <Link className="nav-link" to="/user-pages/create-batch">
              <i className="fa fa-pencil menu-icon"></i>
              <span className="menu-title">Create Batch</span>
            </Link>
          </li> */}
          <li
                     className={
                       this.isPathActive('/user-pages/search')
                         ? 'nav-item active'
                         : 'nav-item'
                     }
                   >
                     <Link className="nav-link" to="/user-pages/search">
                       <i className="fa fa-search menu-icon"></i>
                       <span className="menu-title">Search</span>
                     </Link>
                   </li>

                   <li
                     className={
                       this.isPathActive('/user-pages/fetch')
                         ? 'nav-item active'
                         : 'nav-item'
                     }
                   >
                   <Link className="nav-link" to="/user-pages/rej">
                     <i className="fa fa-ban menu-icon"></i>
                     <span className="menu-title">Block User</span>
                   </Link>
                 </li>

                 <li
                   className={
                     this.isPathActive('/user-pages/rej')
                       ? 'nav-item active'
                       : 'nav-item'
                   }
                 >
                     <Link className="nav-link" to="/user-pages/fetch">
                       <i className="fa fa-user menu-icon"></i>
                       <span className="menu-title">User Verification</span>
                     </Link>
                   </li>
                   <li
                     className={
                       this.isPathActive('/tables/issues')
                         ? 'nav-item active'
                         : 'nav-item'
                     }
                   >
                       <Link className="nav-link" to="/tables/issues">
                         <i className="fa fa-exclamation menu-icon"></i>
                         <span className="menu-title">Issues</span>
                       </Link>
                     </li>
                     <li
                       className={
                         this.isPathActive('/tables/issue-resolve')
                           ? 'nav-item active'
                           : 'nav-item'
                       }
                     >
                         <Link className="nav-link" to="/tables/issue-resolve">
                           <i className="fa fa-check menu-icon"></i>
                           <span className="menu-title">Issue Resolve</span>
                         </Link>
                       </li>


        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }
}

export default withRouter(Sidebar);

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update_user, remove_user } from '../store/action';
import { Navbar } from 'react-bootstrap'
// import { logOut, } from '../config/firebase';

class Navbar2 extends Component {
    constructor() {
        super()
        this.state = {
            homeIconLink: '/'
        }
        this._renderWithLogin = this._renderWithLogin.bind(this);
    }

    async componentDidMount() {
        this.props.update_user();
        if (this.props.user) {
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.user) {
            if (props.user.isRestaurant) {
                return {
                    updated_user: props.user,
                    homeIconLink: '/order-requests',
                    // homeIconLink: '/',
                }
            } else {
                return {
                    updated_user: props.user,
                }
            }
        } else {
            return {
                updated_user: {
                    isLogin: false,
                }
            }
        }
    }

    handleLogOutBtn() {
        this.props.remove_user()
        // console.log(this.props.history)
        this.props.history.push('/')
    }

    handleDashboard() {
        this.props.history.push('/dashboard')
    }

    _renderWithOutLogin() {
        return (
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <span className="nav-link active text mr-2"><a href="/">Home</a></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link active text mr-2"><Link to="/Stores">Stores</Link></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link text mr-2"><Link to="/login">Login / Register</Link></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link active text mr-2"><Link to="/Compare-items">Compare Items</Link></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link active text-uppercase mr-2"><Link to="/compare-items">compare items</Link></span>
                </li>
                <li className="nav-item">
                    <Link to="/register-store">
                        <button type="button" className="btn btn-warning btn-sm text mr-2 mr-1 px-3">Register Store</button>
                    </Link>
                </li>
            </ul>
        )
    }

    _renderWithLogin() {
        const { updated_user } = this.state
        if (updated_user.isRestaurant) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/add-menu-items">Add Items</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/my-items">My items</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2"><Link to="/order-requests">Order Requests</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleDashboard()}>Dashboard</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link active text mr-2"><Link to="/stores">Items</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text mr-2"><Link to="/my-orders">My Orders</Link></span>
                    </li>
                    <li className="nav-item">
<<<<<<< HEAD
                        <span className="nav-link active text mr-2"><Link to="/compare-items">Compare Items</Link></span>
=======
                        <span className="nav-link active text-uppercase mr-2"><Link to="/compare-items">compare items</Link></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span>
>>>>>>> master
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active text mr-2">{updated_user.userName}</span>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        }
    }

    render() {
        const { updated_user, homeIconLink } = this.state
        return (
            // Navbar
            <Navbar variant="dark" expand="lg">

                {/* Brand image */}
                <Navbar.Brand >
                    <Link className="navbar-brand" to={homeIconLink}>
<<<<<<< HEAD
                        <img alt="Kiryana store Logo" height="80px" width="100px" src={require("../assets/images/kiryanalogo1.png")} />
=======
                        <img alt="Kiryana store Logo" height="30px" width="190px" src={require("../assets/images/mainlogo.png")} />
>>>>>>> master
                        {/* <img alt="Kiryana store Logo" src={require("../assets/images/Pngtree.png")} height= "23" width = "190" /> */}
                        {/* <h4>KIRYANA STORE</h4> */}
                    </Link>
                </Navbar.Brand>

                {/* Collapse button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {updated_user.isLogin ? this._renderWithLogin() : this._renderWithOutLogin()}
                </Navbar.Collapse>

            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_user: () => dispatch(update_user()),
        remove_user: () => dispatch(remove_user())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);


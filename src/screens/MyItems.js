import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
// import firebase from '../config/firebase';
import { connect } from 'react-redux';
import { my_items } from '../store/action';
import firebase from '../config/firebase';
// import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore'

// import unknown from '../assets/images/unknown';


import 'bootstrap/dist/css/bootstrap.css';
import '../App.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyItems extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    async componentDidMount() {
        this.props.my_items();
    }

    static getDerivedStateFromProps(props) {
        const { user, myItems } = props
        return {
            userDetails: user,
            myItems: myItems,
        }
    }

    deleteItem = (i) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log("user uid => ", user.uid)
                firebase.firestore().collection('users').doc(user.uid).collection("menuItems").doc(i).delete();
                // firebase.storage.ref().child(`itemImage/${user.uid}/${i.itemImageUrl}`).delete();
            }
        });
        this.setState({
        })

        // console.log(i.itemImageUrl, "has been deleted")

    }

    _renderMyItemsList() {
        const { myItems } = this.state;
        if (myItems) {
            console.log(myItems);
            return Object.keys(myItems).map((val) => {
                return (
                    <div className="container pt-4 pb-2 border-bottom" key={val}>
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                {myItems[val].itemImageUrl  ? <img style={{ width: "70px", height: "70px" }} alt="items" src={myItems[val].itemImageUrl} />
                                :
                                <img style={{ width: "70px", height: "70px" }} alt="items" src={require('../assets/images/unknown.jpg')} />}
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-12 px-0">
                                <h6 className="">{myItems[val].itemTitle}</h6>
                                <p className="mb-1"><small>{myItems[val].itemIngredients}</small></p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-right">
                                <button onClick={() => this.deleteItem(myItems[val].id)} className="optionButtons btn btn-warning py-1 px-2 mx-1">Delete</button>
                                <span className="mx-3"><b>RS.{myItems[val].itemSalePrice}</b></span>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        const { userDetails } = this.state;
        // console.log(userDetails)
        return (
            <div>
                <div className="container-fluid res-details-cont1">
                    <div className="">
                        {/* <Navbar history={this.props.history} /> */}
                        <Navbar2 history={this.props.history} />
                        <div className="container px-0 res-details-cont1-text mx-0">
                            <div className="container">
                                {
                                    userDetails ? <div className="row">
                                        <div className="col-lg-2 col-md-3 col-6 text-lg-center text-md-center pr-0 mb-2">
                                            <img className="p-2 bg-white rounded text-center" alt="Natural Healthy Food" style={{ width: "60%" }} src={userDetails.userProfileImageUrl} />
                                        </div>
                                        <div className="col-lg-10 col-md-9 col-12 pl-lg-0 pl-md-0">
                                            <h1 className="restaurant-title">{userDetails.userName}</h1>
                                            {/* <p className="restaurant-text">{userDetails.typeOfFood.join(', ')}</p> */}
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-12 offset-lg-1 offset-md-1">
                                <div className="container">
                                    < div className="row">
                                        <div className="col-12 bg-white p-4">
                                            <h4 className="text-center">My Item List</h4>
                                            {this._renderMyItemsList()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = state => {
    // console.log("mapStateToProps states =>> ", state);
    return {
        user: state.user,
        myItems: state.myItems,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        my_items: () => dispatch(my_items()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);
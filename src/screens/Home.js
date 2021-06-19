import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.scss'
import { connect } from 'react-redux';
import { store_list } from '../store/action';
// import firebase from '../config/firebase';
// import * as firebase from 'firebase';
// import 'firebase/firestore'




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
    mapId : '509cf9f4ca660a97'
  };


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCgPnr32NjwYjZ21AyZEH7sBgWtXghncfk" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={24.9327156}
            lng={67.0583741}
            text="My Marker"
          />
        </GoogleMapReact>

      </div>
    );
  }
}

class Home extends Component {
  constructor() {
    super()
    this.state = {
      homeSearchBarText: "",
    }
    this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  
  async componentDidMount() {
    this.props.store_list();
  }

  handleSearchBar() {
    const { homeSearchBarText } = this.state
    if (homeSearchBarText) {
      this.props.history.push('/stores', this.state.homeSearchBarText)
    }
  }

  handleViewMenu(resDetails) {
    this.props.history.push('/store-details', resDetails)
  }

  handleOrderNowBtn() {
    this.props.history.push('/stores')
  }

  _renderStoreList() {
    const { storeList } = this.props;
    if (storeList) {
      return Object.keys(storeList).slice(0, 6).map((val) => {
        return (
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={storeList[val].id}>
            <div className="container res-shadow res-border">
              <div className="row p-3">
                <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                  <img style={{ width: "100%", height: "100%" }} alt="store" src={storeList[val].userProfileImageUrl} />
                </div>
                <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                  <h5 className="mb-1">{storeList[val].userName}</h5>
                  {/* <p className="mb-2"><small>{storeList[val].typeOfFood.join(', ')}</small></p> */}
                  <p>
                    <small className="">
                      <FontAwesomeIcon icon="star" className="rating mr-1" />
                      <FontAwesomeIcon icon="star" className="rating mr-1" />
                      <FontAwesomeIcon icon="star" className="rating mr-1" />
                      <FontAwesomeIcon icon="star" className="rating mr-1" />
                      <FontAwesomeIcon icon="star" className="rating mr-1" />
                    </small>
                    <small>(1) Review</small>
                  </p>
                  <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                </div>
              </div>
            </div>
          </div>

          // <div className="container bg-white p-3 px-0 mb-4" key={storeList[val].id}>
          //     <div className="row">
          //         <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
          //             <img style={{ width: "70%" }} alt="store image" src={storeList[val].userProfileImageUrl} />
          //         </div>
          //         <div className="col-lg-6 col-md-6 col-sm-12 px-0">
          //             <p>
          //                 <small className="">
          //                     <FontAwesomeIcon icon="star" className="rating mr-1" />
          //                     <FontAwesomeIcon icon="star" className="rating mr-1" />
          //                     <FontAwesomeIcon icon="star" className="rating mr-1" />
          //                     <FontAwesomeIcon icon="star" className="rating mr-1" />
          //                     <FontAwesomeIcon icon="star" className="rating mr-1" />
          //                 </small>
          //                 <small>(1) Review</small>
          //             </p>
          //             <h5 className="">{storeList[val].userName}</h5>
          //             <p className=""><small>Type of Items: <span>{storeList[val].typeOfFood.join(', ')}</span></small></p>
          //         </div>
          //         <div className="col-lg-3 col-md-3 col-sm-12 py-4 px-0">
          //             <span style={{ display: 'inline-block', textAlign: 'center', borderRadius: '3px', border: '1px solid #dddddd', padding: '6px 7px 0px 7px', marginRight: '16px' }} ><FontAwesomeIcon icon="heart" className="text-success" /></span>
          //             <button type="button" onClick={() => this.handleViewMenu(storeList[val])} className="btn btn-warning btn-sm text-uppercase" style={{ marginBottom: '8px' }}>View Menu</button>
          //         </div>
          //     </div>
          // </div>
        )
      })
    }
  }

  render() {
  //   firebase.firestore().collection('users').get().then((snapshot) => {
  //     console.log(snapshot.data())
        
  // })
  
    return (
      <div>
        {/* Home Navbar Section */}
        <div className="container-fluid home-cont1">
          <div className="">
            {/* <Navbar history={this.props.history} /> */}
            <Navbar2 history={this.props.history} />

            <div className="container home-cont1-text">
              <h2 className="h1 text text-white text-center mb-4"><strong>Your Best Source Of Groceries<br/> Easy And Safe</strong></h2>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <span className="input-group-text py-0" id="inputGroup-sizing-sm"><FontAwesomeIcon icon="search" />
                      <input type="text" className="form-control text" id="searchText" placeholder="Store Name" onChange={(e) => { this.setState({ homeSearchBarText: e.target.value }) }} />
                    </span>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12">
                    <button type="button" className="btn btn-warning mb-2 text-uppercase btn-block rounded-2" onClick={this.handleSearchBar}><b>Search</b></button>
                  </div>
                </div>
              </div>
              <div className="container text-white text-center mt-4">
                <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
                  {/* <img style={{ width: "95%" }} alt="" src={require("../assets/images/options-img.png")} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Number section */}
        <div className="container-fluid py-2 bg-warning">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p className="my-3 text-lg-right text-md-right text-center text-white"><b className="mr-2 h5">4</b>Grocery Stores</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p className="my-3 text-center text-white"><b className="mr-2 h5">10</b>Delivered to</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p className="my-3 text-lg-left text-md-left text-center text-white"><b className="mr-2 h5">20</b>Registered Users</p>
            </div>
          </div>
        </div>

        {/* Home How it work section */}
        <div className="container-fluid text-center py-4">
          <div className="py-4">
            <h2 className="h2 text-uppercase">How It Works</h2>
            <p>It is as simple as:</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Restaurant" height="47px" width="60px" src={require("../assets/images/how-to-work2.png")} />
                </span>
                <h3 className="h3 mb-4">Choose A Store</h3>
                <p className="mb-4">Choose the best priced store by comparing prices.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Tasty Dish" height="55px" width="60px" src={require("../assets/images/pngkey.png")} />
                </span>
                <h3 className="h3 mb-4">Select Items</h3>
                <p className="mb-4">Select the items you want to buy.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Pick Up Or Delivery" height="47px" width="70px" src={require("../assets/images/how-to-work1.png")} />
                </span>
                <h3 className="h3 mb-4">We Deliver</h3>
                <p className="mb-4">And we deliver it to you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Order now section */}
        <div className="container-fluid text-center py-5 home-cont3">
          <p className="h1 text-uppercase text-white mt-5 mb-3">Order Now And We Deliver You.</p>
          <p className="text-white mb-3">Order Groceries now from us and we deliver them at the ease of your home.</p>
          <button type="button" className="btn btn-warning text-uppercase mb-5" onClick={() => this.handleOrderNowBtn()}><b>Order Now</b></button>
        </div>

        {/* Home Featured restaurant section */}
        <div className="container-fluid py-5">
          <div className="py-4">
            <h2 className="h2 text-uppercase text-center">Featured Stores</h2>
            <p className="text-center">Our most popular stores.</p>
          </div>


          <div className="container">
            <div className="row">





              {this._renderStoreList()}
               {/* <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Natural Healthy Food" src={require("../assets/images/listing-logo03.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Natural Healthy Store</h5>
                      <p className="mb-2"><small>Apple Juice, Beef Roast, Cheese slices</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>  */}



            </div>
          </div>
        </div>
        {/* Home Footer */}
        <SimpleMap />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeList: state.storeList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_list: () => dispatch(store_list()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
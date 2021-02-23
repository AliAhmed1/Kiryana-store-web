import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDP3KenbRYn_M115xT0zlQcjKBNeIrkk3s" }}
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

  handleSearchBar() {
    const { homeSearchBarText } = this.state
    if (homeSearchBarText) {
      this.props.history.push('/restaurants', this.state.homeSearchBarText)
    }
  }

  handleOrderNowBtn(){
    this.props.history.push('/restaurants')
  }

  render() {
    return (
      <div>
        {/* Home Navbar Section */}
        <div className="container-fluid home-cont1">
          <div className="">
            {/* <Navbar history={this.props.history} /> */}
            <Navbar2 history={this.props.history} />
           
            <div className="container home-cont1-text">
              <h1 className="h1 text-uppercase text-white text-center mb-4"><strong>Best Grocery store <br /> Easy And Safe</strong></h1>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <input type="text" className="form-control text-uppercase" id="searchText" placeholder="Store Name" onChange={(e) => { this.setState({ homeSearchBarText: e.target.value }) }} />
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
              <p className="my-3 text-lg-right text-md-right text-center text-white"><b className="mr-2 h5">18</b>Grocery Stores</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p className="my-3 text-center text-white"><b className="mr-2 h5">9</b>People Served</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p className="my-3 text-lg-left text-md-left text-center text-white"><b className="mr-2 h5">44</b>Registered Users</p>
            </div>
          </div>
        </div>

        {/* Home How it work section */}
        <div className="container-fluid text-center py-4">
          <div className="py-4">
            <h2 className="h2 text-uppercase">How It Works</h2>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Restaurant" src={require("../assets/images/how-to-work2.png")} />
                </span>
                <h3 className="h3 mb-4">Choose A Store</h3>
                <p className="mb-4">Cras vitae dictum velit. Duis at purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Tasty Dish" src={require("../assets/images/how-to-work3.png")} />
                </span>
                <h3 className="h3 mb-4">Choose A Items</h3>
                <p className="mb-4">Dictum velit. Duis at purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Pick Up Or Delivery" src={require("../assets/images/how-to-work1.png")} />
                </span>
                <h3 className="h3 mb-4">Pick Up Or Delivery</h3>
                <p className="mb-4">Purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Order now section */}
        <div className="container-fluid text-center py-5 home-cont3">
          <p className="h1 text-uppercase text-white mt-5 mb-3">Just Order And We Will Deliver You</p>
          <p className="text-white mb-3">Pellentesque eget justo eget nibh luctus semper at ut tellus.</p>
          <button type="button" className="btn btn-warning text-uppercase mb-5" onClick={() => this.handleOrderNowBtn()}><b>Order Now</b></button>
        </div>

        {/* Home Featured restaurant section */}
        <div className="container-fluid py-5">
          <div className="py-4">
            <h2 className="h2 text-uppercase text-center">Featured Stores</h2>
            <p className="text-center">Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
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
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Menu & Drinks" src={require("../assets/images/listing-logo09.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Menu &amp; groceries</h5>
                      <p className="mb-2"><small>Chicken Frozen, Chines salt, Cold drinks</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(3) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Chefs" src={require("../assets/images/listing-logo12.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Chef store</h5>
                      <p className="mb-2"><small>Eggs, Noodles, Pastry</small></p>
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
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Menu's" src={require("../assets/images/listing-logo15.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">store In</h5>
                      <p className="mb-2"><small>Fish Frozen, Fresh Juice, Salt</small></p>
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
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Food N&H" src={require("../assets/images/2.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Grocery N&amp;H</h5>
                      <p className="mb-2"><small>Pepper, drinks, hazelnut</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(4) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "70%" }} alt="Restaurant" src={require("../assets/images/listing-logo13.png")} />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Middle shop</h5>
                      <p className="mb-2"><small>Apple Juice, soda</small></p>
                      <p>
                        <small className="">
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                          <FontAwesomeIcon icon="star" className="rating mr-1" />
                        </small>
                        <small>(2) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SimpleMap/>
        {/* Home Footer */}
        <Footer />
      </div>
    );
  }
}

export default Home;
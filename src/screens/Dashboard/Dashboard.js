import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
// import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.css';
import { order_request } from '../../store/action';
import { my_items } from '../../store/action';



// import { VectorMap } from "react-jvectormap"
// import './Dashboard.scss'
import Navbar2 from '../../components/Navbar2';
import Footer from '../../components/Footer';
// import firebase from '../../config/firebase';
import { connect } from 'react-redux';


class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      revenue: 100,
      totalOrder: 0,
      items: 0,
      profit: 25,
      actualPrice: 50
    }
  }
  static getDerivedStateFromProps(props) {
    const { user, myItems } = props
    return {
      userDetails: user,
      myItems: myItems,

    }
  }
  async componentDidMount() {
    this.props.order_request();
    this.props.my_items();
  }

  chartHistoryData = (rev , act , pro) => {
    
    let data = [rev,act,pro]
    let chart = {
      labels: ["Revenue", "ActualTotalPrice", "Profit"],
      datasets: [{
        data: data,
        backgroundColor: [
          "#111111", "#00d25b", "#ffab00"
        ]
      }
      ]
    }
    return chart
  }

  chartHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  _renderTable() {
    const { orderRequest } = this.props;
    // console.log(this.props.orderRequest)
    if (orderRequest) {
      return (
        <div className="card-body">
          <h4 className="card-title">Order Status</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> Client Name </th>
                  <th> Order Id </th>
                  <th> Product Cost </th>

                  <th> City </th>
                  <th> Country </th>
                  <th> Delivery Status </th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(orderRequest).map((val, key) => {
                  return (
                    // <div >
                    <tr key={key}>
                      <td>
                        <div className="d-flex">
                          {/* <img src={require('../../assets/images/2.png')} alt="face" /> */}
                          <span className="pl-2">{orderRequest[val].userName}</span>
                        </div>
                      </td>
                      <td> {orderRequest[val].id.slice(0, 6)} </td>
                      <td> {orderRequest[val].totalPrice} </td>
                      <td> {orderRequest[val].userCity} </td>
                      <td> {orderRequest[val].userCountry} </td>
                      <td>
                        <div className="badge badge-outline-success">{orderRequest[val].status}</div>
                      </td>
                    </tr>
                    // </div>
                  )
                })}
              </tbody>

            </table>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="card-body"><h4>No Order Found</h4></div>
      )
    }
  }


  handleRevenue() {
    const order = this.props.orderRequest;
    let rev = 0;
    let prft = 0;


    if (order) {
      // console.log(order.totalPrice)

      for (let i = 0; i < order.length; i++) {
        rev = rev + order[i].totalPrice
        prft += order[i].totalActualPrice
      }

      this.state.profit = rev - prft
      this.state.revenue = rev
      this.state.totalOrder = order.length
      this.state.actualPrice = prft
      // console.log(rev)
    }

    if (this.props.myItems) {
      this.state.items = this.props.myItems.length
    }

    return (
      <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-9">
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="mb-0">Rs{this.state.revenue}</h3>
                  {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                </div>
              </div>
              <div className="col-3">
                <div className="icon icon-box-success ">
                  <span className="mdi mdi-arrow-top-right icon-item"></span>
                </div>
              </div>
            </div>
            <h6 className="text-muted font-weight-normal">Revenue</h6>

          </div>
        </div>
      </div>
    )
  }


  render() {
    const { userDetails } = this.state;
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
                      {/* <p className="restaurant-text">{userDetails.typeOfFood && userDetails.typeOfFood.join(', ')}</p> */}
                    </div>
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-3">
          <div className="row">

            {this.handleRevenue()}


            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">Rs{this.state.profit}</h3>
                        {/* <p className="text-success ml-2 mb-0 font-weight-medium">+11%</p> */}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-success">
                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Profit</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">{this.state.totalOrder}</h3>
                        {/* <p className="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p> */}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-danger">
                        <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Total Orders</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">{this.state.items}</h3>
                        {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-success ">
                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Store Items</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Transaction History</h4>
                  <div className="aligner-wrapper my-2">
                    <Doughnut data={this.chartHistoryData(this.state.revenue,this.state.actualPrice, this.state.profit)} options={this.chartHistoryOptions} />
                  
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                {this._renderTable()}
              </div>
            </div>
          </div>
         
        </div>
        <Footer />
      </div>
    )
  }
}


const mapStateToProps = state => {
  // console.log("mapStateToProps states =>> ", state);
  return {
    user: state.user,
    orderRequest: state.orderRequest,
    myItems: state.myItems,


  }
}
const mapDispatchToProps = dispatch => {
  return {
    order_request: () => dispatch(order_request()),
    my_items: () => dispatch(my_items()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
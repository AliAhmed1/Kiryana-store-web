import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { store_list } from '../store/action';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Stores extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            defaultSearchValue: "",
            renderStoreList: true,
            renderCategorizedStores: false,
            renderSearchStores: false,
        }
        this.handleCategoriesCheckbox = this.handleCategoriesCheckbox.bind(this);
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    async componentDidMount() {
        this.props.store_list();
        const { state } = this.props.location
            if (state) {
                this.setState({
                    defaultSearchValue: state,
                })
                this.handleSearchBar(state)
            }
    }

    


    handleCategoriesCheckbox(event) {
        const { categories, } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (value) {
            categories.push(name);
            this.setState({
                categories: categories,
                renderStoreList: false,
                renderCategorizedStores: true,
            })
            if (categories.length > 0) {
                this._renderCategorizedStores()
            } else {
                this.setState({
                    renderStoreList: true,
                    renderCategorizedStores: false,
                })
            }
        } else {
            const index = categories.indexOf(name);
            if (index > -1) {
                categories.splice(index, 1);
                this.setState({
                    categories: categories,
                    renderStoreList: false,
                    renderCategorizedStores: true,
                })
                if (categories.length > 0) {
                    this._renderCategorizedStores()
                } else {
                    this.setState({
                        renderStoreList: true,
                        renderCategorizedStores: false,
                    })
                }
            }
        }
    }

    handleSearchBar(event) {
        const searchText = event;
        const { storeList } = this.props;
        if (storeList) {
            Object.keys(storeList).map((val) => { });
            const result = storeList.filter((val) => {
                return val.userName.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
            })
            // console.log(result)
            if (searchText.length > 0) {
                this.setState({
                    renderStoreList: false,
                    renderCategorizedStores: false,
                    renderSearchStores: true,
                    searchStores: result,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                })
            } else {
                this.setState({
                    renderStoreList: true,
                    renderCategorizedStores: false,
                    renderSearchStores: false,
                    searchStores: result,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                })
            }
        }
    }

    handleViewMenuBtn(resDetails) {
        this.props.history.push('/store-details', resDetails)
    }

    _renderStoreList() {
        const { storeList } = this.props;
        if (storeList) {
            return Object.keys(storeList).map((val) => {
                return (
                    <div className="container bg-white p-3 px-0 mb-4" key={storeList[val].id}>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <img style={{ width: "70%" }} alt="Natural Healthy Food" src={storeList[val].userProfileImageUrl} />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 px-0">
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
                                <h5 className="">{storeList[val].userName}</h5>
                                <p className=""><small>Type of Items: <span>{storeList[val].typeOfFood.join(', ')}</span></small></p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 py-4 px-0">
                                <span style={{ display: 'inline-block', textAlign: 'center', borderRadius: '3px', border: '1px solid #dddddd', padding: '6px 7px 0px 7px', marginRight: '16px' }} ><FontAwesomeIcon icon="heart" className="text-success" /></span>
                                <button type="button" onClick={() => this.handleViewMenuBtn(storeList[val])} className="btn btn-warning btn-sm text-uppercase" style={{ marginBottom: '8px' }}>View Menu</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    _renderCategorizedStores() {
        const { storeList } = this.props;
        const { categories, } = this.state;
        if (storeList) {
            return Object.keys(storeList).map((val) => {
                return storeList[val].typeOfFood.map((e1) => {
                    return categories.map((e2) => {
                        if (e1 === e2) {
                            // console.log("storeList[val].userName => ", storeList[val].userName)
                            return (
                                <div className="container bg-white p-3 px-0 mb-4" key={storeList[val].id}>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                            <img style={{ width: "70%" }} alt="Natural Healthy Food" src={storeList[val].userProfileImageUrl} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 px-0">
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
                                            <h5 className="">{storeList[val].userName}</h5>
                                            <p className=""><small>Type of Items: <span>{storeList[val].typeOfFood.join(', ')}</span></small></p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12 py-4 px-0">
                                            <span style={{ display: 'inline-block', textAlign: 'center', borderRadius: '3px', border: '1px solid #dddddd', padding: '6px 7px 0px 7px', marginRight: '16px' }} ><FontAwesomeIcon icon="heart" className="text-success" /></span>
                                            <button type="button" onClick={() => this.handleViewMenuBtn(storeList[val])} className="btn btn-warning btn-sm text-uppercase" style={{ marginBottom: '8px' }}>View Menu</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                })
            })
        }
    }

    _renderSearchStores() {
        const { searchText, searchStores } = this.state;
        if (searchStores) {
            return Object.keys(searchStores).map((val) => {
                return (
                    <div className="container bg-white p-3 px-0 mb-4" key={searchStores[val].id}>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-center">
                                <img style={{ width: "70%" }} alt="Natural Healthy Food" src={searchStores[val].userProfileImageUrl} />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 px-0">
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
                                <h5 className="">{searchStores[val].userName}</h5>
                                <p className=""><small>Type of Items: <span>{searchStores[val].typeOfFood.join(', ')}</span></small></p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 py-4 px-0">
                                <span style={{ display: 'inline-block', textAlign: 'center', borderRadius: '3px', border: '1px solid #dddddd', padding: '6px 7px 0px 7px', marginRight: '16px' }} ><FontAwesomeIcon icon="heart" className="text-success" /></span>
                                <button type="button" onClick={() => this.handleViewMenuBtn(searchStores[val])} className="btn btn-warning btn-sm text-uppercase" style={{ marginBottom: '8px' }}>View Menu</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        const { renderStoreList, renderCategorizedStores, renderSearchStores, defaultSearchValue } = this.state;
        return (
            <div>
                <div className="container-fluid stores-cont5">
                    <div className="">
                        {/* <Navbar history={this.props.history} /> */}
                        <Navbar2 history={this.props.history} />
                        <div className="container px-0 stores-cont5-text">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-sm"><FontAwesomeIcon icon="search" /></span>
                                            </div>
                                            <input type="text" value={defaultSearchValue} onChange={(e) => this.handleSearchBar(e.target.value)} className="form-control" placeholder="STORE NAME" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12">
                                <div className="listing-filter">
                                    <div className="filter-heading py-2 mb-3">
                                        <h6 className="m-0"><FontAwesomeIcon icon="utensils" className="mr-2" />Categories</h6>
                                    </div>
                                    <div>
                                        <ul className="filter-list">
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="apple-juice" name="Juice" onChange={this.handleCategoriesCheckbox} />
                                                    <label className="custom-control-label" htmlFor="apple-juice">Juice</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="bbq" name="BB.Q" onChange={this.handleCategoriesCheckbox} />
                                                    <label className="custom-control-label" htmlFor="bbq">Bread</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="beef-roast" name="Beef" onChange={this.handleCategoriesCheckbox} />
                                                    <label className="custom-control-label" htmlFor="beef-roast">Beef</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="chicken-roast" name="Chicken Roast" onChange={this.handleCategoriesCheckbox} />
                                                    <label className="custom-control-label" htmlFor="chicken-roast">Chicken Frozen</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="cheese-burger" name="Cheese" onChange={this.handleCategoriesCheckbox} />
                                                    <label className="custom-control-label" htmlFor="cheese-burger">Cheese</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="cold-coffee" name="Cold Coffee" onChange={this.handleCategoriesCheckbox} />
                                                    <label className="custom-control-label" htmlFor="cold-coffee">Cold drink</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                <h4 className="mb-3">Store's Found</h4>
                                <div className="container px-0">
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4 px-0">
                                        {renderSearchStores && this._renderSearchStores()}
                                        {renderCategorizedStores && this._renderCategorizedStores()}
                                        {renderStoreList && this._renderStoreList()}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                <div className="container bg-white py-3 sort-by">
                                    <h5>Sort By</h5>
                                    <ul>
                                        <li>
                                            <FontAwesomeIcon icon="thumbs-up" className="mr-3" />
                                            <span>Best Match</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="sort-alpha-down" className="mr-3" />
                                            <span>Alphabetical</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="star" className="mr-3" />
                                            <span>Ratings</span>
                                        </li>
                                        {/* <li>
                                            <FontAwesomeIcon icon="user-minus" className="mr-3"/>
                                            <span>Minimum order value</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="dollar-sign" className="mr-3"/>
                                            <span>Delivery fee</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon="angle-double-right" className="mr-3"/>
                                            <span>Fastest delivery</span>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stores);

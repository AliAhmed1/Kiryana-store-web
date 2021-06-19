import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import * as firebase from 'firebase';
import 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.scss'


class CompareItems extends Component {
    constructor() {
        super()
        this.state = {
            compareItemsList: [],
            defaultSearchValue: "",
            renderCompareItems: false,
            searchCompareItems: []
        }
    }


    async componentDidMount() {
        const db = firebase.firestore()
        db.collection('users').onSnapshot(snapshot => {   // getting all stores including store items
            const storeList = [];
            const compareItemsList = [];

            snapshot.forEach(doc => {
                if (doc.data().isRestaurant) {
                    const obj = { id: doc.id, ...doc.data() }
                    storeList.push(obj);
                }
            })
            for (var i in storeList) {
                console.log(storeList[i].userName)
                let storeName = storeList[i].userName
                db.collection('users').doc(storeList[i].id).collection("menuItems").onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data(), storeName }
                        compareItemsList.push(obj)

                    })
                })

            }
            console.log(compareItemsList)
            console.log(storeList)

            this.setState({
                compareItemsList: compareItemsList
            })
        })
    }


    handleSearchBar(event) {
        const searchText = event;
        console.log(searchText)
        const { compareItemsList } = this.state;
        if (compareItemsList) {
            Object.keys(compareItemsList).map((val) => { });
            const result = compareItemsList.filter((val) => {
                return val.itemIngredients.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
            })
            // console.log(result)
            if (searchText.length > 0) {
                this.setState({
                    renderCompareItems: true,
                    searchCompareItems: result,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                })
            } else {
                this.setState({
                    renderCompareItems: false,
                    searchCompareItems: result,
                    searchText: searchText,
                    defaultSearchValue: searchText,
                })
            }
        }
    }

    // getcompareItems() {

    // }


    _renderSearchCompareItems() {
        const { searchCompareItems, renderCompareItems } = this.state;
        if (searchCompareItems) {
            let obj = [...searchCompareItems]
            obj.sort((a, b) => a.itemSalePrice > b.itemSalePrice ? 1 : -1)
            return Object.keys(obj).map((val) => {
                return (
                    <div className="border-bottom pb-2 px-lg-0 px-md-0 mb-4" key={obj[val].id}>
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                <img style={{ width: "70px", height: "70px" }} alt="item image" src={obj[val].itemImageUrl} />
                            </div>
                            <div className="col-lg-7 col-md-6 text-lg-left text-center px-4 d-flex flex-column justify-content-center">
                                <h5>{obj[val].storeName}</h5>
                                <h6 className="">{obj[val].itemTitle}</h6>
                                <p className=""><small>{obj[val].itemIngredients}</small></p>
                            </div>
                            <div className="col-lg-3 col-md-3 text-center">
                                <span className="mx-3">RS.{obj[val].itemSalePrice}</span>
                                {/* <span className="compareItemsListAddBtn" onClick={() => this.addToCart(obj[val])} ><FontAwesomeIcon icon="plus" className="text-warning" /></span> */}
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else{
            return(
                <div className="text-center my-4 py-4">
                    <h6>No record Found</h6>
                </div>
            )
        }
    }


    render() {
        const { defaultSearchValue, renderCompareItems } = this.state;
        return (
            <div>
                <div className="container-fluid stores-cont1">
                    <div className="">
                        {/* <Navbar history={this.props.history} /> */}
                        <Navbar2 history={this.props.history} />

                        <div className="container px-0 stores-cont2-text">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
<<<<<<< HEAD
                                        <h2 className="h2 text text-center mb-4"><strong>Compare store item prices<br />search for the lowest price product</strong></h2>
=======
                                        <h2 className="h2 text-uppercase text-white text-center mb-4"><strong>Compare store item prices<br />search for the lowest price product</strong></h2>
>>>>>>> master

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-sm"><FontAwesomeIcon icon="search" /></span>
                                            </div>
                                            <input type="text" value={defaultSearchValue} onChange={(e) => this.handleSearchBar(e.target.value)} className="form-control" placeholder="SEARCH" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-4 px-2">
                    <h4 className="my-4 text-center px-lg-0 px-md-0">Compare Result</h4>
                    
                    <div className="px-0">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4 px-0">
                            {renderCompareItems && this._renderSearchCompareItems()}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CompareItems;
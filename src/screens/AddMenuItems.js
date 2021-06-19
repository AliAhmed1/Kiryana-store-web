import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { addItem } from '../config/firebase';
import Swal from 'sweetalert2'


import 'bootstrap/dist/css/bootstrap.css';
import '../App.scss'


export default class AddMenuItems extends Component {
    constructor() {
        super()
        this.state = {
            itemImageLable: "Choose image",
            itemTitle: "",
            itemIngredients: "",
            itemPrice: "",
            itemSalePrice: "",
            itemImage: "",
            chooseItemType: "",
            showError: false,
            registerFormError: "",
        }
        this.handleItemImage = this.handleItemImage.bind(this)
        this.handleAddYourItemBtn = this.handleAddYourItemBtn.bind(this)
    }

    handleItemImage(e) {
        if (e.target.files[0] != null) {
            this.setState({
                itemImageLable: e.target.files[0].name,
                itemImage: e.target.files[0]
            });
        } else {
            this.setState({
                itemImageLable: "Choose image",
                itemImage: "",
            });
        }
    }

    async handleAddYourItemBtn() {
        const { itemTitle, itemIngredients,itemSalePrice, itemPrice, itemImage, chooseItemType, } = this.state
        if (!itemTitle) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item title."
            })
        } else if (!itemIngredients) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item ingredients."
            })
        } else if (!itemPrice) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item price."
            })
        }
        else if (!itemSalePrice) {
            this.setState({
                showError: true,
                registerFormError: "Invalid item price."
            })
        }
        else if (!itemImage) {
            this.setState({
                showError: true,
                registerFormError: "Image is required."
            })
        }
        else if (!chooseItemType) {
            this.setState({
                showError: true,
                registerFormError: "Must be selected any one."
            })
        } else {
            this.setState({
                showError: false,
                registerFormError: ""
            })
            const itemDetails = {
                itemTitle, itemIngredients, itemPrice, itemSalePrice , itemImage, chooseItemType, propsHistory: this.props.history,
            }
            try {
                const addItemReturn = await addItem(itemDetails)
                // console.log(addItemReturn)
                Swal.fire({
                    title: 'Success',
                    text: addItemReturn,
                    type: 'success',
                }).then(() => {
                    this.props.history.push('/my-items')
                })
            } catch (error) {
                // console.log("Error in add menu items => ", error)
                Swal.fire({
                    title: 'Error',
                    text: error,
                    type: 'error',
                })
            }
        }
    }

    render() {
        const { itemImageLable, showError, registerFormError } = this.state;
        return (
            <div>
                <div className="container-fluid register-cont1">
                    <div className="">
                        {/* <Navbar history={this.props.history} /> */}
                        <Navbar2 history={this.props.history} />
                        <div className="container register-cont1-text">
                            <h2 className="text text-white text-center mb-4"><strong>Add Your Best Store Items</strong></h2>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-5 bg-light">
                    <div className="col-lg-6 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
                        <h2 className="text-center mb-4">Add Menu Items</h2>
                        <form action="javascript:void(0)">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemTitle"><b>Item Title</b></label>
                                    <input type="text" className="form-control" id="itemTitle" placeholder="Full name of dish" onChange={(e) => this.setState({ itemTitle: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemIngredients"><b>Item Ingredients</b></label>
                                    <input type="text" className="form-control" id="itemIngredients" placeholder="Item Ingredients Name" onChange={(e) => this.setState({ itemIngredients: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemPrice"><b>Actual Price</b></label>
                                    <input type="number" className="form-control" id="itemPrice" placeholder="Price in number" onChange={(e) => this.setState({ itemPrice: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemSalePrice"><b>Selling Price</b></label>
                                    <input type="number" className="form-control" id="itemSalePrice" placeholder="Price in number" onChange={(e) => this.setState({ itemSalePrice: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-2"><b>Item Image</b></label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="itemImage" onChange={this.handleItemImage} />
                                        <label className="custom-file-label" htmlFor="itemImage">{itemImageLable}</label>
                                    </div>
                                </div>
                            </div>
                            <label className="mb-2"><b>Choose Item Type</b></label>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Meat" value="Meat" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Meat">Meat</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Snacks" value="Snacks" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Snacks">Snacks</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Rice" value="Rice" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Rice">Rice</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Drink" value="Drink" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Drink">Drink</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="sauces" value="sauces" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="sauces">Sauces</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="vegetables" value="vegetables" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="vegetables">vegetables</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Normal Item" value="Normal Item" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Normal Item">Normal Item</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="Other" value="Other" name="chooseItemType" onChange={(e) => this.setState({ chooseItemType: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="Other">Other</label>
                                    </div>
                                </div>
                            </div>
                            {showError ? <p className="text-danger">{registerFormError}</p> : null}
                            <button type="submit" className="btn btn-warning text-uppercase mb-3" onClick={this.handleAddYourItemBtn} ><b>Add your item</b></button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
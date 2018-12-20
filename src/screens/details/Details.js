import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Details.css';

const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit * -0.25,
	},
	left: {
		float: 'left'
	},
	right: {
		float: 'right'
	}
});

class Details extends Component {

    constructor() {

        super();
        this.state = {

            open: false,
            vertical: 'top',
            horizontal: 'center',
            cartNotificationMessage: '',
            cartItems: [],
            totalCartItemsValue: 0,
            restaurantData: undefined,
        }
	}

	async componentWillMount() {
		const { match, apiClient } = this.props;

		const restaurantData = await apiClient.getRestauratsById(match.params.restaurantID);
		this.setState({
			restaurantData
		})
	}


    addMenuItemClickHandler = (item) => {
        //set new attribute quantity for the cart
        let newCartItems = this.state.cartItems;
        let itemAlreadyAdded = false;
        if (newCartItems != null) {
            for (var i = 0; i < newCartItems.length; i++) {
                if (newCartItems[i].id === item.id) {
                    item.quantity = item.quantity + 1;
                    item.totalPrice = item.quantity * item.price;
                    itemAlreadyAdded = true;
                    break;
                }
            }
        }
        if (!itemAlreadyAdded) {
            item.quantity = 1;
            item.totalPrice = item.quantity * item.price;
            newCartItems.push(item);
        }
        this.setState({ cartItems: newCartItems, open: true, cartNotificationMessage: 'Item added to cart!' });
        this.updateTotalCartItemsValue(true, item.price);
    };

    addCartItemClickHandler = (item) => {
        item.quantity = item.quantity + 1;
        this.setState({ open: true, cartNotificationMessage: 'Item quantity increased by 1!' });
        this.updateTotalCartItemsValue(true, item.price);
    };

    removeCartItemClickHandler = (item) => {
        let removeCartItems = this.state.cartItems;
        for (var i = 0; i < removeCartItems.length; i++) {
            if (removeCartItems[i].id === item.id) {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    item.totalPrice = item.quantity * item.price;
                } else {
                    removeCartItems.splice(i, 1);
                    item.totalPrice = 0;
                }
            }
        }
        this.setState({ cartItems: removeCartItems, open: true, cartNotificationMessage: 'Item quantity decreased by 1!' });
        this.updateTotalCartItemsValue(false, item.price);
    };

    updateTotalCartItemsValue(isAdded, price) {
        let newTotalCartItemsValue = this.state.totalCartItemsValue;
        if (isAdded) {
            newTotalCartItemsValue = newTotalCartItemsValue + price;
        } else {
            newTotalCartItemsValue = newTotalCartItemsValue - price;
        }
        this.setState({ totalCartItemsValue: newTotalCartItemsValue });
    }

    onClickCheckoutButton = state => () => {
        this.setState({ open: true, ...state });
        this.props.history.push({
            pathname: '/checkout',
            orderSummary: this.state
        })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        let restaurantData = this.state.restaurantData;
        return (
            <div>
                <Header
                showSearchBox={false}
                showCategories={false}
                />
                {restaurantData !== undefined && <div>
                    <div className="details-header-bg">
						<img className="restImg" src={restaurantData.photoUrl} alt="RestaurantImage" />
						<div>

							<Typography gutterBottom variant="h5" component="h2">
								{restaurantData.restaurantName}
							</Typography>
							<br />
							<Typography>{restaurantData.address.locality}</Typography>
							<br />
						</div>
						<Typography>
							{restaurantData.categories.map(category => (
								<span key={"category" + category.id}>{category.categoryName}, </span>
							))}
						</Typography>
						<br />
						<Typography>{restaurantData.userRating}</Typography>
						<Typography>AVERAGE RATING BY <br />{restaurantData.numberUsersRated} USERS</Typography>
						{restaurantData.avgPrice * 2} <br /> AVERAGE COST FOR <br />TWO PEOPLE
                    </div>
                    <div className="menu-cart-items">
                        <div className="menu-items">
                            {restaurantData.categories.map(category => (
                                <div key={"categoryItems" + category.id}>
                                    <h2 className="category-name">{category.categoryName}
                                        <Divider />
                                    </h2>
                                    {category.items.map(item => (
                                        <div key={"item" + item.id}>
                                            <span>{item.type === 'Veg' &&
                                                <i className="fa fa-stop-circle-o veg-item-color" aria-hidden="true"></i>}
                                                {item.type === 'Non-Veg' &&
                                                    <i className="fa fa-stop-circle-o non-veg-item-color" aria-hidden="true"></i>}
                                            </span>
                                            <span>{item.itemName}</span>
                                            <span>{item.price}</span>
                                            <span>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.addMenuItemClickHandler(item)}>
                                                    <Add />
                                                </IconButton></span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="my-cart">
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Badge badgeContent={this.state.cartItems.length} color="primary" classes={{ badge: classes.margin }}>
                                            <ShoppingCart />
                                        </Badge>
                                        My Cart
                                    </Typography>
                                    {this.state.cartItems.map(item => (
                                        <div key={"item" + item.id}>
                                            <span>{item.type === 'Veg' &&
                                                <i className="fa fa-stop-circle-o veg-item-color" aria-hidden="true"></i>}
                                                {item.type === 'Non-Veg' &&
                                                    <i className="fa fa-stop-circle-o non-veg-item-color" aria-hidden="true"></i>}
                                            </span>
                                            <span>{item.itemName}</span>
                                            <span>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.removeCartItemClickHandler(item)}>
                                                    <Remove />
                                                </IconButton>
                                            </span>
                                            <span>{item.quantity}</span>
                                            <span>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.addCartItemClickHandler(item)}>
                                                    <Add />
                                                </IconButton>
                                            </span>
                                            <span>{item.totalPrice}</span>
                                        </div>
                                    ))}
                                    TOTAL AMOUNT {this.state.totalCartItemsValue}
                                    <br />
                                    <Button variant="contained" color="primary"
                                        onClick={this.onClickCheckoutButton({ vertical: 'bottom', horizontal: 'left' })}>
                                        CHECKOUT
                                    </Button>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.cartNotificationMessage}</span>}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>}
            </div >
        )
    }
}
export default withStyles(styles)(Details);

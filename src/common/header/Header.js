import React from 'react';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fastfood from '@material-ui/icons/Fastfood';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from 'react-modal';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './Header.css';

import CustomSnackBar from "../../common/SnackBar/SnackBar";

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}
const modalBoxStyles = {
    content: {
        top: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        right: 'auto'
    }
};
const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 4,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
		justifyContent: 'center'
    },
    avatarButton: {
        paddingTop: 3,
        paddingRight: 12,
        paddingBottom: 3,
        paddingLeft: 6,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolBar: {
        display: 'flex',
        paddingTop: 2,
        paddingRight: 0,
        paddingBottom: 2,
        paddingLeft: 0,
    },
    media: {

        paddingTop: '1.25%', // 16:9,

      },
      cardLayout: {
        width:'20%',
        height:'200px',
        paddingTop: '2px', // 16:9,

	  },
	  hide: {
		  display: 'hidden'
	  },
});

class PrimarySearchAppBar extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidLoginMsg: "",
            userData: {},
			anchorEl: null,
			accountAnchorEl: null,
            isModalOpen: false,//Modal State
            value: 1,//Tab Value 1 is for login and 0 for SignUp
            //Login page
            loginContactRequired: "disp-none",
            loginContact: "",
            loginPasswordRequired: "disp-none",
            loginPassword: "",
            //Signup page
            firstnameRequired: "disp-none",
            firstname: "",
            lastname: "",
			emailRequired: "disp-none",
			emailRequiredMsg: 'requierd',
            email: "",
			registerPasswordRequired: "disp-none",
			registerPasswordRequiredMsg: "required",
            registerPassword: "",
			contactRequired: "disp-none",
			contactRequiredMsg: "required",
            contact: "",
            resterauntList: [],
			PartialList: [],
			showSnackBar: false,
			snackBarMessage: "",
			loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
	}

	componentDidMount = async() => {
		this.setState({
			loggedIn: sessionStorage.getItem("access-token") == null ? false : true
		})
	}

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    closeModalOnFocusOut = () => {
        this.setState({ isModalOpen: false });
    }
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };
    switchTabs = (event, value) => {
        this.setState({ value });
    }
    handlerForShowingModals = () => {
        this.setState({
            isModalOpen: true,
            value: 0,
            loginContactRequired: "dispNone",
            loginContact: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastname: "",
            emailRequired: "dispNone",
			email: "",
			emailRequiredMsg: "required",
			registerPasswordRequired: "dispNone",
			registerPasswordRequiredMsg: "required",
            registerPassword: "",
			contactRequired: "dispNone",
			contactRequiredMsg: "required",
            contact: ""
        });
        this.state.loginContact === "" ? this.setState({ loginContactRequired: "disp-block" }) : this.setState({ loginContactRequired: "disp-none" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "disp-block" }) : this.setState({ loginPasswordRequired: "disp-none" });
    }

    loginContactChangeHandler = (e) => {
        this.setState({ loginContact: e.target.value });
    }

    loginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    firstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    lastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    emailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    registerPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    contactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    onProfileIconClickHandler = () => {
        this.setState({ displayMenu: "disp-block" });
    }

	loginClickHandler = async() => {
		const currState = this.state;
		currState.loginContactRequired = this.state.loginContact === "" ? "disp-block" : "disp-none";
		currState.loginpasswordRequired = this.state.loginpassword === "" ? "disp-block" : "disp-none";
		this.setState(currState);
		if (currState.loginContactRequired === "disp-block" || currState.loginpasswordRequired === "disp-block") return;


		const { apiClient } = this.props;
		let res = "";
		try {
			res = await apiClient.login(this.state.loginContact, this.state.loginPassword);
			if (typeof res.data !== 'string') {
				sessionStorage.setItem("access-token", res.headers["access-token"]);
				this.setState({
					...currState,
					userData: res.data,
					loggedIn: true,
					invalidLoginMsg: "",
					isModalOpen: false,
					showSnackBar: true,
					snackBarMessage: "Logged in successfully!",
				});
			} else {
				this.setState({
					...currState,
					invalidLoginMsg: res.data
				});
			}
		} catch (error) {
			console.error("login failed error --> ", error.response);
			this.setState({
				...currState,
				invalidLoginMsg: res
			});
		}
	}

	signupClickHandler = async() => {
		const currState = this.state;
		currState.firstnameRequired = this.state.firstname === "" ? "disp-block" : "disp-none";

		let regex = /^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
		currState.emailRequired = this.state.email === "" || !regex.test(this.state.email) ? "disp-block" : "disp-none";
		this.state.emailRequiredMsg = this.state.email === "" ? 'required': currState.emailRequired ? 'Invalid Email' : "";

		const invalidPassowrd = this.state.registerPassword.length < 8 || this.state.registerPassword.includes('#@$%&*!^') || this.state.registerPassword === this.state.registerPassword.toLowerCase() || !(this.state.registerPassword.toString().match(".*\\d+.*"));
		console.log(" invalidPassowrd ", invalidPassowrd);

		currState.registerPasswordRequired = this.state.registerPassword === "" || invalidPassowrd ? "disp-block" : "disp-none";

		this.state.registerPasswordRequiredMsg = this.state.registerPassword === "" ? 'required': invalidPassowrd ? 'Password must contain at least one capital letter, one small letter, one number, and one special character' : "";

		regex = /^[0-9]{10}$/;
		const invalidContact = this.state.contact.toString().length < 10 || !regex.test(this.state.contact.toString());
		currState.contactRequired = this.state.contact === "" || invalidContact ? "disp-block" : "disp-none";
		currState.contactRequiredMsg = this.state.contact === "" ? "required" : invalidContact ? "Contact No. must contain only numbers and must be 10 digits long" : "";


		this.setState(currState);
		if (currState.firstnameRequired === "disp-block"
		|| currState.emailRequired === "disp-block"
		|| currState.registerPasswordRequired === "disp-block"
		|| currState.contactRequired === "disp-block") return;

		const { apiClient } = this.props;
		const res = await apiClient.sigup(
			this.state.firstname,
			this.state.lastname,
			this.state.email,
			this.state.contact,
			this.state.registerPassword
		);
		/**
		 * TODO:
		 * “Registered successfully! Please login now!”
		 * “This contact number is already registered! Try other contact number.”
		 */
		this.setState({
			isModalOpen: false
		})
	}

	snackBarCloseHandler = () => {
		this.setState({ showSnackBar: false });
	}

	handleAccountMenuClick = event => {
		this.setState({ accountAnchorEl: event.currentTarget });
	  };

	handleAccountMenuClose = () => {
		this.setState({ accountAnchorEl: null });
	};

	searchHandler = e => {
		this.props.restaurantSearchHandler(e.target.value);
	}

	handleProfileMenu = () => {
		this.props.history.push({
			pathname: '/profile',
		});
	}

	handleLogoutMenu = () => {
		sessionStorage.removeItem("access-token");
		this.props.history.push({
			pathname: '/',
		});
	}

    render() {
        const { anchorEl, mobileMoreAnchorEl, accountAnchorEl } = this.state;
        const { classes, showSearchBox, showCategories } = this.props;
        const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
		// TODO: header styling

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div>
                {/*This is the header part*/}
                <div className="hBackground">

                    <AppBar position="static">
                        <Toolbar className="toolBar toolBarBack">
                            <div className={classes.root}>
                                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                    <Grid>
                                        {/** Application Icon*/}
                                        <Fastfood className="searchIcon" />
                                    </Grid>
                                    <Grid className={showSearchBox ? classes.hide : "" }>
                                        <div className={classes.search}>
                                            <div className={classes.searchIcon}>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
                                                placeholder="Search by Restaurant Name"
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
												}}
												onChange={this.searchHandler}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid className={showCategories ? classes.hide : "" }>
                                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                                            <MenuIcon />
                                            <Typography className={classes.title} color="inherit" noWrap>
                                                Categories
                            </Typography>
                                        </IconButton>

                                    </Grid>
                                    <Grid>
                                        <div className="profile-picture">
                                            {/** --Invoke the Login Modal along with sign up*/}
                                            {!this.state.loggedIn ? <Button className={classes.avatarButton} variant="contained" color="default" onClick={this.handlerForShowingModals}>
                                                <AccountCircle />
                                                Login
									</Button> :
									<div>
									<AccountCircle />
									<Button
									  aria-owns={accountAnchorEl ? 'simple-menu' : undefined}
									  aria-haspopup="true"
									  onClick={this.handleAccountMenuClick}
									>
									  {this.state.userData.firstName}
									</Button>
									<Menu
									  id="simple-menu"
									  anchorEl={accountAnchorEl}
									  open={Boolean(accountAnchorEl)}
									  onClose={this.handleAccountMenuClose}
									>
									  <MenuItem onClick={this.handleProfileMenu}>Profile</MenuItem>
									  <MenuItem onClick={this.handleLogoutMenu}>Logout</MenuItem>
									</Menu>
								  </div>
								}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderMobileMenu}
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.isModalOpen}
                        contentLabel="Login"
                        onRequestClose={this.closeModalOnFocusOut}
                        style={modalBoxStyles}>
                        <Tabs className="tabs" value={this.state.value} onChange={this.switchTabs}>
                            <Tab label="Login" />
                            <Tab label="Signup" />
                        </Tabs>

                        {this.state.value === 0 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="loginContact">Contact No.</InputLabel>
                                    <Input id="loginContact" type="text" onChange={this.loginContactChangeHandler} />
                                    <FormHelperText className={this.state.loginContactRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.loginPasswordChangeHandler} />
                                    <FormHelperText className={this.state.loginPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                {this.state.invalidLoginMsg !== "" &&
                                    <FormControl>
                                        <span className="red">{this.state.invalidLoginMsg}</span>
                                    </FormControl>
                                }
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                            </TabContainer>
                        }

                        {this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.firstNameChangeHandler} />
                                    <FormHelperText className={this.state.firstnameRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl>
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.lastNameChangeHandler} />
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" type="text" email={this.state.email} onChange={this.emailChangeHandler} />
                                    <FormHelperText className={this.state.emailRequired}>
                                        <span className="red">{this.state.emailRequiredMsg}</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.registerPasswordChangeHandler} />
                                    <FormHelperText className={this.state.registerPasswordRequired}>
                                        <span className="red">{this.state.registerPasswordRequiredMsg}</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input id="contact" type="text" contact={this.state.contact} onChange={this.contactChangeHandler} />
                                    <FormHelperText className={this.state.contactRequired}>
                                        <span className="red">{this.state.contactRequiredMsg}</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                {this.state.registrationSuccess === true &&
                                    <FormControl>
                                        <span className="successText">
                                            Registered successfully! Please login now!
                                      </span>
                                    </FormControl>
                                }
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                            </TabContainer>
                        }
                    </Modal>
                </div>
				<CustomSnackBar
					vertical="bottom"
					horizontal="left"
					open={this.state.showSnackBar}
					onClose={this.snackBarCloseHandler}
					message={this.state.snackBarMessage}
				/>
			</div>

        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));
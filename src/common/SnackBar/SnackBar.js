import React, { Component } from 'react';
import { withStyles, SnackbarContent, IconButton, Snackbar } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const style = () => ({});
class CustomSnackBar extends Component {

	render() {
		const { classes, vertical, horizontal, open, onClose, variant, message } = this.props
		return (
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={onClose}
				classes={classes}
				autoHideDuration={6000}
			>
				<MySnackbarContentWrapper
					onClose={onClose}
					variant={variant}
					message={message}
				/>
			</Snackbar>
		)
	}
}

export default withStyles(style)(CustomSnackBar);

const styles = theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: '1.5rem',
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

function MySnackbarContent(props) {
	const { classes, className, message, onClose, ...other } = props;

	return (
		<SnackbarContent
			className={classNames(className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
};
import React, { Component } from 'react';
import { GridList, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Button, Typography, withStyles } from '@material-ui/core'

import Header from '../../common/header/Header';

const styles = () => {

};

class Home extends Component {

	constructor() {
		super();
		this.state = {
			restaurants: [],
		}
	}

	componentWillMount = async() => {
		const { apiClient } = this.props;
		const restaurants = await apiClient.getAllRestaurants();
		this.setState({
			restaurants
		})
	}

	getRestauratsByName = async restaurantName => {
		const { apiClient } = this.props;
		const restaurants = await apiClient.getRestauratsByName(restaurantName);
		this.setState({
			restaurants
		})
	}

	render() {
		const {classes, apiClient} = this.props;
		const { restaurants } = this.state;
		return (
			<div>
				<Header apiClient={apiClient} restaurantSearchHandler={this.getRestauratsByName}/>
				<GridList cols={4} className={classes.gridList}>
                        {restaurants && restaurants.length > 0 && restaurants.map(restautant => (
                            <div className={classes.cardLayout} key={restautant.id}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={restautant.restaurantName}
                                        height="60"
                                        image={restautant.photoUrl}
                                        title={restautant.restaurantName}
                                    />
                                <CardContent>
                                        <Typography gutterBottom component="h2">
                                            {restautant.restaurantName}
                                            <Typography>
                                                Categories: {restautant.categories}
                                            </Typography>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
        </Button>
                                    <Button size="small" color="primary">
                                        Learn More
        </Button>
                                </CardActions>
                            </Card>
                            </div>
                        ))}
                    </GridList>
			</div>
		)
	}
}

export default withStyles(styles)(Home);
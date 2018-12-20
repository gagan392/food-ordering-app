import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { GridList, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@material-ui/core';
import {Typography, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

import Header from '../../common/header/Header';
import './Home.css';

const styles = theme => ({
    gridList: {
        width:'auto',
        height:'auto',
        paddingTop: '10px', // 16:9,
        paddingLeft: '12px',
        
      },
      gridItem: {
        width:'100%',
        height:'300px',
        paddingTop: '15px', // 16:9,
        paddingLeft: '15px',
        
	  },
    });

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
        }
    }

    componentWillMount = async () => {
        const { apiClient } = this.props;
        const restaurants = await apiClient.getAllRestaurants();
        this.setState({
            restaurants
        })
    }

    render() {
        const { classes, apiClient } = this.props;
        const { restaurants } = this.state;
        return (
            <div>
                <Grid container direction="column" alignItems="stretch">
                    <Grid>
                        <Header apiClient={apiClient} />
                    </Grid>
                    <Grid>
                        <GridList cellHeight={"auto"} cols={4} className={classes.gridList}>
                            {restaurants && restaurants.length > 0 && restaurants.map(restautant => (
                                <div className={classes.gridItem} key={restautant.id}>
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt={restautant.restaurantName}
                                                height="60"
                                                padding="12px"
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
                                        <div >
                                                <span className="userRating" style={{ paddingLeft: '5px' }}><FontAwesome name='star' /></span>
                                                {/*Font Awesome didnt work*/}
                                                <span className="userRating" style={{ paddingLeft: '5px' }}>{restautant.userRating} ({restautant.numberUsersRated})</span>
                                                <span style={{ float: 'right' }}><i class="fa fa-inr" aria-hidden="true"></i>{restautant.avgPrice} for two</span>
                                            </div>
                                        </CardActions>
                                    </Card>
                                </div>
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
			</div>
        )
    }
}

export default withStyles(styles)(Home);
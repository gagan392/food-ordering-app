let test = JSON.parse(JSON.stringify(
	[
	{
					"id": 1,
					"restaurantName": "Dominoz",
					"photoUrl": "https://b.zmtcdn.com/data/pictures/4/18528394/6c3590212b3700b1b160422fd8478287.jpg?output-format=webp",
					"userRating": 4.2,
					"avgPrice": 250,
					"numberUsersRated": 99,
					"address": {
						"id": 1,
						"flatBuilNo": "501/31 Mahalaxmi SRA CHS",
						"locality": "Prabhadevi",
						"city": "Mumbai",
						"zipcode": "400015",
						"state": {
							"id": 21,
							"stateName": "Maharashtra"
						}
					},
					"categories": [
						{
							"id": 6,
							"categoryName": "Chinese",
							"items": [
								{
									"id": 27,
									"itemName": "fried rice",
									"price": 206,
									"type": "Veg"
								},
								{
									"id": 25,
									"itemName": "chillie chowmine",
									"price": 210,
									"type": "Non-Veg"
								}
							]
						},
						{
							"id": 4,
							"categoryName": "Drinks",
							"items": [
								{
									"id": 8,
									"itemName": "hot chocolate",
									"price": 250,
									"type": "Veg"
								},
								{
									"id": 6,
									"itemName": "tea",
									"price": 20,
									"type": "Veg"
								},
								{
									"id": 11,
									"itemName": "coke",
									"price": 100,
									"type": "Veg"
								}
							]
						},
						{
							"id": 2,
							"categoryName": "Indian",
							"items": [
								{
									"id": 23,
									"itemName": "butter paneer",
									"price": 190,
									"type": "Veg"
								},
								{
									"id": 4,
									"itemName": "chapati",
									"price": 20,
									"type": "Veg"
								},
								{
									"id": 13,
									"itemName": "pastry",
									"price": 210,
									"type": "Veg"
								},
								{
									"id": 29,
									"itemName": "veg biryani",
									"price": 203,
									"type": "Veg"
								},
								{
									"id": 17,
									"itemName": "naan",
									"price": 30,
									"type": "Veg"
								},
								{
									"id": 30,
									"itemName": "chicken biryani",
									"price": 245,
									"type": "Non-Veg"
								},
								{
									"id": 21,
									"itemName": "matar paneer",
									"price": 270,
									"type": "Veg"
								},
								{
									"id": 15,
									"itemName": "macroni",
									"price": 130,
									"type": "Veg"
								}
							]
						}
					]
				}


	]
	));


	//let moviesData = Array.from(test.data)
	export default test;

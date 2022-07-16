# eCommerceAPI with JWT Login system
This is a store API made with NodeJS and MongoDB. There are all the functionalities that a common eCommerce has like searching from products, sorting them, posting, deleting, patching and more. Functionalities are limited by a login system with JWT that allows you certain ones based on your user role.

## Features
- **GET /api/v1/products/all** allows everyone to get the list of all the products in the Databse
- **GET /api/v1/products/search** allows everyone to search for a product with a specific name by passing a "name": "productName" in the request body. The search will look for a pattern so the results won't be necessarily 100% accurate
- **GET /api/v1/products/sort?sort=** will return a list of products sorted based on the value passed to the sort parameter. The search allows to chose between ascending or descending order by inserting a "+" or a "-" before the sort instruction, that can vary based on whatever we are looking for. You can also select more sorting criterias together.\
**Example**:\
*Sort by ascenfing price and descending name*\
GET /api/v1/products/sort?sort=+price,-name

- **GET /api/v1/products/getspecific** will return all the products that match a specific search. Unlike the /search route, it won't look for a pattern, so it will send back products that perfectly match the body sent as request.
- **POST /api/v1/products/add** will allow the **admin** user to post a product on the database following the mongoose schema in the /models/main.js file.
- **PATCH /api/v1/products/modify/:id** will allow the **admin** user to patch (update) a product given its databse id. The update will only consist in updating the value of the passed fields, as it is a patch request and not a PUT.
- **DELETE /api/v1/products/delete/:id** will allow the, you guessed, **admin** user to delete a product given its databse id.

## Use
Before trying out this project make sure to:
- Create your own .env file in which you add your MONGO_URI_PRODUCTS variable (mongo database uri for your products collection). This is required in the /controllers/connectDB.js file 
- Create your own .env in which you add your MONGO_URI_USERS variable (mongo databse uri for yout users collection). This is required in the /models/main.js file
- Create your own .env file in which you add your JWT variable which consists in a secret word used to create the JWT token. Make sure it is not a guessable one
Once all of this is done, in order to access certain features you will need an admin account. In order to do so you will obviously first need an account, which you can create sending a POST request to /api/v1/register sending in the request an email and password. The user will be added to the database with an encrypted password and a "1000" role. This currespounds to the basic one. In order to make the user **become an admin** you will have to manually modify the user role in the database in "3000" (not as a string but as a number).\
Once this is done, you can get access to your token by sending a POST request to /api/v1/login. Keep that token with you (if we had a front end we coulb be storing that in localstorage, but we are only focusing on the backend). Whenever you will want to acess an admin feature, just pass the token in the authorization header following the format\
*BEARER "token"*

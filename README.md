# CounterIt

## How to run locally?

* Clone repo and `cd` into it.
* Run `npm i` to install dependencies.
* Create a config.js file.
* Run ```node intialise_db.js``` and after completion kill the script.
* Run `npm start` to run development server(:heart: nodemon)
* Go to `http://localhost/login` to visit admin panel.
* Login with username as `test` and password as `test`to see number of hits.


## Structure of config.js
```
module.exports = {
    database:'your_mlab_database',
    username:'your_mlab_username',
    password:'your_mlab_password'
}
```

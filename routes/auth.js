const express = require("express");
const request = require("request");
const querystring = require("querystring");

const router = express.Router();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
	var text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const stateKey = "spotify_auth_state";

//login route, gets called when login button is pressed, redirects to spotify's accounts service
router.get("/login", (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	// your application requests authorization
	const scope = "user-top-read user-read-private user-read-email";
	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
			})
	);
});

router.get("/callback", (req, res) => {
	// here the refresh and access tokens are generated
	// after checking the state parameter

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(
			"/dashboard#" +
				querystring.stringify({
					error: "state_mismatch",
				})
		);
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: "https://accounts.spotify.com/api/token",
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: "authorization_code",
			},
			headers: {
				Authorization:
					"Basic " +
					new Buffer(client_id + ":" + client_secret).toString("base64"),
			},
			json: true,
		};

		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				// var options = {
				// 	url: "https://api.spotify.com/v1/me",
				// 	headers: { Authorization: "Bearer " + access_token },
				// 	json: true,
				// };

				//passing the token to the browser to make requests from there
				res.redirect(
					"/dashboard#" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token,
						})
				);
			} else {
				res.redirect(
					"/dashboard#" +
						querystring.stringify({
							error: "invalid_token",
						})
				);
			}
		});
	}
});

// //this is to generate a new token using a refresh token, which may not be needed for us. but it's here. for now. idk
// router.get("/refresh_token", (req, res) => {
// 	// requesting access token from refresh token
// 	var refresh_token = req.query.refresh_token;
// 	var authOptions = {
// 		url: "https://accounts.spotify.com/api/token",
// 		headers: {
// 			Authorization:
// 				"Basic " +
// 				new Buffer(client_id + ":" + client_secret).toString("base64"),
// 		},
// 		form: {
// 			grant_type: "refresh_token",
// 			refresh_token: refresh_token,
// 		},
// 		json: true,
// 	};

// 	request.post(authOptions, (error, response, body) => {
// 		if (!error && response.statusCode === 200) {
// 			var access_token = body.access_token;
// 			res.send({
// 				access_token: access_token,
// 			});
// 		}
// 	});
// });

module.exports = router;

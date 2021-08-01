const express = require("express");
const request = require("request");
const router = express.Router();
const { checkUserExists, displayUser, newUser } = require("../cockroach-test");

router.get("/insert", async (req, res) => {
	const access_token = req.headers.authorization.split(" ")[1];
	request.get(
		{
			url: "https://api.spotify.com/v1/me",
			headers: { Authorization: "Bearer " + access_token },
			json: true,
		},
		async (error, response, body) => {
			if (!error && response.statusCode === 200) {
				const userExists = await checkUserExists(body.id);
				if (userExists) {
					const loggedInUser = await displayUser(body.id);
					res.json(loggedInUser);
				} else {
					request.get(
						{
							url: "https://api.spotify.com/v1/me/top/artists?limit=5&offset=0",
							headers: { Authorization: "Bearer " + access_token },
							json: true,
						},
						async (err, response, userStats) => {
							if (!err && response.statusCode === 200) {
								const artists = [];
								const popularities = [];
								userStats.items.forEach((element) => {
									artists.push(element.name);
									popularities.push(element.popularity);
								});
								await newUser(
									body.id,
									body.display_name,
									artists,
									userStats.genres,
									popularities.reduce((a, b) => a + b) / popularities.length
								);
								const createdUser = await displayUser(body.id);
								res.json(createdUser);
							}
						}
					);
				}
			}
		}
	);
});

module.exports = router;

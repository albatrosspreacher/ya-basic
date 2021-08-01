# ya-basic

A website that tells you who has more basic music taste between you and your friends! Link your Spotify account, check out your stats, and compare them with those of your friends!

## Demo

## ![]()

## Usage

This application is live [here](https://www.ya-basic.co/) <br/>

1. Login with Spotify and grant access to the application
2. View your own stats and share your referrals with your friends (you can share this with up to 2 friends as of now)
3. Once your friends grant access to the application, you can compare stats!

---

## Running It Locally

### Prerequisites

**Cockroach DB**

1. Configure a Cockroach DB cluster.
2. Set up the schemas according to [this](https://github.com/nandiniproothi/ya-basic/blob/cockroach-scripts/README.md)

**Spotify**

1. Sign up for a developer account
2. Create an app with the [necessary auth scopes]()
3. Whitelist the app's URL in Spotify's app dashboard

### Steps

1. Clone the repository: `git clone https://github.com/nandiniproothi/ya-basic.git`
2. Navigate to the directory and install all dependencies: `npm i` or `npm install`
3. Add all necessary parameters in the `.env` file
4. Start the application using: `npm start`
5. Head over to localhost:[port_number]

---

## Contributing

All contributions are welcome!

- If you're a fellow scholar or just someone who is interested to learn, feel free to make a PR
- In case of major changes/enhancements, please open an [Issue](https://github.com/nandiniproothi/ya-basic/issues) first

---

## License

[MIT](LICENSE)

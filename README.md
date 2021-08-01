# [Ya Basic](https://www.ya-basic.co)

## Demo

![demo of ya basic]()

## Usage

This application is live [here](https://www.ya-basic.co/) <br/>

1. Login with Spotify and grant access to the application
2. View your own stats and share your referrals with your friends (you can share this with up to 2 friends as of now)
3. Once your friends grant access to the application, you can compare stats!

---

## What it does

The user must give access to their Spotify account. Once granted, they can view a general overview of their Spotify stats (their top artists and genres). Each user gets a unique referral code, upon sharing with a friend, they'll be able to view their friend's statistics against their own. Hence, settling the battle once and for all, who has the more basic taste in music :wink:

---

## Inspiration

We love underrated music! We debated as to whose taste in music is more basic, and then we realized, why not make a website for that! Any chance to work with new APIs and technologies, we'll take it.

---

## How we built it

- We set up a Cockroach DB cluster and defined a schema, details of which can be found [here](https://github.com/nandiniproothi/ya-basic/blob/cockroach-scripts/README.md).
- We make use of Spotify's Web API to authenticate users and get information regarding their stats. Auth scopes used are `user-top-read, user-read-private, user-read-email`
- We store information like user's Spotify ID, and relevant stats [top artists, genres, and popularity score]
- Whenever a user logs in, an entry is made in our database.
- Each user gets a unique referral code that is 7 characters long. Users can share referral codes with up to 2 friends. Once shared, they'll be able to view their friend's stats alongside their own.
- On the DB end, we have functions like `checkSlot()` and `addReferral()` to store user information in the referrer's record.
- On login, run the checkUserExists() function to see if the user is in the database. If not, use the newUser() function
- On click of the submit referral button, run addReferral()
- For displaying the stats, use the displayUser() function
- We hosted the application on [glitch.com](https://www.glitch.com)
- The domain name was purchased using the [Go Daddy Registry](https://uk.godaddy.com/)
- We made use of Simple Analytics for privacy-friendly analysis of our website's traffic. More about this in the sections below :point_down:

---

## Challenges we ran into

- Coming up with the idea itself was a big task! We debated and refined the idea a lot. We had to keep in mind the time constraint and the technologies available for use
- Since we hadn't worked with the Spotify API or Cockroach DB, understanding those technologies took some time

---

## Accomplishments that we're proud of

- Understanding Spotify's auth flow. Because, yikes, there are way too many tokens and variables :fearful:
- Working with NewSQL technologies. Since we've never worked with Postgres, it was definitely fun to be able to grasp the basics of Cockroach DB over the weekend
- Privacy-friendly analytics! We made use of [Simple Analytics](https://sa.ya-basic.co), a service that doesn't store any personal information about the users and doesn't require us to annoy users with "Here, eat a cookie :cookie: " messages. This provided us with a simple dashboard where we can view how ~~many~~ few people are using our application: <br/> <br/> ![simple analytics dashboard preview](https://cdn.discordapp.com/attachments/768403939271114752/871355982901542953/unknown.png)

---

## What we learned

- How to work with Cockroach DB, the Spotify API
- Handling project structure in Express.js
- Editing DNS records and what it really means :flushed:

---

## What's next for Ya Basic

Enhanced privacy practices. At the moment, we store user's information like their Spotify IDs and stats. Going further, we'll delete these stats a week after the user's first login attempt. This way they wouldn't have to worry about their information being misused.

## Running It Locally

### Prerequisites

**Cockroach DB**

1. Configure a Cockroach DB cluster.
2. Set up the schema according to [this](https://github.com/nandiniproothi/ya-basic/blob/cockroach-scripts/README.md)
3. The table should end up looking like this: <br/><br/>
![table description cockroach db](https://cdn.discordapp.com/attachments/768403939271114752/871363460309598238/unknown.png)

**Spotify**

1. Sign up for a developer account
2. Create an app with the necessary auth scopes: `user-top-read, user-read-private, user-read-email`
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

- If you're a fellow hacker or just someone who is interested to learn, feel free to make a PR
- In case of major changes/enhancements, please open an [Issue](https://github.com/nandiniproothi/ya-basic/issues) first

---

## License

[MIT](LICENSE)

# ya-basic

A website that tells you if your taste in music is basic or not! Link your Spotify account, check out your stats, and compare them with those of your friends!

---

## Cockroach DB

- Create a table in your database

```
create table referral(
referral_code string not null unique,
uid_1 string not null unique,
uid_2 string,
uid_3 string,
uname string,
artists string[],
genres string[],
basic_score int,
constraint "primary" primary key (referral_code, uid_1)
);
```

- Keep these values in your `.env` file: DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

---

## Functions Defined

- testConnection(): To check if we're connected to the Cockroach DB cluster
- newUser(uid_1, uname, artists, genres, basic_score): Save a new user with uid (string), uname (string), artists(string[]), genres(string[]), basic_score(int)
- checkUserExists(uid_1): Checks if a user exists in the database with uid (String)
- displayUser(uid_1): Fetch all user details by entering uid (String)
- checkSlots(ref_code): Checks if slots are empty for the given ref_code (String)
- addReferral(ref_code, uid): Adds passed uid (String) to the referral's row (either as uid_2 (String) or uid_3 (String) depending on availability)

---

## Contributing

All contributions are welcome!

- If you're a fellow scholar or just someone who is interested to learn, feel free to make a PR
- In case of major changes/enhancements, please open an [Issue](https://github.com/nandiniproothi/ya-basic/issues) first

---

## License

[MIT](LICENSE)

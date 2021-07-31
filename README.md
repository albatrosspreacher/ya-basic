# ya-basic

A website that tells you if your taste in music is basic or not! Link your Spotify account, check out your stats, and compare them with those of your friends!

## Cockroach DB

- Create a table in your database

```
create table referral(
referral_code string not null unique,
uid_1 string not null unique,
uid_2 string,
uid_3 string,
constraint "primary" primary key (referral_code, uid_1)
);
```

- Keep these values in your `.env` file: DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

## Contributing

All contributions are welcome!

- If you're a fellow scholar or just someone who is interested to learn, feel free to make a PR
- In case of major changes/enhancements, please open an [Issue](https://github.com/nandiniproothi/ya-basic/issues) first

---

## License

[MIT](LICENSE)

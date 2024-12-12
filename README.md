## This is node js backend template

### MongoDB Migration

- Check this [article](https://www.freecodecamp.org/news/handle-mongodb-migrations-with-ts-migrate-mongoose/) to know more about mongoDB migrations

- To create a new migration (check package.json for updated scripts)

```bash
    yarn migrate:dev create seed_users
```

- this will create a new migration file `<timestamp>-seed_users.ts` under `migrations` directory

---

- check `scripts/migrations.js` to check various migrations cmds

- to apply the migration changes once done

```bash
yarn migrate:dev up seed_users
```

---

- to revert the migration changes

```bash
yarn migrate:dev down seed_users
```

---

- To list down all the migrations entries from DBB

```bash
yarn migrate:dev list
```

---

- To remove the remove the entry from the DB if migration does not exist

```bash
yarn migrate:dev prune
```

# This is node js backend template (with typescript)

## Database setup 💿

- MongoDB, other database configuration is possible
- [Reference for Database setup](https://github.com/Abhishek765/ultimate-node-backend-setup/blob/732d4e14c2ac47eb632883a6b19fa20a459ce65b/src/service/db.service.ts)

## MongoDB Migration 💽

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

## Logging ℹ️

- [Winston](https://www.npmjs.com/package/winston) logging
- [Reference for logger setup](https://github.com/Abhishek765/ultimate-node-backend-setup/blob/225026288beec40a3fb2f83ada0947848530d7ac/src/utils/httpResponse.ts)

## How to containerize the app 🐳

### Development

- Build the image

```bash
docker build -f docker/development/DockerFile -t ultimate-backend-app:dev .
```

- Running the container with volume mounting

```bash
docker run --rm -it -v ${PWD}:/usr/src/ultimate-backend-app -v /usr/src/ultimate-backend-app/node_modules -p 8000:8000 ultimate-backend-app:dev
```

### Production

- Build the image

```bash
docker build -f docker/production/DockerFile -t ultimate-backend-app:prod .
```

- Running the container with volume mounting

```bash
docker run --rm -d -v ${PWD}:/usr/src/ultimate-backend-app -v /usr/src/ultimate-backend-app/node_modules -p 8000:8000 ultimate-backend-app:1.0.0
```

# Next.js application

## Next.js App Router Course - Starter

This application created based on the starter template for the Next.js App Router Course. It contains the starting code
for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

On the application @vercel/postgres was changed to prisma. Local postgres database is used.

## Prerequisites

* Git - https://git-scm.com/
* DDEV - Docker-based PHP development environment https://ddev.com/

## Installation

1. Create projects folder. Skip this step if you already have a project's folder. Just use it in step 2.

```sh
cd ~/Documents/
mkdir Sites
```

2. Create project folder

```sh
cd ~/Documents/Sites
mkdir next-js
```

3. Clone the repo

```sh
cd ~/Documents/Sites
git clone git@github.com:dmitri-seron/nextjs_learn.git
```

4. Navigate to the project folder. And run ddev project.

```sh
cd ~/Documents/Sites/next-js/nextjs_learn
ddev start
```

5. Create a config file with database connection string and other environment specific options.

```sh
cd ~/Documents/Sites/next-js/nextjs_learn
cp .env.example .env
```

6. Fill a database with a data.

```sh
cd ~/Documents/Sites/next-js/nextjs_learn
ddev npm run seed
```

7. Open https://api.next-js.ddev.site/
8. For login into dashboard use

   **Username:** user@nextmail.com

   **Password:** 123456

### Useful commands

Describe the project

```sh
cd ~/Documents/Sites/next-js/nextjs_learn
ddev describe
```

Stop the project

```sh
cd ~/Documents/Sites/next-js/nextjs_learn
ddev stop
```

Start the project

```sh
cd ~/Documents/Sites/next-js/nextjs_learn
ddev start
```
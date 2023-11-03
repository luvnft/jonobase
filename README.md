# jonobase

a front-end for a pockethosted pocketbase back-end (headless CMS) 

## Requirements

- You need a FTP client like [Filezilla](https://filezilla-project.org/) and accounts with [GitHub](https://github.com) and [Vercel]([https://](https://vercel.com/signup))

## Setup

So, please follow this easy 20+ step process to have a full dynamic and customizable website: 

### Back-end (pocketbase)

#### Pockethost.io

- Start an account at [pockethost.io](https://app.pockethost.io)
- Start a new app
- Choose a name for the app and create
- Go inside the _ADMIN_ panel
- Create a database admin with email and password
  
#### Uploading the database schema

- Click the _Settings_ icon (third from the top on the left sidebar)
- Under the heading _Sync_, click on _Import collections_
- Click on _Load from JSON file_
- Find the `jonobase.json` in the root of this repo
- Once loaded, click the orange button _Review_
- In the _Side-by-side diff_ screen, click _Confirm and import_

We should now have the structure of our database ready, now for the sample data:

- Click the same _Settings_ icon, as above
- Under the heading _System_, click on _Backups_
- Beside the text _Backup and restore our PocketBase data_, click on the _Upload backup_ icon
- Find the `jonobase-sample-data.zip` in the root of this repo
- Once loaded, mouse over on the row where it says `jonobase-sample-data.zip`
- On the right side, there will be a _Restore_ button
- A dialog box will popup, type (or copy-paste) the name `jonobase-sample-data.zip` into the _Backup name_ field
- Click on _Restore backup_
- You will see an almost-blank screen that says `"This instance is in Maintenance Mode."` 
  - Don't worry, we will take care of this with FTP 

#### Go to the FTP

- With an FTP client, use your email address `youremail@ftp.sfo-1.pockethost.io`
- Delete all the files in the `pb_migrations` folder
- Go back to [https://app.pockethost.io/](https://app.pockethost.io/)

#### Back in the PockhetHost admin panel

- Find your database instance and click on _DETAILS_
- Scroll down to the _Dnager Zone_ (yeah)
- Toggle the _Maintenance Mode_ off
- *The database is now ready!*

### Front-end (next.js + react + tailwind)

Now, to setup the front-end! Did you think it was over yet? 😈

These steps are super-easy compared with me figuring all this out, so bear with me!

(We're almost there!)

- On your local repo, create an `.env.local` folder:

```
PBDOMAIN=https://yoursite.pockethost.io
PBDOMAIN_SHORT=yoursite.pockethost.io
PBSLUG=yoursite
```

- Then on Terminal, run the following command:

```
$ npm run dev
```

- Wait a few seconds and then open up `https://localhost:3000` on a browser
- You should then see the sample home page!

### Deployment

- Open up the Vercel account
- Use the appropriate GitHub account and repo
- Set your _Environment variables_ as you did in the previous section:
- Of course, replace `yoursite` with your own subdomain!

Now, we can go back to the Pocketbase and update our site from there! Simple!
# MktCMS Website Template (Nuxt 4)

This is the Nuxt 4 website template used by MktCMS.


## Create a new website repo (minimal)

You can use this repository as a template directly from GitHub by clicking “Use this template” to create your own repo, or clone it manually as shown below:

```bash
DOMAIN_NAME=customerxyz.mydomain.com

git clone git@github.com:mktcode/mktcms-website-template.git "${DOMAIN_NAME}"
cd "${DOMAIN_NAME}"

npm i
cp .env.example .env
cp -r content .storage

# re-init git
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git branch -m main

# publish this repo (usually private)
```

## Deployment

Use the server bootstrap + CLI from https://github.com/mktcode/mktcms-server.

Example (after the server is initialized with `init.yml` from that repo):

```bash
# create site (nginx + supervisor + clone + build)
mktcms new customerxyz.mydomain.com 3000 owner/your-website-repo

# enable HTTPS (Let's Encrypt)
mktcms cert customerxyz.mydomain.com admin@customerxyz.mydomain.com

# update later
mktcms update customerxyz.mydomain.com
```

For the full command reference and server setup details, see: https://github.com/mktcode/mktcms-server
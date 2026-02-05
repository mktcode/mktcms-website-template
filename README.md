# Create a new Website

```bash
DOMAIN_NAME=customerxyz.mydomain.com
```

```bash
git clone git@github.com:mktcode/mktcms-website-template.git ${DOMAIN_NAME}
cd ${DOMAIN_NAME}
npm i
cp .env.example .env
cp -r content .storage
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git branch -m main
# Publish to GitHub as private repository
```

## PageGrab

Fetch page content and store it in `.storage`.

`npm run pagegrab -- --domain https://domain.de --selector "#content"`

## Configuration / Checklist

Edit `nuxt.config.ts`:

- favicon
- title, description
- og-tags
- robots
- per page meta tags in `pages/`
- errors page: `error.vue`
- correct Font everywhere
- mobile optimization
- ensure urls match old website

# Deployment

On the server (set up with `init.yml` from [`mktcode/mktcms-server`](https://github.com/mktcode/mktcms-server)) use the `websitenew` command:

```bash
DOMAIN_NAME=customerxyz.mydomain.com
websitenew ${DOMAIN_NAME} 3000
```

Set A-Record (also for `www.`) pointing to the server IP and obtain SSL certificate using `websitecert`:

```bash
websitecert ${DOMAIN_NAME}
```

Adjust environment variables in the service configuration as needed and restart the application:

```bash
vim /etc/supervisor/conf.d/${DOMAIN_NAME}.conf
supervisorctl reread
supervisorctl update
supervisorctl restart ${DOMAIN_NAME}
```

### Update

```bash
websiteupdate ${DOMAIN_NAME}
```
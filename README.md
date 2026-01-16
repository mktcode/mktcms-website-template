# Neue Website anlegen

```bash
DOMAIN_NAME=kundexyz.mktcode.de
```

```bash
git clone git@github.com:mktcode/mktcms-website-template.git ${DOMAIN_NAME}
cd ${DOMAIN_NAME}
npm i
cp .env.example .env
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git branch -m main
# Publish to GitHub as private repository
```

# Deployment

### DNS

A-Record (auch für `www.`) auf die Server IP zeigen lassen.

### Setup

```bash
DOMAIN_NAME=kundexyz.mktcode.de
```

Dann auf dem Server (eingerichtet mit `.config/nuxtapps.yml`) mit folgendem Befehl das Repo klonen, Service sowie Reverse Proxy anlegen, App starten und Zertifikat holen:

```bash
newnuxtapp ${DOMAIN_NAME} 3000
nuxtappcert ${DOMAIN_NAME}
```

Environment anpassen:

```bash
vim /etc/supervisor/conf.d/${DOMAIN_NAME}.conf
supervisorctl reread
supervisorctl update
```

### Update

```bash
updatenuxtapp ${DOMAIN_NAME}
```
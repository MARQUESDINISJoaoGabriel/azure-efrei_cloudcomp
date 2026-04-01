# netwatch-app — CI/CD Azure Pipeline

## Pipeline

Chaque `git push` sur `main` déclenche automatiquement :

1. **Unit Tests** — Jest + Supertest
2. **E2E Tests** — Jest (simulation de parcours HTTP complet)
3. **Build & Push** — Image Docker poussée sur Docker Hub (uniquement si tests OK)
4. **Deploy** — Connexion SSH à la VM Azure, pull + redémarrage idempotent + healthcheck

## Déclenchement
```bash
git push origin main
```

## Choix techniques

- **Node.js + Express** : API légère avec `/health` et `/api/info`
- **Jest + Supertest** : tests unitaires et E2E sans dépendance navigateur
- **Docker** : image Alpine minimale, port 3000
- **GitHub Actions** : 4 jobs avec dépendances (`needs`)
- **Déploiement idempotent** : `docker stop/rm` avant chaque `docker run` avec nom fixe `netwatch-app`

## Secrets requis

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Votre username Docker Hub |
| `DOCKERHUB_TOKEN` | Token d'accès Docker Hub |
| `AZURE_VM_HOST` | IP publique de la VM (ex: 40.67.243.241) |
| `AZURE_VM_USER` | User SSH (ex: azureuser) |
| `AZURE_SSH_PRIVATE_KEY` | Clé privée SSH complète |

## Lancer localement
```bash
cd app && npm install && npm start
# App sur http://localhost:3000
```

## Docker
```bash
docker build -t netwatch-app .
docker run -d --name netwatch-app -p 3000:3000 netwatch-app
curl http://localhost:3000/health
```

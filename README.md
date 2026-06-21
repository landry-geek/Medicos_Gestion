# Setup collaboration Vue + Laravel + PostgreSQL

## Démarrage rapide

```bash
git clone <url-du-repo>
cd projet
cp .env.example .env
docker compose up
```

- Frontend : http://localhost:5173
- Backend (API) : http://localhost:8000
- PostgreSQL : localhost:5432 (accessible avec un client comme TablePlus/DBeaver)

Le premier démarrage installe automatiquement les dépendances Composer et npm
et joue les migrations Laravel. Pas besoin d'installer PHP, Node ou Postgres
en local : tout tourne dans les conteneurs, donc pas de différence entre
Windows, macOS et Linux.

## Commandes utiles

```bash
# Lancer en arrière-plan
docker compose up -d

# Voir les logs d'un service
docker compose logs -f backend
docker compose logs -f frontend

# Exécuter une commande artisan
docker compose exec backend php artisan migrate
docker compose exec backend php artisan tinker
docker compose exec backend php artisan make:model Article -m

# Exécuter une commande npm
docker compose exec frontend npm run lint
docker compose exec frontend npm install <package>

# Tout arrêter
docker compose down

# Tout arrêter + supprimer les données Postgres (reset complet)
docker compose down -v
```

> Note : après un `npm install <package>` ou `composer require <package>`
> exécuté dans le conteneur, le `package.json`/`composer.json` est modifié
> sur votre machine (grâce au volume monté) — committez-le normalement.

## Workflow Git

Stratégie trunk-based simplifiée à deux branches longues :

- `main` : code en production, protégée, on ne push jamais dessus directement
- `develop` : branche d'intégration, protégée, c'est la cible des PR

Chaque tâche part d'une branche courte depuis `develop` :

```
feat/back-auth-api
feat/front-login-page
fix/back-migration-users
fix/front-cart-total
chore/docker-postgres-upgrade
```

Préfixe `back-`/`front-` pour repérer vite qui touche quoi dans les PR.

### Cycle de travail

1. `git checkout develop && git pull`
2. `git checkout -b feat/front-login-page`
3. Travail + commits réguliers (idéalement [Conventional Commits](https://www.conventionalcommits.org/) : `feat:`, `fix:`, `chore:`, `refactor:`)
4. `git push -u origin feat/front-login-page`
5. Ouvrir une Pull Request vers `develop` sur GitHub
6. L'autre dev review (même si la zone ne le concerne pas directement — ça force la visibilité croisée sur le projet)
7. La CI doit passer (voir `.github/workflows/ci.yml`)
8. Merge en `develop`, branche supprimée

Périodiquement (ou à chaque release), `develop` est mergée dans `main`.

### Réglages GitHub à activer (Settings > Branches)

- Protection sur `main` et `develop` :
  - Require a pull request before merging
  - Require status checks to pass before merging (sélectionner les jobs `backend` et `frontend` de la CI)
  - Require branches to be up to date before merging
- Désactiver le push direct sur ces deux branches, même pour les admins, si possible.

## Éviter les conflits front/back

Le point de friction le plus courant à 2 devs front/back, c'est l'API qui
change sans prévenir. Quelques pratiques qui aident :

- Documenter les endpoints (routes, payloads, réponses) dans
  `backend/routes/api.php` avec des commentaires clairs, ou via une
  collection Postman/Insomnia partagée et committée dans le repo
  (`docs/api-collection.json`).
- Toute modification de structure de réponse JSON ou de route passe par une
  PR visible par les deux, même si techniquement un seul dev la code.
- Le frontend peut développer contre des données mockées (MSW, ou un simple
  fichier JSON) pendant que le backend finalise l'implémentation, pour ne
  jamais être bloqué l'un par l'autre.

## Spécificités multi-OS

- `.gitattributes` force les fins de ligne en LF pour éviter les diffs
  fantômes entre Windows et Mac/Linux.
- Sous Windows : utiliser Docker Desktop avec le backend **WSL2**, et cloner
  le repo **dans le filesystem WSL** (pas sous `/mnt/c/...`) pour éviter des
  lenteurs importantes sur les bind mounts.
- `vendor/` et `node_modules/` sont des volumes Docker nommés (pas des bind
  mounts) précisément pour éviter ces problèmes de performance cross-OS.
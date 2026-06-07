# Mise en ligne du site Pelican Muay Thai (OVH)

> Hébergeur : OVH (mutualisé) — dossier racine du site = **`www`** (PAS `public_html`).
> Accès aux fichiers = **FTP**, SANS rien installer :
> - **Explorateur de fichiers Windows** (le plus simple) : taper `ftp://ftp.clusterXXX.hosting.ovh.net`
>   dans la barre d'adresse → login + mot de passe FTP → glisser-déposer comme un dossier normal.
> - ou **FileZilla Portable** (zip à décompresser, aucune installation).
> Identifiants FTP : OVH → Hébergements → onglet **FTP-SSH**.

---

## 1) Vérifier le SSL (normalement déjà actif)
- Si le site actuel s'affiche déjà en **`https://` avec le cadenas** 🔒 → **le SSL est déjà actif, rien à faire.**
- Sinon : OVH → Hébergements → onglet **"SSL"** → activer le certificat gratuit (Let's Encrypt) et attendre qu'il soit "Actif".
- (Important : notre `.htaccess` force le HTTPS, donc le certificat doit être actif.)

## 2) Créer la propriété Google Search Console
- Aller sur **search.google.com/search-console** → se connecter avec un Gmail.
- Choisir **"Préfixe de l'URL"** → saisir `https://www.pelicanmuaythai.fr` → Continuer.
- **Télécharger le fichier de vérification `.html`** (on l'ajoutera au site à l'étape 4).
- ⚠️ Ne pas cliquer "Vérifier" maintenant → on le fera APRÈS la mise en ligne (étape 7).

## 3) Sauvegarder l'ancien WordPress (sécurité) — DEUX choses séparées
- **(a) Les FICHIERS** : via FTP (Explorateur Windows), copier tout le dossier `www` sur le PC.
- **(b) La BASE DE DONNÉES** (le contenu WordPress n'est PAS dans les fichiers !) :
  OVH → section **Bases de données** → **phpMyAdmin** → onglet **Exporter** → télécharger le `.sql`.
- ⚠️ Le FTP ne sauvegarde QUE les fichiers. Sans l'export `.sql`, la sauvegarde WordPress est incomplète.
- Garder ces 2 sauvegardes précieusement (permet de tout remettre si besoin).

## 4) Préparer le ZIP du nouveau site
- Sur GitHub : bouton vert **Code → Download ZIP**.
- **Dézipper** sur le PC (le contenu est dans un sous-dossier `…-master/`).
- **Supprimer** les fichiers inutiles en ligne : `.claude/`, `.gitignore`, `MISE-EN-LIGNE.md`.
- **Ajouter** le fichier de vérification Google `.html` (téléchargé à l'étape 2) à la racine.
- ✅ Déjà présents (ne pas toucher) : `index.html`, `assets/`, `.htaccess`, `sitemap.xml`, `robots.txt`.
- ⚠️ Le `.htaccess` est un fichier **caché** → activer "afficher les fichiers cachés" pour ne pas l'oublier.

## 5) Déployer sur OVH (via l'Explorateur Windows `ftp://...` ou FileZilla Portable)
- Ouvrir le dossier **`www`** sur le serveur OVH.
- **Supprimer tout le contenu WordPress** dans `www` (après l'avoir sauvegardé à l'étape 3).
- **Glisser-déposer le contenu** du nouveau site dans `www` (les fichiers, PAS le dossier `…-master`).
- Vérifier que **`index.html`** et **`.htaccess`** sont bien **directement dans `www`** (à la racine).
- ⚠️ Le `.htaccess` est caché : s'assurer qu'il a bien été copié (c'est lui qui fait les redirections).

## 6) Vérifier que tout fonctionne
- [ ] `https://www.pelicanmuaythai.fr` s'affiche, cadenas 🔒 présent.
- [ ] Les liens du menu marchent (toutes les pages).
- [ ] Une ancienne URL WordPress redirige, ex. `…/tarif/` → page Cotisations & Formules.
- [ ] Une ancienne page download, ex. `…/download/categories-de-poids-ffkmda/` → adhesion.html.
- [ ] Affichage mobile OK.
- [ ] Page 404 (taper une URL au hasard) → page 404 personnalisée.

## 7) Valider Search Console
- Retourner sur Search Console → cliquer **"Vérifier"** (le fichier `.html` est maintenant en ligne). ✅

## 8) Soumettre le sitemap
- Search Console → **Sitemaps** → Ajouter → `https://www.pelicanmuaythai.fr/sitemap.xml`.

## 9) Demander l'indexation des 4 pages principales
Outil **"Inspection d'URL"** → entrer chaque URL → "Demander une indexation" :
- `https://www.pelicanmuaythai.fr/`
- `https://www.pelicanmuaythai.fr/adhesion.html`
- `https://www.pelicanmuaythai.fr/cotisations-formules.html`
- `https://www.pelicanmuaythai.fr/sections.html`
(Mentions légales / politique de confidentialité = inutile, elles sont en noindex.)

## 10) Donner l'accès au client
- Search Console → **Paramètres → Utilisateurs et autorisations** → ajouter son Gmail en **"Propriétaire"**.

---

## Encore à compléter dans le code (avant publication idéalement)
- [ ] Mentions légales : RNA/SIRET, nom du président, hébergeur (OVH), siège social.
- [ ] (Optionnel) En-têtes de sécurité dans le `.htaccess`.
- [ ] (Optionnel) Garder les PDF FFKMDA (catégories de poids, règlement) sur le nouveau site.

Tél. VEGAS (crédit footer) : 07 50 53 78 10

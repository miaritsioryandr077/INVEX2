# 📦 INVEX2 — Gestion de produits

Ce projet est une application web de gestion de produits, développée avec **React.js** (frontend), **Tailwind CSS** pour le style, **Express.js** (backend), et **MySQL** pour la base de données.

---

## 🎯 Objectif du projet

Développer une application permettant de :

- ➕ **Ajouter** des produits dans une base de données (champs : `numProduit`, `design`, `prix`, `quantite`)
- 📋 **Afficher** ces produits dans un tableau avec calcul automatique du **montant** (`prix * quantite`)
- ✏️ **Modifier** ou 🗑️ **supprimer** un produit depuis le tableau
- 📈 **Afficher un bilan** :
  - Montant **minimum**, **maximum**, et **total** de tous les produits
- 📊 **Visualiser ce bilan** sous forme d’un **graphique** (camembert ou histogramme)

---

## 🖼️ Captures d'écran

### Page de connexion
![Login](./frontend/assets/Captures1%20-%20Login%20INVEX2.png)

### Accueil
![Accueil](./frontend/assets/Captures2%20-%20Accueil%20INVEX2.png)

### Ajouter un produit
![Ajouter](./frontend/assets/Captures3%20-%20Add%20INVEX2.png)

### Liste des produits
![Liste](./frontend/assets/Captures4%20-%20List%20INVEX2.png)

### Bilan / Statistiques
![Stats](./frontend/assets/Captures5%20-%20Stats%20INVEX2.png)

---

## 🧑‍💻 Fonctionnalités principales

- Validation des champs côté client
- Réponses serveur claires : `"Insertion réussie"` ou `"Échouée"`
- Mise à jour dynamique du tableau après chaque opération
- Navigation via **3 menus** :
  1. Ajout
  2. Liste et mise à jour
  3. Bilan (avec graphique)

---

## 🚀 Technologies utilisées

| Frontend     | Backend     | Base de données |
|--------------|-------------|-----------------|
| React.js     | Express.js  | MySQL           |
| Tailwind CSS | Node.js     |                 |
| Axios        |             |                 |
| Chart.js / Recharts (graphiques) |             |                 |

---

## 📁 Structure du projet


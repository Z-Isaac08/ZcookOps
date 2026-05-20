# **ZNote** — Cybersecurity Writeups & Lab Reports

**ZNote** est une plateforme moderne dédiée au partage de writeups de CTF et d'analyses de vulnérabilités. Conçue par **zcook**, elle sert de carnet de bord technique pour documenter des explorations approfondies en cybersécurité, infrastructure et intelligence artificielle.

## 🚀 Technologies

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS v4 + shadcn/ui
- **Content** : MDX (Filesystem-based)
- **Internationalisation** : Support bilingue (FR/EN)
- **Typographie** : @tailwindcss/typography (Prose)

## 📂 Structure du Contenu

Les articles sont organisés par catégories dans le dossier `content/` :

- `ctf/` : Analyses de challenges et compétitions.
- `pentest-labs/` : Rapports d'intrusion (Metasploitable, TryHackMe, HTB).
- `walkthroughs/` : Guides méthodologiques et explorations de RFC.

## 🛠️ Installation & Développement

Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [pnpm](https://pnpm.io/) installés.

1.  **Cloner le dépôt** :

    ```bash
    git clone https://github.com/votre-username/ZCookOps.git
    cd ZCookOps
    ```

2.  **Installer les dépendances** :

    ```bash
    pnpm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    pnpm dev
    ```
    Accédez à `http://localhost:3000`.

## 📖 Comment ajouter un article ?

1. Créez un fichier `.mdx` dans la catégorie appropriée de `content/`.
2. Ajoutez le frontmatter suivant au début du fichier :
   ```markdown
   ---
   title: 'Titre de votre article'
   date: 'AAAA-MM-JJ'
   tags: ['Tag1', 'Tag2']
   category: 'pentest-labs'
   lang: 'fr'
   description: "Brève description de l'article."
   difficulty: 'medium'
   ---
   ```
3. Rédigez votre contenu en Markdown/MDX. Utilisez `##` pour vos sections principales afin qu'elles apparaissent dans le sommaire.

## 📄 Licence

Ce projet est sous licence MIT.

---

Développé avec passion par **zcook**.

<div align="center">
   <h1><a target="_blank" href="https://lynkos.dev" alt="lynkos.dev">lynkos.github.io</a></h1>
    <img alt="HTML" src="https://img.shields.io/static/v1?label=Language&style=flat&message=HTML&logo=html5&color=E34F26&labelColor=393939&logoColor=E34F26">
    <img alt="JavaScript" src="https://img.shields.io/static/v1?label=Language&style=flat&message=JavaScript&logo=javascript&color=F7DF1E&labelColor=393939&logoColor=F7DF1E">
    <img alt="jQuery" src="https://img.shields.io/static/v1?label=Language&style=flat&message=jQuery&logo=jquery&color=0769AD&labelColor=393939&logoColor=0769AD">
    <img alt="YAML" src="https://img.shields.io/static/v1?label=Language&style=flat&message=YAML&logo=yaml&color=CB171E&labelColor=393939&logoColor=CB171E">
    <img alt="CSS" src="https://img.shields.io/static/v1?label=Language&style=flat&message=CSS&logo=css&color=663399&labelColor=393939&logoColor=663399">
    <img alt="JSON" src="https://img.shields.io/static/v1?label=Language&style=flat&message=JSON&logo=json&color=000000&labelColor=393939&logoColor=000000">
    <img alt="Node.js" src="https://img.shields.io/static/v1?label=Runtime&style=flat&message=Node.js&logo=node.js&color=5FA04E&labelColor=393939&logoColor=5FA04E">
    <img alt="SASS" src="https://img.shields.io/static/v1?label=Pre-processor&style=flat&message=SASS&logo=sass&color=CC6699&labelColor=393939&logoColor=CC6699">
    <img alt="Babel" src="https://img.shields.io/static/v1?label=Compiler&style=flat&message=Babel&logo=babel&color=F9DC3E&labelColor=393939&logoColor=F9DC3E">
    <img alt="npm" src="https://img.shields.io/static/v1?label=Package+Manager&style=flat&message=npm&logo=npm&color=CB3837&labelColor=393939&logoColor=CB3837">
    <img alt="Nodemon" src="https://img.shields.io/static/v1?label=Tool&style=flat&message=Nodemon&logo=nodemon&color=76D04B&labelColor=393939&logoColor=76D04B">
    <img alt="GitHub Actions" src="https://img.shields.io/static/v1?label=Tool&style=flat&message=GitHub+Actions&logo=github+actions&color=2088FF&labelColor=393939&logoColor=2088FF">
    <img alt="GitHub Pages" src="https://img.shields.io/static/v1?label=Tool&style=flat&message=GitHub+Pages&logo=github+pages&color=222222&labelColor=393939&logoColor=222222">
    <img alt="Code+Editor" src="https://img.shields.io/static/v1?label=Code+Editor&style=flat&message=Visual+Studio+Code&logo=visual+studio+code&color=007acc&labelColor=393939&logoColor=007acc">
    <br>
    <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/lynkos/lynkos.github.io/.github%2Fworkflows%2Fgh-pages.yml?style=flat">
    <img alt="Website status" src="https://img.shields.io/website?url=https%3A%2F%2Flynkos.dev&up_message=online&up_color=green&down_message=offline&down_color=red&style=flat">
   <p>macOS Sequoia-inspired personal website.</p>
</div>

<details open>
    <summary>Home Page</summary>
    <div align="center">
        <figure>
            <picture><img width="100%" alt="Home Page" src="assets/images/misc/demo.png"></picture>
        </figure>
    </div>
</details>

<details open>
    <summary>404: Error Not Found Page</summary>
    <div align="center">
        <figure>
            <picture><img width="100%" alt="404: Error Not Found Page" src="assets/images/misc/404.png"></picture>
        </figure>
    </div>
</details>

## Features
> [!NOTE]
> Additional features are still in development
> 
> Current features are actively being optimized and improved

Includes (but is not limited to):
* **Mail**
  * Send me an email directly, without leaving the site!
  * Includes reCAPTCHA to prevent spam
  * Your email and message are required
  * Subject is optional
* **iTerm**
  * `help`, `ls`, and `clear` commands are supported (doesn't work on mobile devices)
  * Timestamp (i.e. displays date and time when site is loaded)
* **Safari**
  * Click on any skill to toggle its description
  * Interactive address bar
* **Notes**
  * Sidebar is resizable
* **TextEdit**
  * Font family, size, color, and line-height can be changed
  * Font alignment (i.e. left, center, right, justify) can be changed
  * Font style (i.e. bold, italic, underline) can be changed
* **Launchpad**
  * Apps are draggable/reorderable
  * Apps are searchable (i.e. type in searchbar to filter)
* **Calculator**
  * Fully functional calculator
  * Supports basic arithmetic operations, including:
    * Addition (**+**)
    * Subtraction (**−**)
    * Multiplication (**×**)
    * Division (**÷**)
    * Modulus (**%**)
* **Menubar**
  * Real-time **Clock** (i.e. displays date and time)
  * Click the play icon in the upper-right corner of the menubar to open **Music Player** and see what I am/was listening to
* **Dock**
  * Clicking/opening and unopened any app produces a bouncing effect
* **Desktop**
  * `src`, `about.rtf`, `banner.txt`, and `profile.jpg` are all draggable
  * Double-click (or tap, if on mobile) `about.rtf` or `profile.jpg` to open
* **Trash**
  * Clicking the trash icon in the dock opens the trash
  * Clicking "Empty Trash" will empty the trash (i.e. replace the trash icon with an empty trash icon and produce a sound effect)

## Requirements
- [x] [npm](https://docs.npmjs.com/getting-started)
- [x] [Node.js](https://nodejs.org/en/download)

## Installation
1. Enter directory where you want to clone repository (`lynkos.github.io`)
    * UNIX
        ```sh
        cd ~/path/to/directory
        ```
    * Windows
        ```sh
        cd C:\path\to\directory
        ```
2. Clone and enter repository
    ```sh
    git clone https://github.com/lynkos/lynkos.github.io.git && cd lynkos.github.io
    ```
3. Install dependencies
    ```sh
    npm install
    ```

## Usage
* Build project
    ```sh
    npm run build
    ```
* Start development environment
    ```sh
    npm run dev
    ```

## Repository Structure
### [`main`](https://github.com/lynkos/lynkos.github.io/tree/main) branch
> [!NOTE]
> [`main`](https://github.com/lynkos/lynkos.github.io/tree/main) is used for development
```
.
├── .github/
│   ├── workflows/
│   │   └── gh-pages.yml
│   └── dependabot.yml
├── assets/
│   ├── audio/
│   │   └── empty_trash.mp3
│   ├── favicon/
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── site.webmanifest
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
│   ├── images/
│   │   ├── apps/
│   │   │   ├── calc.png
│   │   │   ├── discord.png
│   │   │   ├── github.svg
│   │   │   ├── iterm.png
│   │   │   ├── launchpad.png
│   │   │   ├── mail.png
│   │   │   ├── notes.png
│   │   │   ├── preview.png
│   │   │   ├── safari.png
│   │   │   ├── spotify.png
│   │   │   ├── steam.png
│   │   │   └── text_edit.png
│   │   ├── icons/
│   │   │   ├── angles-up-down.svg
│   │   │   ├── control_center.svg
│   │   │   └── terminal.svg
│   │   ├── misc/
│   │   │   ├── 404.png
│   │   │   ├── demo.png
│   │   │   ├── mpc.jpg
│   │   │   └── profile.jpg
│   │   └── system/
│   │       ├── blue_folder.png
│   │       ├── empty_trash.png
│   │       ├── rtf_icon.png
│   │       ├── text_file.png
│   │       └── trash.png
│   └── stylesheets/
│       └── sass/
│           ├── _mixins.sass
│           ├── _variables.sass
│           ├── 404.sass
│           ├── browser.sass
│           ├── calculator.sass
│           ├── dock.sass
│           ├── launchpad.sass
│           ├── mail.sass
│           ├── menubar.sass
│           ├── notes.sass
│           ├── preview.sass
│           ├── style.sass
│           ├── terminal.sass
│           ├── text-edit.sass
│           └── tooltip.sass
├── src/
│   ├── components/
│   │   ├── 404.js
│   │   ├── calculator.js
│   │   ├── email.js
│   │   ├── terminal.js
│   │   └── windows.js
│   └── utilities/
│       ├── particles.js
│       └── timestamp.js
├── .gitignore
├── 404.html
├── index.html
├── LICENSE.md
├── package-lock.json
├── package.json
└── README.md
```

### [`prod`](https://github.com/lynkos/lynkos.github.io/tree/prod) branch
> [!NOTE]
> [`prod`](https://github.com/lynkos/lynkos.github.io/tree/prod) is used for production
```
.
├── assets/
│   ├── audio/
│   │   └── empty_trash.mp3
│   ├── favicon/
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── site.webmanifest
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
│   ├── images/
│   │   ├── apps/
│   │   │   ├── calc.png
│   │   │   ├── discord.png
│   │   │   ├── github.svg
│   │   │   ├── iterm.png
│   │   │   ├── launchpad.png
│   │   │   ├── mail.png
│   │   │   ├── notes.png
│   │   │   ├── preview.png
│   │   │   ├── safari.png
│   │   │   ├── spotify.png
│   │   │   ├── steam.png
│   │   │   └── text_edit.png
│   │   ├── icons/
│   │   │   ├── angles-up-down.svg
│   │   │   ├── control_center.svg
│   │   │   └── terminal.svg
│   │   ├── misc/
│   │   │   ├── 404.png
│   │   │   ├── demo.png
│   │   │   ├── mpc.jpg
│   │   │   └── profile.jpg
│   │   └── system/
│   │       ├── blue_folder.png
│   │       ├── empty_trash.png
│   │       ├── rtf_icon.png
│   │       ├── text_file.png
│   │       └── trash.png
│   └── stylesheets/
│       └── css/
│           ├── 404.css
│           ├── browser.css
│           ├── calculator.css
│           ├── dock.css
│           ├── launchpad.css
│           ├── mail.css
│           ├── menubar.css
│           ├── notes.css
│           ├── preview.css
│           ├── style.css
│           ├── terminal.css
│           ├── text-edit.css
│           └── tooltip.css
├── dist/
│   ├── components/
│   │   ├── 404.js
│   │   ├── calculator.js
│   │   ├── email.js
│   │   ├── terminal.js
│   │   └── windows.js
│   └── utilities/
│       ├── particles.js
│       └── timestamp.js
├── .nojekyll
├── 404.html
├── CNAME
├── index.html
├── robots.txt
└── sitemap.xml
```

## Resources
* [GitHub Pages Action](https://github.com/marketplace/actions/github-pages-action)
* [GitHub Actions: Cache](https://github.com/actions/cache)
* [GitHub Actions: Deploy Pages](https://github.com/actions/deploy-pages)
* [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
* [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
* [Deploy Nuxt on GitHub Pages](https://v2.nuxt.com/deployments/github-pages)
* [Node Version Manager (NVM): GitHub Repository](https://github.com/nvm-sh/nvm)
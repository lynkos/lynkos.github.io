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
    <figure>
        <picture><img width="100%" alt="Home Page" src="../assets/images/misc/demo.png"></picture><br>
        <figcaption>Home Page</figcaption>
    </figure>
    <figure>
        <picture><img width="100%" alt="404: Error Not Found Page" src="../assets/images/misc/404.gif"></picture><br>
        <figcaption>404: Error Not Found Page</figcaption>
    </figure>
</div>

## Features
Includes (but not limited to):
* Mail
* iTerm
* Safari
* Notes
* TextEdit
* Launchpad
* Calculator
* Menubar
* Dock
* Desktop
* Trash

## Requirements
- [x] <a target="_blank" href="https://nodejs.org" alt="Node.js">Node.js</a>
- [x] <a target="_blank" href="https://www.npmjs.com" alt="npm">npm</a>

## Installation
1. Enter the the directory where you want the repository (`lynkos.github.io`) to be cloned
    * UNIX
        ```sh
        cd ~/path/to/directory
        ```
    * Windows
        ```sh
        cd C:\path\to\directory
        ```
2. Clone the repository, then enter its directory
    ```sh
    git clone https://github.com/lynkos/lynkos.github.io.git && cd lynkos.github.io
    ```
3. Install the dependencies
    ```sh
    npm install
    ```

## Usage
* Build the project
    ```sh
    npm run build
    ```
* Start the development environment
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
│   │   │   ├── 404.gif
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
├── docs/
│   └── README.md
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
├── package-lock.json
└── package.json
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
└── index.html
```
# Hollywood Director-Crew Networks

Visit the site [here](https://dcnetwork.github.io/director-crew-network/)!

### About

The Hollywood Director-Crew Networks website was built by [Ian MacDonald](https://www.ian-macdonald.com/), a student of Computer Science and Film & Media Studies at [William & Mary](https://www.wm.edu/). The network model was created by [Dr. Alexander C. Nwala](https://alexandernwala.com/), assistant professor of Data Science at William & Mary, based on a research interest and idea of [Dr. Arthur Knight](https://www.wm.edu/as/english/facultystaff/knight_a.php), Associate Professor, American Studies and English at William & Mary.

This project was initially developed as a [group project](https://github.com/anwala/teaching-network-science/tree/main/spring-2023/homework/hw5-group) in an [undergraduate Network Science course](https://github.com/anwala/teaching-network-science/blob/main/spring-2023/README.md) taught by Dr. Alexander Nwala.

We thank the William & Mary Office of the Provost for funding this project through the 2023 Faculty Summer Research Grant Award.

### Development

This website was built using [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/). The graph data was modelled and exported using [Gephi](https://gephi.org/) and is visualized using [React Sigma](https://sim51.github.io/react-sigma/) and [Graphology](https://www.npmjs.com/package/graphology).

#### Getting Started

To develop the project locally first ensure you have an up-to-date version of [npm](https://www.npmjs.com/) installed. The project contains a `Makefile` with commands for the setup and usage of the development environment, as well as building the production version.

Clone the website locally with:

```bash
git clone https://github.com/dcnetwork/director-crew-network
```

After cloning the repository, from the top-level directory of the website run:

```bash
npm install
npm run dev
```

The website is then accessible at `http://localhost:5173/`.

#### Project Structure

On the top level of the project are all the configuration files related to Vite, TypeScript, the [package.json](app/package.json), and utilities related to linting and formatting. The [src](app/src/) folder contains the contents of the React app.

The main file of the React app is [index.tsx](app/src/index.tsx), which contains the contexts for persistent data, URL routing, responsive styling, and the application itself. [App.tsx](app/src/App.tsx) contains the actual routing (done with [react-router-dom](https://reactrouter.com/en/main)).

#### Linting & Formatting

For the frontend, linting is done with [ESLint](https://eslint.org/) while code formatting is done with [Prettier](https://prettier.io/) and [Stylelint](https://stylelint.io/). These can be triggered by executing `npm run format`.

#### Versioning

This repository uses [semantic versioning](https://docs.npmjs.com/about-semantic-versioning) to track changes. To update the version use `npm version` followed be either `patch`, `minor`, or `major` accordingly. 

### Deployment

The production version of this website is hosted using GitHub Pages. Deployment is done using a GitHub Action that can be invoked using the [GitHub CLI](https://cli.github.com/). A Makefile is provided to make this process easier:

```bash
make release
```
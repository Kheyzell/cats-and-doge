# CatsAndDoge

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Requirements

### PNPM

This project uses `pnpm` to manage node modules.
Installation:
```sh
npm install -g pnpm@latest-10
```

### Node.js version 18.19.1 or newer

Installation avec `nvm`:
```sh
nvm install --lts
nvm use --lts
```

### Angular CLI (optionnal)

Installation:
```sh
pnpm install -g @angular/cli
```

## Get started

To start the project locally use the command:
```sh
pnpm start
```

## Project structure

* **app**
	+ **core**: Core module containing shared resources
		- **components**: Reusable UI components
		- **constants**: Global constants
		- **enums**: Global Enums
		- **resources**: Resources used to fetch data from APIs
		- **services**: Global services
		- **types**: shared types
	+ **features**: Application feature modules
		- **buy-transport-ticket**: Buy transport ticket with Dogecoin
		- **cryptocurrency-metrics**: Different metrics about cryptocurrencies

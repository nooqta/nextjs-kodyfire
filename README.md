# Welcome to nextjs-kodyfire 👋
![Version](https://img.shields.io/badge/version-0.0.5-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/nooqta/kodyfire#install-a-kody)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/nooqta/kodyfire/blob/main/LICENSE)
[![Twitter: anis\_marrouchi](https://img.shields.io/twitter/follow/anis\_marrouchi.svg?style=social)](https://twitter.com/anis\_marrouchi)

> Generate nextjs components and related artifacts based on HTML templates using [Kodyfire](https://github.com/nooqta/kodyfire).

### 🏠 [Homepage](https://github.com/nooqta/kodyfire)

## Requirements

nextjs-kodyfire requires the [kodyfire-cli](https://github.com/nooqta/kodyfire) to be installed

```sh
npm install -g kodyfire-cli
```
## Install

```sh
npm install nextjs-kodyfire
```

## Usage

### Method 1: As a generator
In order to generate your artifacts, run the `generate` command. The syntax is `kody generate|g [kody] [concept]`. If you ommit `kody` and `concept` the assistant will prompt you to select them. As an example, run the following command from your terminal:
```sh
kody generate nextjs component
```
### Method 2: As a runner in a kody project
Refer to the kodyfire __[generate your artifact](https://github.com/nooqta/kodyfire#generate-your-artifact)__ section.
Once your project is initialized and ready for kody,
generate your tsconfig concept using the `kody ride` command or manually. As an example, A declaration for a tsconfig concept might look like the following: 
```json
{
			"name": "Bird",
			"template": "class.ts.template",
			"outputDir": "classes",
			"extends": "Animal",
			"implements": "",
			"hasConstructor": true,
			"args": [
				{
					"name": "name",
					"type": "string"
				}
			],
			"methods": [
				{
					"name": "fly",
					"returnType": "void"
				}
			],
			"properties": [
				{
					"name": "family",
					"type": "string",
					"optional": false
				},
				{
					"name": "weight",
					"type": "number",
					"optional": true
				}
			]
		}
```

After adding your concept(s) definitions, run the following command to generate your assets.

```sh
kody run -s kody-nextjs.json
```
### Available concepts 

#### `component`
> Generates a react component

##### Params

- `name` _string_ - Component name. Default filename
- `template` _enum_ - template name to use. Only one by default.
- `extension` _enum_ - file extension. Possible values: js, ts, jsx, tsx
- `isFolder` _boolean_ - If the component will be placed in a folder. This will add an index file for imports.
- `ccsModule` _boolean_ - if a css module file should be created.
- `outputDir` _string_ - The output directory

#### `page`
> Generates a nextjs page
//TODO

#### `api`
> Generates a nextjs api endpoint
//TODO

#### `class` 

> Generates a typescript class

##### Params

- `name` _string_ - class name. Default filename
- `template` _enum_ - template name to use. Only one by default.
- `implements` _string_ - Interface(s) to implement
- `extends` _string_ - class(es) to extend.
- `properties` [_Property[]_](#property) - list of properties
- `methods` [_Method[]_](#method) - list of methods
- `hasConstructor` _boolean_ - if class should have a constructor
- `args` _{name: string, type: string}_ - List of argument to pass to the constructor. `hasConstructor` must be true.
- `outputDir` _string_ - The output directory

#### `interface` 

> Generates a typescript interface

##### Params

- `name` _string_ - class name. Default filename
- `template` _enum_ - template name to use. Only one by default.
- `extends` _string_ - class(es) to extend.
- `properties` [_Property[]_](#property) - list of properties
- `outputDir` _string_ - The output directory

#### `tsconfig` 

> Generates a tsconfig file
##### Params

- `name` [__enum__](#Tsconfigs) - The tsconfig  configuration name
- `outputDir` _string_ - The output directory


###### Tsconfigs
Refer to [this reference](https://github.com/tsconfig/bases/tree/main/bases) for a list of available tsconfig templates
###### Property
- `name` _string_ - property name
- `type` _string_ - property type
- `optional` _boolean_ - if the property is optional when constructing an object


###### Method
- `name` _string_ - method name
- `params` _{name: string, type: string}_ - list of method arguments. Leave empty if none
- `returnType` _string_ - Return type (example: string, number, void)
  

Add the following params to your generated concepts using the `kody ride` command or manually. As an example, A declaration for a class might look like the following:
## 📅 Future Features
- Generate `component`
- Generate `page`
- Generate `api`

## Run tests

```sh
TODO
```

## Author

👤 **Anis Marrouchi**

* Website: https://noqta.tn
* Twitter: [@anis\_marrouchi](https://twitter.com/anis\_marrouchi)
* GitHub: [@anis-marrouchi](https://github.com/anis-marrouchi)
* LinkedIn: [@marrouchi](https://linkedin.com/in/marrouchi)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/anis-marrouchi/nextjs-kodyfire/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## Credits

- [kodyfire](https://github.com/nooqta/kodyfire) by [nooqta](https://github.com/nooqta) The kodyfire generator.

## 📝 License

Copyright © 2022 [Anis Marrouchi](https://github.com/anis-marrouchi).

This project is [MIT](https://github.com/nooqta/kodyfire/blob/main/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-kodyfire](https://github.com/nooqta/readme-kodyfire)_

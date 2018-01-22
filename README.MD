# dual-pick-list / AngularJS 1.6.1 or lower

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ouracademy/ngx-dual-listbox/master/LICENSE)

## Demo
https://github.com/caiquevallim/dual-pick-list.git

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

The dual-pick-list has been created for help us to create a dual list box fastest in AngularJS 1.6.1 or lower.

## Installation

Install through npm:
```
$ npm install bootstrap@v3.3.6 --save
$ npm install smart-table --save
$ npm install dual-pick-list --save
```

Then include in your apps module (app.js):

```JavaScript
angular.module('app',['dual-pick-list']);
```

And now include in your app.scripts.json:

```JSON
{
    "chunks":{
        "vendor":[
            "dual-pick-list"
        ]
    },
    "paths":{
        "dual-pick-list":"node_modules/dual-pick-list/dual-pick-list.component.js"
    }
}
```


Finally use in one of your apps components:

You're going to need to include in your HTML 5 file the following statment:
```HTML 5
    <dual-pick-list list="items"
                    on-transaction="onTransactionDualList(leftList, rightList)"
                    header-config="headerConfig">
    </dual-pick-list>
```

## Documentation
In Maintenance

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

## License

MIT

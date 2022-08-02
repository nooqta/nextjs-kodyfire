"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.pageArray = exports.conceptArray = exports.page = exports.concept = void 0;
const react_kodyfire_1 = require("react-kodyfire");
exports.concept = {
    type: 'object',
    properties: {
        name: { type: 'string', description: 'Name of the component' },
        template: {
            type: 'string',
            description: 'Name of the template',
            enum: [
                'functional.js.template',
                'class.js.template',
                'pure-class.js.template',
            ],
            default: 'functional.js.template'
        },
        extension: {
            description: 'Extension of the file (default: js)',
            enum: ['js', 'jsx', 'tsx', 'ts'],
            default: 'js',
        },
        isFolder: { type: 'boolean', default: false, description: 'Is a folder. Will include an index for imports.' },
        cssModule: { type: 'boolean', default: false, description: 'Include a css module file.' },
        outputDir: { type: 'string', default: 'src/components' },
    },
};
exports.page = {
    type: 'object',
    properties: {
        name: { type: 'string', description: 'Name of the page' },
        template: {
            type: 'string',
            description: 'Name of the template',
            enum: [
                'page.jsx.template'
            ],
            default: 'page.jsx.template'
        },
        isFolder: { type: 'boolean', default: false, description: 'Is a folder. Will include an index for imports.' },
        cssModule: { type: 'boolean', default: false, description: 'Include a css module file.' },
        isDynamicRoute: { type: 'boolean', default: false, description: 'This page uses a dynamic route.' },
        routerParam: { type: 'string', description: 'If this page uses a dynamic route (ex: [id].jsx)' },
        outputDir: { type: 'string', default: 'src/pages' },
    },
};
exports.conceptArray = {
    type: 'array',
    items: exports.concept,
};
exports.pageArray = {
    type: 'array',
    items: exports.page,
};
exports.schema = {
    type: 'object',
    properties: Object.assign(Object.assign({}, react_kodyfire_1.schema.properties), { project: { type: 'string' }, name: { type: 'string' }, rootDir: { type: 'string' }, concept: exports.conceptArray, page: exports.pageArray }),
    required: ['name'],
};
//# sourceMappingURL=schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.apiArray = exports.pageArray = exports.conceptArray = exports.api = exports.page = exports.concept = void 0;
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
        cssModule: { type: 'string',
            enum: [
                'none',
                'css',
                'scss'
            ],
            default: 'none',
        },
        isDynamicRoute: { type: 'boolean', default: false, description: 'This page uses a dynamic route.' },
        routerParam: { type: 'string', condition: ({ isDynamicRoute }) => isDynamicRoute == true, description: 'If this page uses a dynamic route (ex: if want [id].ext type id)' },
        outputDir: { type: 'string', default: 'src/pages' },
    },
};
exports.api = {
    type: 'object',
    properties: {
        name: { type: 'string', description: 'Name of the file/folder' },
        template: {
            type: 'string',
            description: 'Name of the template',
            enum: [
                'index.ts.template'
            ],
            default: 'index.ts.template'
        },
        isFolder: { type: 'boolean', default: false, description: 'Is a folder containing an index file.' },
        isDynamicRoute: { type: 'boolean', default: false, description: 'This page uses a dynamic route.' },
        routerParam: { type: 'string', description: 'If this endpoint uses a dynamic route (ex: [id].ts)' },
        outputDir: { type: 'string', default: 'src/pages/api' },
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
exports.apiArray = {
    type: 'array',
    items: exports.api,
};
exports.schema = {
    type: 'object',
    properties: Object.assign(Object.assign({}, react_kodyfire_1.schema.properties), { project: { type: 'string' }, name: { type: 'string' }, rootDir: { type: 'string' }, concept: exports.conceptArray, page: exports.pageArray, api: exports.apiArray }),
    required: ['name'],
};
//# sourceMappingURL=schema.js.map
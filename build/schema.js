"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.conceptArray = exports.concept = void 0;
const typescript_kodyfire_1 = require("typescript-kodyfire");
exports.concept = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        template: {
            type: 'string',
            enum: ['sample.html.template'],
        },
        outputDir: { type: 'string' },
    },
};
exports.conceptArray = {
    type: 'array',
    items: exports.concept,
};
exports.schema = {
    type: 'object',
    properties: Object.assign(Object.assign({}, typescript_kodyfire_1.schema.properties), { project: { type: 'string' }, name: { type: 'string' }, rootDir: { type: 'string' }, concept: exports.conceptArray }),
    required: ['name'],
};
//# sourceMappingURL=schema.js.map
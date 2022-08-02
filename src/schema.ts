import {schema as reactSchema } from 'react-kodyfire';
export const concept = {
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
export const page = {
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

export const conceptArray = {
  type: 'array',
  items: concept,
};
export const pageArray = {
  type: 'array',
  items: page,
};
export const schema = {

  type: 'object',
  properties: {
    ...reactSchema.properties,
    project: { type: 'string' },
    name: { type: 'string' },
    rootDir: { type: 'string' },
    concept: conceptArray,
    page: pageArray
  },
  required: ['name'],
};

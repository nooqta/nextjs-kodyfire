import { IConcept, ITechnology } from 'kodyfire-core';
import { join, relative } from 'path';

import { Concept as BaseConcept } from './concept';
import { Engine } from './engine';
export class Page extends BaseConcept {
  constructor(concept: Partial<IConcept>, technology: ITechnology) {
    super(concept, technology);
    this.engine = new Engine();

    // Register functions you want to use in your templates with the engine builder registerHelper method.
    this.engine.builder.registerHelper('uppercase', (value: any) => {
      return value.toUpperCase();
    });
  }

  async generate(_data: any) {
    // @todo: use a more global aproach for overwriting default. For now we allow overwriting the extension per concept
    this.extension = _data.extension || this.extension;
    const template = await this.engine.read(
      join(this.getTemplatesPath(), this.template.path),
      _data.template
    );

    const compiled = this.engine.compile(template, _data);
    if(_data.isDynamicRoute) {
      _data.outputDir = join(_data.outputDir, _data.name.toLowerCase());
      _data.filename = join(_data.outputDir, `[${_data.routerParam||_data.name}].${this.getExtension(_data.template)}`);
    } else if(_data.isFolder) {
      // We update the path
      _data.outputDir = join(_data.outputDir, _data.name.toLowerCase());
      _data.filename = join(_data.outputDir, `index.${this.getExtension(_data.template)}`);
    }
    
    // We create the css module file
    _data.cssModule = _data.cssModule == 'none'? false : _data.cssModule;
    if(_data.cssModule) {
      const cssModuleTemplate = await this.engine.read(
        join(this.getTemplatesPath(), this.template.path),
        'component.css.template'
      );
      const cssModuleCompiled = this.engine.compile(cssModuleTemplate, _data);
      await this.engine.createOrOverwrite(
        this.technology.rootDir,
        this.outputDir,
        join(_data.outputDir, `${_data.name.toLowerCase()}.module.${_data.cssModule}`),
        cssModuleCompiled
      );
    }

    await this.engine.createOrOverwrite(
      this.technology.rootDir,
      this.outputDir,
      this.getFilename(_data),
      compiled
    );
  }

  getFilename(data: any) {
    if (data.filename) return data.filename;
    return join(
      data.outputDir,
      `${data.name}.${this.getExtension(data.template)}`
    );
  }

  getExtension(templateName: string) {
    if(typeof this.extension != 'undefined' && this.extension) return this.extension;
    return templateName.replace('.template', '').split('.').pop() || '.js';
  }

  getTemplatesPath(): string {
    return this.technology.params.templatesPath
      ? this.technology.params.templatesPath
      : relative(process.cwd(), __dirname);
  }
}

import { IConcept, ITechnology } from 'kodyfire-core';
import { join, relative } from 'path';

import { Concept as BaseConcept } from 'basic-kodyfire';
import { Engine } from './engine';
export class Concept extends BaseConcept {
  constructor(concept: Partial<IConcept>, technology: ITechnology) {
    super(concept, technology);
    this.engine = new Engine();

    // Register functions you want to use in your templates with the engine builder registerHelper method.
    this.engine.builder.registerHelper('uppercase', (value: any) => {
      return value.toUpperCase();
    });
  }

  async generate(_data: any) {
    const template = await this.engine.read(
      join(this.getTemplatesPath(), this.template.path),
      _data.template
    );

    const compiled = this.engine.compile(template, _data);

    // if is requires a directory, create it and create the index file
    if(_data.isFolder) {
      const indexTemplate = await this.engine.read(
        join(this.getTemplatesPath(), this.template.path),
        'index.js.template'
      );
      const indexCompiled = this.engine.compile(indexTemplate, _data);
      // We update the path
      _data.outputDir = join(_data.outputDir, _data.name.toLowerCase());
      await this.engine.createOrOverwrite(
        this.technology.rootDir,
        this.outputDir,
        join(_data.outputDir, 'index.' + _data.extension.replace('jsx', 'js').replace('tsx', 'ts')),
        indexCompiled
      );
    }

    // We create the css module file
    if(_data.cssModule) {
      const cssModuleTemplate = await this.engine.read(
        join(this.getTemplatesPath(), this.template.path),
        'component.css.template'
      );
      const cssModuleCompiled = this.engine.compile(cssModuleTemplate, _data);
      await this.engine.createOrOverwrite(
        this.technology.rootDir,
        this.outputDir,
        join(_data.outputDir, _data.name.toLowerCase() + '.module.css'),
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
      `${data.name}.${this.getExtension(data.extension)}`
    );
  }

  getExtension(extension: string) {
    return extension;
  }

  getTemplatesPath(): string {
    return this.technology.params.templatesPath
      ? this.technology.params.templatesPath
      : relative(process.cwd(), __dirname);
  }
}

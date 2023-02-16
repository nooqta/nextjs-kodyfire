"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const path_1 = require("path");
const concept_1 = require("./concept");
const engine_1 = require("./engine");
class Page extends concept_1.Concept {
    constructor(concept, technology) {
        super(concept, technology);
        this.engine = new engine_1.Engine();
        // Register functions you want to use in your templates with the engine builder registerHelper method.
        this.engine.builder.registerHelper('uppercase', (value) => {
            return value.toUpperCase();
        });
    }
    generate(_data) {
        return __awaiter(this, void 0, void 0, function* () {
            // @todo: use a more global aproach for overwriting default. For now we allow overwriting the extension per concept
            this.extension = _data.extension || this.extension;
            const template = yield this.engine.read((0, path_1.join)(this.getTemplatesPath(), this.template.path), _data.template);
            const compiled = this.engine.compile(template, _data);
            if (_data.isDynamicRoute) {
                _data.outputDir = (0, path_1.join)(_data.outputDir, _data.name.toLowerCase());
                _data.filename = (0, path_1.join)(_data.outputDir, `[${_data.routerParam || _data.name}].${this.getExtension(_data.template)}`);
            }
            else if (_data.isFolder) {
                // We update the path
                _data.outputDir = (0, path_1.join)(_data.outputDir, _data.name.toLowerCase());
                _data.filename = (0, path_1.join)(_data.outputDir, `index.${this.getExtension(_data.template)}`);
            }
            // We create the css module file
            _data.cssModule = _data.cssModule == 'none' ? false : _data.cssModule;
            if (_data.cssModule) {
                const cssModuleTemplate = yield this.engine.read((0, path_1.join)(this.getTemplatesPath(), this.template.path), 'component.css.template');
                const cssModuleCompiled = this.engine.compile(cssModuleTemplate, _data);
                yield this.engine.createOrOverwrite(this.technology.rootDir, this.outputDir, (0, path_1.join)(_data.outputDir, `${_data.name.toLowerCase()}.module.${_data.cssModule}`), cssModuleCompiled);
            }
            yield this.engine.createOrOverwrite(this.technology.rootDir, this.outputDir, this.getFilename(_data), compiled);
        });
    }
    getFilename(data) {
        if (data.filename)
            return data.filename;
        return (0, path_1.join)(data.outputDir, `${data.name}.${this.getExtension(data.template)}`);
    }
    getExtension(templateName) {
        if (typeof this.extension != 'undefined' && this.extension)
            return this.extension;
        return templateName.replace('.template', '').split('.').pop() || '.js';
    }
    getTemplatesPath() {
        return this.technology.params.templatesPath
            ? this.technology.params.templatesPath
            : (0, path_1.relative)(process.cwd(), __dirname);
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map
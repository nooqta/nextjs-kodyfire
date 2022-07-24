import { Technology as BaseTechnology } from 'basic-kodyfire';
import { Technology as TsTechnology } from 'typescript-kodyfire';
import * as classes from '.';
import * as  tsClasses from 'typescript-kodyfire';
import * as assets from './assets.json';
import { capitalize, ITechnology } from 'kodyfire-core';
export class Technology extends BaseTechnology {
  technologies: ITechnology[];
  constructor(params: any, _assets = assets) {
    try {
      super(params, _assets);
      this.assets = _assets;
      this.updateTemplatesPath(params);
      this.initConcepts();
      const tsTechno = new TsTechnology(params, _assets);
      tsTechno.updateTemplatesPath(params);
      tsTechno.initConcepts();
      this.technologies = [tsTechno];
    } catch (error) {
      console.log(error);
    }
  }

  public initConcepts() {
    // add dynamic property for technology
    for (const concept of this.assets.concepts) {
      const conceptClasses = { ...classes, ...tsClasses };
      this.concepts.set(
        concept.name,
        new (<any>conceptClasses)[capitalize(concept.name)](concept, this)
      );
    }
    
  }
}

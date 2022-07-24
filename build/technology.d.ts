import { Technology as BaseTechnology } from 'basic-kodyfire';
import { ITechnology } from 'kodyfire-core';
export declare class Technology extends BaseTechnology {
    technologies: ITechnology[];
    constructor(params: any, _assets?: {
        name: string;
        version: string;
        rootDir: string;
        concepts: {
            name: string;
            outputDir: string;
            template: {
                path: string;
                options: never[];
                placeholders: never[];
            };
        }[];
    });
    initConcepts(): void;
}

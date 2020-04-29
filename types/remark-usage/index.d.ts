import { Plugin } from 'unified';

declare const usage: Plugin<[usage.Options?]>

declare namespace usage {
  interface Options {
    heading?: string;
    example?: string;
    name?: string;
    main?: string;
    experimentalModules?: unknown;
  }
}

export = usage;

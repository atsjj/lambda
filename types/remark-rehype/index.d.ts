import { Plugin } from 'unified';

declare const rehype: Plugin<[rehype.MdastUtilToHastOptions?]>

declare namespace rehype {
  interface MdastUtilToHastOptions {
    allowDangerousHtml?: boolean;
    commonmark?: boolean;
    handlers?: unknown;
    unknownHandler?: unknown;
  }
}

export = rehype;

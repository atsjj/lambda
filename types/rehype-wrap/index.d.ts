import { Plugin } from 'unified';

declare const wrap: Plugin<[wrap.Options?]>

declare namespace wrap {
  interface Options {
    selector?: string;
    wrapper?: string;
  }
}

export = wrap;

import { Plugin } from 'unified';
import { HastUtilToHtmlOptions } from 'hast-util-to-html';

declare const stringify: Plugin<[HastUtilToHtmlOptions?]>

declare namespace stringify {
}

export = stringify;

import handlebars from 'handlebars';

declare function helpers(options: helpers.Options): void;

declare namespace helpers {
  interface Options {
    handlebars?: typeof handlebars;
  }
}

export = helpers;

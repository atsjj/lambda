import * as handlebars from 'handlebars';
import * as helpers from 'handlebars-helpers';

helpers({ handlebars });

export const { compile } = handlebars;

export { handlebars };

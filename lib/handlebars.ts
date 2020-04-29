import handlebars from 'handlebars';
import helpers from 'handlebars-helpers';

helpers({ handlebars });

export const { compile } = handlebars;

export { handlebars };

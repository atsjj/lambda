import { ApplicationPackage, FilePath } from './application-package';
import { compile } from './handlebars';
import { read } from 'to-vfile';
import document from 'rehype-document';
import html from 'rehype-stringify';
import markdown from 'remark-parse';
import rehype from 'remark-rehype';
import unified from 'unified';
import usage from 'remark-usage';
import wrap from 'rehype-wrap';

const css = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css';
const wrapper = 'div.markdown-body';

export async function applicationRenderReadme(applicationPackage: ApplicationPackage, applicationPath: FilePath): Promise<string> {
  const { name: title, readme: path } = applicationPackage;
  const file = await read({ cwd: applicationPath.toString(), path });
  const data = await unified()
    .use(usage, { main: applicationPath.toString(), name: title })
    .use(markdown)
    .use(rehype)
    .use(document, { title, css })
    .use(wrap, { wrapper })
    .use(html)
    .process(file);

  return compile(data.toString(), {})(applicationPackage);
}

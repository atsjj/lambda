import { applicationRenderReadme, readPackage } from '../../';
import { join } from 'path';
import fs from 'fs'
import test from 'ava';

const { readFile } = fs.promises;

test('readme should render', async assert => {
  const testsPath = join(process.cwd(), 'tests');
  const applicationPath = join(testsPath, 'dummy');
  const applicationPackage = await readPackage(applicationPath);
  const renderedReadme = await applicationRenderReadme(applicationPackage, applicationPath);
  const fixtureReadme = (await readFile(join(testsPath, 'fixtures', 'readme.html'))).toString();

  assert.is(renderedReadme, fixtureReadme, 'read me should be blank');
});

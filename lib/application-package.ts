import { IPackageJson } from '@ts-type/package-dts'
import { readFile, readFileSync, PathLike } from 'fs';
import { resolve } from 'path';

const defaultPackagePath: FilePath = resolve(__dirname, '..');

export type ApplicationPackage = IPackageJson;

export type FilePath = PathLike | number;

export type FileOptions = string | undefined | null | {
  encoding?: string | null;
  flag?: string;
};

function readFileAsync(path: FilePath, options?: FileOptions): Promise<string | Buffer> {
  return new Promise(function readFileAsyncPromise(resolve, reject) {
    readFile(path, options, function readFileCallback(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function resolvePackagePath(path?: FilePath): PathLike {
  if (path) {
    return resolve(path.toString(), 'package.json');
  } else {
    return resolve(defaultPackagePath.toString(), 'package.json');
  }
}

export function readPackageSync(path?: FilePath): ApplicationPackage {
  return JSON.parse(readFileSync(resolvePackagePath(path)).toString());
}

export async function readPackage(path?: FilePath): Promise<ApplicationPackage> {
  return JSON.parse((await readFileAsync(resolvePackagePath(path))).toString());
}

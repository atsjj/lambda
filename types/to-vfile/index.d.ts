import { VFile, VFileContents, VFileOptions } from 'vfile';

interface Options {
  encoding?: string;
  flag?: string;
}

interface Callback<F extends VFile> {
  (data: NodeJS.ErrnoException | F): void;
}

declare namespace vfile {
  function read<F extends VFile>(description: VFileContents | F | VFileOptions): Promise<F>;
  function read<F extends VFile>(description: VFileContents | F | VFileOptions, options?: Options): Promise<F>;
  function read<F extends VFile>(description: VFileContents | F | VFileOptions, callback?: Callback<F>): void;
  function read<F extends VFile>(description: VFileContents | F | VFileOptions, options?: Options, callback?: Callback<F>): void;
}

export = vfile;

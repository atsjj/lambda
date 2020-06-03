export class Exception extends Error {
  readonly code: number;
  readonly name: string;

  constructor(code: number, name: string, message: string) {
    super(message);

    this.code = code;
    this.name = name;
  }
}

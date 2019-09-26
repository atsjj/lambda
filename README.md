# Lambda

Open Function Library

## About

This library grew out of the need to DRY up a lot of my existing OpenFaaS services. My goal with
this project is to make the implementation surface area of those services as small as possible.

## Installation

```sh
npm install --save @atsjj/lambda
```

## Usage

```typescript
import { AbstractApplication, createApplication } from '@atsjj/lambda';

class Application extends AbstractApplication {
  async perform(payload: any): Promise<any> {
    ...
  }
}

createApplication(Application, process.cwd());
```

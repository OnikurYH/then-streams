# then-streams

> Convert Node.js Streams to Promise

[![Build Status](https://travis-ci.com/OnikurYH/then-streams.svg?branch=master)](https://travis-ci.com/OnikurYH/then-streams)

## Example

This package is written in TypeScript, also can work on JavaScript!

**Writable Stream**

```ts
import fs from 'fs';
import thenStreams from 'then-streams';

async function readFileToConsole() {
  const stream = fs.createReadStream('some-file.txt')
    .pipe(process.stdout);
  await thenStreams.toPromise(stream);
  console.log('The file has finished reading and pipe to console');
}
```

**Readable Stream**

```ts
import fs from 'fs';
import thenStreams from 'then-streams';

  async function readFileAndCollect() {
    const data = [];
    const stream = fs.createReadStream('some-file.txt')
      .on('data', d => data.push(d));
    await thenStreams.toPromise(stream);
  }
```

## Run test

You could run the tests from the `test` folder

```bash
yarn install
yarn test
```

## Copyright and license

Licensed under [the MIT license](LICENSE).


import fs from 'fs';
import path from 'path';
import stream from 'stream';
import { toPromise } from '../lib';

function createMockWriteable(shouldThrow = false) {
  const writeableStream = new stream.Writable();
  writeableStream._write = (a, b, callback) => { callback(shouldThrow ? new Error('Write error') : null) };
  return writeableStream;
}

function createMockReadable(chunk: Buffer) {
  const readableStream = new stream.Readable();
  readableStream._read = () => {};
  readableStream.push(chunk);
  readableStream.push(null);
  return readableStream;
}

describe('toPromise', () => {
  describe('when use with writable streams', () => {
    it('should return data without errors', async () => {
      const data = [];
      const streamObj = createMockReadable(Buffer.from('Some content'))
        .on('data', d => data.push(d))
        .pipe(createMockWriteable());

      await expectAsync(toPromise(streamObj)).toBeResolved();
      expect(data.length).toBe(1);
    });
  });

  describe('when use with writable streams and throw', () => {
    it('should throw errors', async () => {
      const streamObj = createMockReadable(Buffer.from('Some content'))
        .pipe(createMockWriteable(true));

      await expectAsync(toPromise(streamObj)).toBeRejectedWith(new Error('Write error'));
    });
  });

  describe('when use with writable streams and fs read', () => {
    it('shoul resolve', async () => {
      const streamObj = fs.createReadStream(path.join(__dirname, 'test.txt'))
        .pipe(createMockWriteable());

      await expectAsync(toPromise(streamObj)).toBeResolved();
    });
  });

  describe('Use with fs read streams only', () => {
    it('should return data without errors', async () => {
      const data = [];
      const streamObj = createMockReadable(Buffer.from('Some content'))
        .on('data', d => data.push(d));

      await expectAsync(toPromise(streamObj)).toBeResolved();
      expect(data.length).toBe(1);
    });
  });
});

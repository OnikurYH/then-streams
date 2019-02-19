import { Stream, Readable, Writable } from 'stream';

export interface ToPromiseOptions {
  errorEvent?: string;
  exitEvent?: string;
}

let PromiseClass: PromiseConstructor = Promise;

export function setPromiseClass(promiseClass: PromiseConstructor) {
  PromiseClass = promiseClass;
}

export function toPromise<T, S extends Stream>(
  stream: S,
  opts: ToPromiseOptions = {},
): Promise<T> {
  return new PromiseClass<T>(function (resolve, reject) {
    let defaultErrorEvent = 'error';
    let defaultExitEvent = 'end';
    switch(true) {
      case stream instanceof Readable:
        defaultExitEvent = 'end';
        break;
      case stream instanceof Writable:
        defaultExitEvent = 'finish';
        break;
    }

    stream
      .on(opts.errorEvent || defaultErrorEvent, function (err: any) {
        reject(err);
      })
      .on(opts.exitEvent || defaultExitEvent, function () {
        resolve();
      });
  });
}

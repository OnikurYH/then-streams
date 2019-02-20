/// <reference types="node" />
import { Stream } from 'stream';
export interface ToPromiseOptions {
    errorEvent?: string;
    exitEvent?: string;
}
export declare function setPromiseClass(promiseClass: PromiseConstructor): void;
export declare function toPromise<T, S extends Stream>(stream: S, opts?: ToPromiseOptions): Promise<T>;

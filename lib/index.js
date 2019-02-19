"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var PromiseClass = Promise;
function setPromiseClass(promiseClass) {
    PromiseClass = promiseClass;
}
exports.setPromiseClass = setPromiseClass;
function toPromise(stream, opts) {
    if (opts === void 0) { opts = {}; }
    return new PromiseClass(function (resolve, reject) {
        var defaultErrorEvent = 'error';
        var defaultExitEvent = 'end';
        switch (true) {
            case stream instanceof stream_1.Readable:
                defaultExitEvent = 'end';
                break;
            case stream instanceof stream_1.Writable:
                defaultExitEvent = 'finish';
                break;
        }
        stream
            .on(opts.errorEvent || defaultErrorEvent, function (err) {
            reject(err);
        })
            .on(opts.exitEvent || defaultExitEvent, function () {
            resolve();
        });
    });
}
exports.toPromise = toPromise;
//# sourceMappingURL=index.js.map
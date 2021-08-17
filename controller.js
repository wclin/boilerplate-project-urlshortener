"use strict";
exports.__esModule = true;
exports.mainShortener = exports.DefaultURLShortener = void 0;
var DefaultURLShortener = /** @class */ (function () {
    function DefaultURLShortener() {
    }
    DefaultURLShortener.prototype.add = function (req, res) {
        res.status(200).send("OK");
        //   res.status(200).send({error: 'invalid url'})
    };
    DefaultURLShortener.prototype.redirect = function (req, res) {
        console.log(req.params.shortURL);
        res.status(200).redirect("https://freeCodeCamp.org");
    };
    return DefaultURLShortener;
}());
exports.DefaultURLShortener = DefaultURLShortener;
exports.mainShortener = DefaultURLShortener;

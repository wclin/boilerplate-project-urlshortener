"use strict";
exports.__esModule = true;
exports.mainShortener = exports.DefaultURLShortener = void 0;
var dns_1 = require("dns");
var DefaultURLShortener = /** @class */ (function () {
    function DefaultURLShortener() {
    }
    DefaultURLShortener.prototype.add = function (req, res) {
        var urlAddHandler = function (key, fullURL) {
            console.log("adding [" + key + "]: " + fullURL);
            return;
        };
        try {
            var originalURL = new URL(req.body.original_url);
            dns_1.lookup(originalURL.hostname, function (err, value) {
                if (err) {
                    console.log(err);
                    res.status(200).send({ error: 'invalid url' });
                }
                else {
                    urlAddHandler(req.body.short_url, req.body.original_url);
                    res.status(200).send("OK");
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(200).send({ error: 'invalid url' });
        }
    };
    DefaultURLShortener.prototype.redirect = function (req, res) {
        console.log(req.params.shortURL);
        res.status(200).redirect("https://freeCodeCamp.org");
    };
    return DefaultURLShortener;
}());
exports.DefaultURLShortener = DefaultURLShortener;
exports.mainShortener = DefaultURLShortener;

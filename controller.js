"use strict";
exports.__esModule = true;
exports.mainShortener = exports.DefaultURLShortener = void 0;
var dns_1 = require("dns");
var nodeCache = require("node-cache");
var cache = new nodeCache({ stdTTL: 60 });
var DefaultURLShortener = /** @class */ (function () {
    function DefaultURLShortener() {
    }
    DefaultURLShortener.prototype.add = function (req, res) {
        var urlAddHandler = function (key, fullURL) {
            console.log("adding [" + key + "]: " + fullURL);
            if (!cache.set(key, fullURL)) {
                console.error("cache set error");
            }
            return;
        };
        try {
            var originalURL = new URL(req.body.url);
            dns_1.lookup(originalURL.hostname, function (err, value) {
                if (err) {
                    console.log(err);
                    res.status(200).send({ error: 'invalid url' });
                }
                else {
                    var shortURL = Date.now().toString();
                    urlAddHandler(shortURL, req.body.url);
                    res.status(200).send({ original_url: req.body.url, short_url: shortURL });
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(200).send({ error: 'invalid url' });
        }
    };
    DefaultURLShortener.prototype.redirect = function (req, res) {
        if (cache.has(req.params.shortURL)) {
            var fullURL = cache.get(req.params.shortURL);
            console.log("redirecting to " + fullURL + " ...");
            res.status(200).redirect(fullURL);
            return;
        }
        res.status(200).send("Not Found");
    };
    return DefaultURLShortener;
}());
exports.DefaultURLShortener = DefaultURLShortener;
exports.mainShortener = DefaultURLShortener;

import { lookup } from "dns";
import {Request, Response} from "express";
import * as nodeCache from "node-cache"

export interface URLShortener {
    add(req: Request, res: Response): void;
    redirect(req: Request, res: Response): void;
}

const cache = new nodeCache({ stdTTL: 60 });
const validProtocals: string[] = ["http:", "https:"]

class DefaultURLShortener implements URLShortener {
    add(req: Request, res: Response) {
        const urlAddHandler = (key: string, fullURL: string) => {
            console.log("adding [" + key + "]: " + fullURL)
            if (!cache.set(key, fullURL)) {
                console.error("cache set error")
            }
            return;
        }
        try {
            let originalURL = new URL(req.body.url)
            if (!validProtocals.includes(originalURL.protocol)) {
                throw Error("invalid protocal: " + originalURL.protocol)
            }
            lookup(originalURL.hostname, (err, value) => {
                if(err) {
                    throw Error(err.message)
                } else {
                    let shortURL = Date.now().toString()
                    urlAddHandler(shortURL, req.body.url)
                    res.status(200).send({original_url: req.body.url, short_url: shortURL})
                }
            })
        } catch(err) {
            console.log(err)
            res.status(200).send({error: 'invalid url'})
        }
    }
    redirect(req: Request, res: Response) {
        if (cache.has(req.params.shortURL)) {
            let fullURL:string = cache.get(req.params.shortURL)
            console.log("redirecting to " + fullURL + " ...")
            res.status(200).redirect(fullURL)
            return;
        }
        res.status(200).send("Not Found")
    }
}
export { DefaultURLShortener };
export { DefaultURLShortener as mainShortener };
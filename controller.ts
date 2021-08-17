import { lookup } from "dns";
import {Request, Response} from "express";
import * as nodeCache from "node-cache"

export interface URLShortener {
    add(req: Request, res: Response): void;
    redirect(req: Request, res: Response): void;
}

const cache = new nodeCache({ stdTTL: 60 });

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
            let originalURL = new URL(req.body.original_url)
            lookup(originalURL.hostname, (err, value) => {
                if(err) {
                    console.log(err)
                    res.status(200).send({error: 'invalid url'})
                } else {
                    urlAddHandler(req.body.short_url, req.body.original_url)
                    res.status(200).send("OK")
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
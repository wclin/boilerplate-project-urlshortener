import { lookup } from "dns";
import {Request, Response} from "express";

export interface URLShortener {
    add(req: Request, res: Response): void;
    redirect(req: Request, res: Response): void;
}

class DefaultURLShortener implements URLShortener {
    add(req: Request, res: Response) {
        const urlAddHandler = (key: string, fullURL: string) => {
            console.log("adding [" + key + "]: " + fullURL)
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
      console.log(req.params.shortURL)
      res.status(200).redirect("https://freeCodeCamp.org")
    }
}
export { DefaultURLShortener };
export { DefaultURLShortener as mainShortener };
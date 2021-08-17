import {Request, Response} from "express";

export interface URLShortener {
    add(req: Request, res: Response): void;
    redirect(req: Request, res: Response): void;
}

class DefaultURLShortener implements URLShortener {
    add(req: Request, res: Response) {
      res.status(200).send("OK")
    //   res.status(200).send({error: 'invalid url'})
    }
    redirect(req: Request, res: Response) {
      console.log(req.params.shortURL)
      res.status(200).redirect("https://freeCodeCamp.org")
    }
}
export { DefaultURLShortener };
export { DefaultURLShortener as mainShortener };
import { config } from '../config/Constants';
import { Request, Response } from 'express';
import shortId from 'shortid';
import { URLModel } from '../models/URL';

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        // ver se a url já não existe
        const { originURL } = req.body;
        const url = await URLModel.findOne({ originURL });
        if(url) {
            res.json(url);
            return;
        }

        // criar a hash para a url
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        
        // salvar a url no banco
        const newUrl = await URLModel.create({hash, shortURL, originURL});
        
        // retornar a url para o cliente
        res.json(newUrl);

    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // pegar hash da url
        const { hash } = req.params;
        
        // encontrar a url original pelo hash
        const url = await URLModel.findOne({ hash });
        if (url) {
			res.redirect(url.originURL)
			return
		}

        // redirecionar para a url original a partir do que encotnramos no db
        res.status(400).json({ error: 'URL not found' });
    }
}
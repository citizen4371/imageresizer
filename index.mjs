import express from 'express';
import sharp from 'sharp';
import { chooseClientForURL } from './utils.mjs'

const port = process.argv[2] || 8000;
const app = express();

app.get('/img/resize', (req, res) => {
    const url = req.query.u;

    if (!url) {
        res.status(400).send({error: 'No url is provided'});
        return;
    }

    try {
        const decodedURL = decodeURIComponent(url);
        const client = chooseClientForURL(decodedURL);
    
        if (!client) {
            res.status(400).send({error: `${protocol} is not supported`});
            return;
        }

        const width = req.query.w && Number(req.query.w);
        const height = req.query.h && Number(req.query.h);
        const resizeStream = sharp().resize(width, height);

        client.get(decodedURL, img => {
            if (img.statusCode >= 200 && img.statusCode < 300) {
                img.pipe(resizeStream).pipe(res);
            } else if (img.statusCode == 404) {
                res.sendStatus(404);
            } else {
                res.status(400).send({error: 'Could not resize image'});
            }
        });
    } catch(e) {
        console.warn(e);
        const errorMessage = e instanceof TypeError 
            ? 'Invalid url is provided' 
            : e.toString();

        res.status(400).send({error: errorMessage});
        return;
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`));

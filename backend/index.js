import path from "path";
import fs from "fs";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import Home from "../frontend/pages/Home";

const app = express();
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'react-ssr.html');

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
    const appComponent = ReactDOMServer.renderToString(<Home />);

    fs.readFile(HTML_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${appComponent}</div>`)
        );
    });
});

app.listen(port, function () {
    console.log(`App listening on port: ${port}`);
});
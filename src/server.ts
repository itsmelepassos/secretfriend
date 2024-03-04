import "dotenv/config";
import express from "express";
import cors from "cors";
import https from 'https';
import fs from 'fs';
import http from 'http';
import siteRoutes from './routes/site';
import admRoutes from './routes/admin';
import { requestInterceptor } from "./utils/requestInterceptor";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestInterceptor);

app.use('/api/admin', admRoutes);
app.use('/api', siteRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}, mais redondo do que a Dona Redonda de Saramandaia! =D`);
    });
};

const regularServer = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string),
    }
    const secServer = https.createServer(options, app);
    runServer(80, regularServer);
    runServer(443, secServer)
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}


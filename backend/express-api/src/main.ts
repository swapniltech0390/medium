/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';  
import fs from "fs";
import {ApiResponse, Product} from "@medium/libs";

const app = express();

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-api!' });
});

app.get('/api/products', (req, res) => {  
  const filePath = path.join(__dirname, 'assets/data.json');
  console.log(filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading data');
    }
    try {
      const jsonData = JSON.parse(data);
      res.json({ data: jsonData, timestamp: new Date() } as ApiResponse<Product[]>);
    } catch (parseError) {
       console.error('Error parsing JSON:', parseError);
       res.status(500).send('Error parsing JSON data');
    }
  });

});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

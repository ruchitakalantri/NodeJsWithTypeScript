//const express = require('express');
//can write like this too

import express from 'express';

import todosRoutes from './routes/todo';

const app = express();

app.use(todosRoutes);

app.listen(3000);
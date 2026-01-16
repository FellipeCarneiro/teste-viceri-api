require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const authRoutes = require('./src/routes/auth.routes');

const protectedRoutes = require('./src/routes/protected.routes');

const taskRoutes = require('./src/routes/task.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');

const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(authRoutes);
app.use(protectedRoutes);
app.use(taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;

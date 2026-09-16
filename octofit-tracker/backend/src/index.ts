import express from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';
import { connectToDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const resourceResponse = (resource: string, data: unknown) => ({
  resource,
  apiUrl: `${apiBaseUrl}/api/${resource}/`,
  data,
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find().lean();
  response.json(resourceResponse('users', users));
});

app.post('/api/users/', async (request, response) => {
  const user = await User.create(request.body ?? {});
  response.status(201).json(resourceResponse('users', user));
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find().lean();
  response.json(resourceResponse('teams', teams));
});

app.post('/api/teams/', async (request, response) => {
  const team = await Team.create(request.body ?? {});
  response.status(201).json(resourceResponse('teams', team));
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find().lean();
  response.json(resourceResponse('activities', activities));
});

app.post('/api/activities/', async (request, response) => {
  const activity = await Activity.create(request.body ?? {});
  response.status(201).json(resourceResponse('activities', activity));
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  response.json(resourceResponse('leaderboard', leaderboard));
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find().lean();
  response.json(resourceResponse('workouts', workouts));
});

app.post('/api/workouts/', async (request, response) => {
  const workout = await Workout.create(request.body ?? {});
  response.status(201).json(resourceResponse('workouts', workout));
});

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start API server:', error);
  process.exit(1);
});
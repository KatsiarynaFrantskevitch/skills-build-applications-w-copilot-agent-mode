import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    team: { type: String, default: 'Unassigned' },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    goals: [{ type: String }],
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    sport: { type: String, default: 'General Fitness' },
    members: { type: Number, default: 0 },
    activityScore: { type: Number, default: 0 },
    captain: { type: String, default: '' },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    user: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    badge: { type: String, default: 'Rising' },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, default: 'Full body' },
    coachNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);

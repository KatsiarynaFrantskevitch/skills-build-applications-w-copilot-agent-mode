import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Thompson',
                email: 'ava.thompson@example.com',
                team: 'Trailblazers',
                fitnessLevel: 'Advanced',
                goals: ['Improve endurance', 'Train for 10K'],
            },
            {
                name: 'Leo Martinez',
                email: 'leo.martinez@example.com',
                team: 'Summit Squad',
                fitnessLevel: 'Intermediate',
                goals: ['Build strength', 'Increase mobility'],
            },
            {
                name: 'Nora Chen',
                email: 'nora.chen@example.com',
                team: 'Trailblazers',
                fitnessLevel: 'Intermediate',
                goals: ['Stay consistent', 'Boost cardio'],
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Trailblazers',
                sport: 'Trail Running',
                members: 12,
                activityScore: 920,
                captain: 'Ava Thompson',
            },
            {
                name: 'Summit Squad',
                sport: 'Strength & Conditioning',
                members: 8,
                activityScore: 870,
                captain: 'Leo Martinez',
            },
        ]);
        await Activity.insertMany([
            {
                user: 'Ava Thompson',
                type: 'Run',
                durationMinutes: 35,
                calories: 420,
                date: new Date('2026-09-10T06:30:00Z'),
            },
            {
                user: 'Leo Martinez',
                type: 'Strength',
                durationMinutes: 50,
                calories: 310,
                date: new Date('2026-09-11T18:00:00Z'),
            },
            {
                user: 'Nora Chen',
                type: 'Cycling',
                durationMinutes: 45,
                calories: 390,
                date: new Date('2026-09-12T07:15:00Z'),
            },
        ]);
        await Leaderboard.insertMany([
            { rank: 1, name: 'Ava Thompson', points: 1840, streak: 12, badge: 'Gold' },
            { rank: 2, name: 'Leo Martinez', points: 1735, streak: 9, badge: 'Silver' },
            { rank: 3, name: 'Nora Chen', points: 1682, streak: 7, badge: 'Bronze' },
        ]);
        await Workout.insertMany([
            {
                name: 'Speed Intervals',
                difficulty: 'Intermediate',
                durationMinutes: 35,
                focus: 'Cardio',
                coachNotes: 'Maintain rhythm and short recovery windows.',
            },
            {
                name: 'Mobility Reset',
                difficulty: 'Beginner',
                durationMinutes: 20,
                focus: 'Recovery',
                coachNotes: 'Focus on deep breathing and controlled movements.',
            },
            {
                name: 'Upper Body Burn',
                difficulty: 'Advanced',
                durationMinutes: 40,
                focus: 'Strength',
                coachNotes: 'Keep tension in the core throughout each set.',
            },
        ]);
        console.log(`Seeded ${users.length} users, ${teams.length} teams, and workout data successfully`);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

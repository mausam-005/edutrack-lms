import app from './app';
import { config } from './config/env';
import { database } from './config/db';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await database.connect();

    // Start Express server
    app.listen(config.port, () => {
      console.log(`\n🚀 EduTrack API server running on port ${config.port}`);
      console.log(`📡 Environment: ${config.nodeEnv}`);
      console.log(`🌐 Frontend URL: ${config.frontendUrl}`);
      console.log(`📊 Health check: http://localhost:${config.port}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

startServer();

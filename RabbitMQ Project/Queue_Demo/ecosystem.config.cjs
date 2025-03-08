module.exports = {
  apps: [
    {
      name: 'app',
      script: 'src/index.js', // May need to be changed to different location for repos with partial webpack build.
      exec_mode: 'cluster',
      instances: 4,
      min_uptime: 1000,
      restart_delay: 10,
      max_restarts: 10,
      shutdown_with_message: true,
    },
  ],
};

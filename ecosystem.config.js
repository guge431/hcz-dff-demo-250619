
module.exports = {
  apps: [{
    name: 'hcz-dff-demo',
    script: 'main.ts',
    interpreter: 'ts-node',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      TS_NODE_TRANSPILE_ONLY: 'true',
    },
    env_production: {
      NODE_ENV: 'production',
      TS_NODE_TRANSPILE_ONLY: 'true'
    },
    // 错误日志
    error_file: './logs/err.log',
    // 输出日志
    out_file: './logs/out.log',
    // 日志时间格式
    time: true,
  }]
};
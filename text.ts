console.log('测试开始');
import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3002, () => {
  console.log('测试服务器启动成功在端口 3000');
});
// <reference path="./typings/koa-swig.d.ts" />
import { addAliases } from 'module-alias';
addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interface`,
  '@config': `${__dirname}/config`,
  '@middlewares': `${__dirname}/middlewares`,
  '@utils': `${__dirname}/utils`
});

import Koa from 'koa'
import {createContainer,Lifetime} from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa';
import config from './config/index'
import co from 'co';
import render from 'koa-swig';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
const { port, viewDir, memoryFlag, staticDir } = config;
console.log(1111111,port, viewDir, memoryFlag, staticDir)
const container = createContainer();


container.loadModules(['services/*.ts'],{
    cwd: __dirname,
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    }
})
console.log('容器中注册的服务:', Object.keys(container.registrations))
const app=new Koa()
// app.use(async (ctx) => {
//   ctx.body = 'Hello Koa!';
// });
app.use(serve(staticDir));
app.use(scopePerRequest(container));
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <'memory' | false>memoryFlag,
    writeBody: false,
    ext: 'html',
  })
);

app.use(historyApiFallback({ index: '/', whiteList: ['/people','/api']}))
app.use(loadControllers(`${__dirname}/routers/*.ts`));


app.listen(port,()=>{
  console.log('❀❀❀❀❀❀❀❀❀启动成功')
})
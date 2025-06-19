import Koa from 'koa'
import {createContainer,Lifetime} from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa';
import { _dirname } from './utils/esmPath';
const container = createContainer();

container.loadModules(['services/*.ts'],{
    cwd: _dirname,
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    }
})
const app=new Koa()
// app.use(async (ctx) => {
//   ctx.body = 'Hello Koa!';
// });

app.use(scopePerRequest(container));

app.use(loadControllers(`${_dirname}/routers/*.ts`));

const prot=3001

app.listen(prot,()=>{
  console.log('❀❀❀❀❀❀❀❀❀启动成功')
})
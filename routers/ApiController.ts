import { GET ,route } from 'awilix-koa';
import Router from 'koa-router';
import { IApi } from '@interfaces/IApi';

@route('/api')
class ApiController{
    private apiService: IApi;
    constructor ({apiService}:{apiService:IApi}){
       this.apiService = apiService;
    }
    @route('/list')
    @GET()
    async getApilList(
        ctx: Router.IRouterContext,
        next: () => Promise<any>
    ):Promise<any>{
        const data = await this.apiService.getInfo();
        ctx.body = {
           data,
        };
    }
}

export default ApiController;
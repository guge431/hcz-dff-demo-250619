import { GET, POST, route } from 'awilix-koa';
import Router from 'koa-router';
import { IHome } from "../interface/IHome";



@route('/home')
class HomeController{
   private homeService:IHome;
   constructor({ homeService }: { homeService: IHome }) {
    this.homeService = homeService;
  }
  @route('/list')
  @GET()
  async getData(
     ctx: Router.IRouterContext,
     next: () => Promise<any>
  ){
    const data=await this.homeService.getHomeData();
    ctx.body = {
        data,
    };
  }
//   @route('/submit')
//   @POST
//   async submitData(
//      ctx: Router.IRouterContext,
//      next: () => Promise<any>
//   ){
//     const data=await this.homeService.getHomeData();
//     ctx.body = {
//         data,
//     };
//   }
}

export default HomeController
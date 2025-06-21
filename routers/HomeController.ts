import { GET, POST, route } from 'awilix-koa';
// import Router from 'koa-router';
// import  IHome  from "../interface/IHome";
import { Context } from '@interfaces/IKoa';



@route('/')
class HomeController{
  //  private homeService:IHome;
  //  constructor({ homeService }: { homeService: IHome }) {
  //   this.homeService = homeService;
  // }
  @GET()
  async getData(
     ctx: Context
  ):Promise<void>{
     const data = await ctx.render('index', {
      data: '真是烦躁',
    });
    ctx.body = data
    

  }
}

export default HomeController
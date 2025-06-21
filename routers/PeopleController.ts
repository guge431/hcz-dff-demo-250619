import { GET, POST, route } from 'awilix-koa';
import IPeople from '@interfaces/IPeople'
import { Context } from '@interfaces/IKoa'

@route('/people')
class PeopleController {
    private peopleService: IPeople;
    constructor({ peopleService }: { peopleService: IPeople }) {
        this.peopleService = peopleService;
    }
    @GET()
    async getPeopleList(
        ctx: Context
    ): Promise<void> {
        try {
            const data = await this.peopleService.getPeople()
            ctx.body = {
                success: true,
                data,
            };

        } catch(error){
             console.error('获取人员列表失败:', error) // 详细错误
             console.error('错误堆栈:', error.stack) // 错误堆栈
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: '获取人员列表失败',
                error: '获取人员列表失败',
            };
        }
    }
    @route('/add')
    @POST()
    async addPeople(
        ctx: Context
    ): Promise<void> {
        try {
            const personDta = ctx.body;
            const data = await this.peopleService.setPeople(personDta)
            ctx.body = {
                success: true,
                data,
            };

        } catch {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: '新增人员失败',
                error: '新增人员失败',
            };

        }
    }
}

export default PeopleController
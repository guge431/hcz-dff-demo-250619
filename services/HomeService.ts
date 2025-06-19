import IHome from '../interface/IHome'
import { IHomeData } from '@interfaces/IHomeData'

class HomeService implements IHome {

    getHomeData(){
        return new Promise<IHomeData>((resolve)=>{
           resolve({
            name:'王洋',
            age:11,
            data:['烧烤','炸鸡']
           })
        })
    }
//    submitHomeData(name:string){
//      let data={}
//      if(name=='王洋'){
//         data={
//             a:1,
//             b:2
//         }
//      }else{
//          data={
//             j:3,
//             s:4
//         }
//      }
//      return new Promise<any>((resolve)=>{
//            resolve(data)
//         })
//    }

}

export default HomeService
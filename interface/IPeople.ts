import {IPeopleData,IHobby} from '@interfaces/IPeopleData'

interface IPeople {
      
    //   createPeople(data: any): Promise<any>;
    //   getPeople(id: number):Promise<IPeopleData>;
    //   getPeopleHobby(id: number):Promise<hobbies>;
    //   createPeopleHobby(data: hobbies):Promise<any>;
      getPeople():Promise<IPeopleData[]>;
      setPeople(data:any):Promise<any>;
}

export default IPeople;
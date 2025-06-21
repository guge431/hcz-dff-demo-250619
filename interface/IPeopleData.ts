export interface IPeopleData{
    id?: number;
    name:string,
    age:number,
    hobbies?: IHobby[]; 
}

export interface IHobby{
    name:string,
    personId:number,
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
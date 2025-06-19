
import { IHomeData } from "./IHomeData";

export interface IHome {
    getHomeData():Promise<IHomeData>;
}
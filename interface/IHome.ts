
import { IHomeData } from "./IHomeData";

interface IHome {
    getHomeData():Promise<IHomeData>;
}

export default IHome;
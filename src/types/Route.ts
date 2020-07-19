import { ComponentClass} from "react";

export default interface IRoute {
    route: string,
    component: ComponentClass,
    isProtected: boolean,
    isAdmin: boolean
}
import SignIn from "../component/Signin";
import SignUp from "../component/Signup";
import IRoute from "../types/Route";
import ChatRoom from "../component/ChatRoom";
import NotFound from "../component/NotFound";

const routes: Array<IRoute> = [
    {
        route:'/signin',
        component:SignIn,
        isProtected:false,
        isAdmin:false
    },
    {
        route:'/signup',
        component:SignUp,
        isAdmin:false,
        isProtected:false
    },
    {
        route:'/chat',
        component:ChatRoom,
        isAdmin:false,
        isProtected:true
    },
    {
        route:'*',
        component:NotFound,
        isAdmin:false,
        isProtected:false
    }
]

export default routes;
import { IState, IUser } from "@/typing/store";
import { SET_User,X_UserAgent,LOG_OUT } from "./actionsType";

export default {
    [SET_User](state:IState,user:IUser):void {
        state.user = user
        console.log('state',state);
    },
    [X_UserAgent](state:IState,val:string):void {
        state.userAgent = val;
        console.log('X_UserAgent',state);
    },
    [LOG_OUT](state: IState) {
        state.user = {
            userName: '',
            // accessToken:'',
            // menuTree: [],
            // provinceCode: ''
        }
        // state.pageButton = []
    },
}
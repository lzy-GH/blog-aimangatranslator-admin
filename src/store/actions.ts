import { SET_User,X_UserAgent,LOG_OUT } from "./actionsType";
import { IState } from "@/typing/store";
import { ActionContext } from "vuex";
import router from "@/router";
// import { logout } from "@/api/api";
// import { loginManager } from "@/utils/login"
// import {  ILoginResData } from '@/apiTyep/user'

export default {
    [SET_User]({commit,state}:ActionContext<IState,IState>,user:{operatorName:string}) {
        commit(SET_User, {
            userName:user.operatorName,
            // accessToken:user.accessToken,
            // menuTree: user.menuTree,
            // provinceCode: user.provinceCode
        })
    },
    [X_UserAgent]({ commit, state }: ActionContext<IState, IState>, val: string) {
        // sessionStorage.setItem('XUserAgent',val);
        commit(X_UserAgent, val);
    },
    async [LOG_OUT]({ commit, state }: ActionContext<IState, IState>) {
        // loginManager.logout()
        // await logout().then(res => {
        //     console.log('退出登录',res);
        // })
        commit(LOG_OUT);
        router.replace({
            name: 'login',
        });
    },
}


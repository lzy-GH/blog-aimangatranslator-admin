import { IState } from "@/typing/store";


export default <IState> {
    user: {
        userName: sessionStorage.getItem('userName'),
        // accessToken: sessionStorage.getItem('accessToken') || '',
        // menuTree: [],
        // provinceCode: sessionStorage.getItem('provinceCode') || '',
    }
}

interface ILoginResData {
    accessToken: string;
    jti: string;
    refreshToken: string;
    operatorName: string;
    operatorId: string;
    // menuTree: IMenuAuth[],
    provinceCode: string
}
export const loginManager = {
    login(loginConfig:ILoginResData) {
        // sessionStorage.setItem('accessToken', loginConfig.accessToken);
        sessionStorage.setItem('userName', loginConfig.operatorName);
        // sessionStorage.setItem('operatorId', loginConfig.operatorId); //用户id
        // sessionStorage.setItem('provinceCode', loginConfig.provinceCode); //用户provinceCode
        // sessionStorage.setItem('menuTree', JSON.stringify(loginConfig.menuTree) ); //权限配置
    },
    logout() {
        // sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userName');
        // sessionStorage.removeItem('operatorId'); //用户id
        // sessionStorage.removeItem('menuTree') ; //权限配置
        // sessionStorage.removeItem('provinceCode') ; //权限配置                                
    },
    // 登录失败处理
    loginFailFn() {

        
    }
}

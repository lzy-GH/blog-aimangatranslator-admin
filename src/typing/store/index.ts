/* 
    定义store state数据类型
        整合在 IState 里面
*/

export interface IUser {
    userName: string;
    // accessToken: string;
    // provinceCode?: string; // 分省权限字段
    // menuTree: IMenuAuth[]; // 权限树暂时没有用到，因为router的创建比vuex还早，不能在这里处理权限的
}

export interface IMenuAuth {
    checked: boolean;//是否显示该菜单
    childrenList: IMenuAuth[]; // 孩子菜单的配置
    code: string;
    icon: string;
    id: string;
    path: string; //vue路由
    name: string; //菜单名称
    sort: number; //排序
    parentId: string; //父级id
    title: string;
}
export interface IState {
    user: IUser;
    userAgent:string;
}

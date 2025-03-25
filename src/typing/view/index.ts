export enum AuditState {
    待审核,
    审核通过,
    审核失败,
    撤销,
    预览测试,
    全部 = 9,
}
export enum State {
    '停用',
    '启用',
    '全部',
}
//筛选时端侧枚举
export enum ShowClient {
    全部='0',
    android='1'
    ,iphone = '2'
    ,pc = '3'
    ,web = '4'
    ,androidsdk = '5'
    ,iphonesdk = '6'
    ,miniprogram = '7'
    , tv = '8',
    wp = '9',
    ipad = '10',
    营销广告 = '11',
    wap = '12',
    会员中心 = '13',
    公众号 = '14',
    关怀版 = '15',
    SDK = '16',
    短信小程序 = '17',
    外链 = '18'
}

export interface ISearchItems {
    label:string;
    key:string;
    value:any;
    type: string;
    [propName: string]: unknown;
}
export interface IListOperation {
label:string;
key:string;
}
export interface ISelectOptions {
label:string;
value:string | number;
}

export enum Operation {
    CREATE='create',
    UPDATE='update',
    VIEW='view',
}

// 分页请求bean
export type requestPageBean = {
    pageNum: number
    pageSize: number
    totalCount: number
    totalPageNum: number
}
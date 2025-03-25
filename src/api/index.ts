import axios from '../utils/axios';

// 定义接口
export interface User {
  id: number;
  name: string;
  email: string;
}
export interface imgList {
  blogUrl: string;
  fileName: string;
  [propName:string]:any
}
export interface BlogInfo {
  blogUrl: string;
  fileName: string;
  [propName:string]:any
}
export interface ResData {
  code: number;
  data: BlogInfo[];
  message: string;
  [propName:string]:any
}


// 获取用户列表
export const getUsers = (): Promise<User[]> => {
  return axios.get('/users');
};

// 获取单个用户信息
export const getUserById = (id: number): Promise<User> => {
  return axios.get(`/users/${id}`);
};

// 创建用户
export const createUser = (data: Partial<User>): Promise<User> => {
  return axios.post('/users', data);
};

// 更新用户信息
export const updateUser = (id: number, data: Partial<User>): Promise<User> => {
  return axios.put(`/users/${id}`, data);
};

// 删除用户
export const deleteUser = (id: number): Promise<void> => {
  return axios.delete(`/users/${id}`);
};


//上传JSON  (测试环境)
export const uploadJson = (): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/uploadMangaBlog2TestEnv`);
};
//删除JSON  (测试环境)
export const delJson = (name:string): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/deleteTestEnvBlogFile?blogFileName=${name}`);
};

//查询JSON文档接口  (测试环境)
export const getJSONlist = (): Promise<ResData> => {
  return axios.get(`/api/mangaBlog/selectTestEnvBlogFiles`);
};
// 下载JSON接口 （测试线）
export const downLoadJson = (name:string): Promise<any> => {
  return axios.get(`/api/mangaBlog/downloadTestEnvMangaBlogJson?blogFileName=${name}`);
};
//发布文章到线上文件
export const publishMangaBlogFile2Prod = (name:string): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/publishMangaBlogFile2Prod?blogFileName=${name}`);
};


//查询JSON文档接口  (正式线)
export const getJSONProdlist = (): Promise<ResData> => {
  return axios.get(`/api/mangaBlog/selectProdEnvBlogFiles`);
};
//上传JSON  (正式线)
export const uploadProdJson = (): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/uploadMangaBlog2ProdEnv`);
};

//删除JSON  (正式线)
export const delProdJson = (name:string): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/deleteProdEnvBlogFile?blogFileName=${name}`,);
};
//重启线上服务  (正式线)
export const autoPublish = (): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/autoPublish`,);
};
// 下载JSON接口 （正式线）
export const downLoadProdJson = (name:string): Promise<any> => {
  return axios.get(`/api/mangaBlog/downloadProdEnvMangaBlogJson?blogFileName=${name}`);
};


// 查询图片资源
export const selectProdEnvBlogResourceList = (name:string): Promise<ResData> => {
  return axios.get(`/api/mangaBlog/selectProdEnvBlogResourceList?blogFileName=${name}`);
};
// 上传图片资源
export const uploadMangaBlogImage2ProdEnv = (): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/uploadMangaBlogImage2ProdEnv`);
};

// 删错图片资源
export const deleteResourceFile = (blogFileName:string,resourceFileName:string): Promise<ResData> => {
  return axios.post(`/api/mangaBlog/deleteResourceFile?blogFileName=${blogFileName}&resourceFileName=${resourceFileName}`);
};
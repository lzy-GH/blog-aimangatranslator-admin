<!-- 广告素材管理 -->
<template>
  <div>
    <serve-list
      ref="serveListMd"
      :searchItems="searchItems"
      :listHeader="listHeader"
      :listOperation="listOperation"
      @getList="getList"
      @funBtn="funBtn"
      @delItem="delItemBtn"
      :isExpandedRowRender="false"
    >
      <template v-slot:button>
        <a-upload
          :showUploadList="false"
          name="blogFile"
          :action="`/api/mangaBlog/uploadMangaBlog2TestEnv`"
          :headers="headers"
          @change="handleChange"
        >
          <a-button :loading="upLoading" @click="addBlo" type="primary"
            >上传 / 替换 (预览)</a-button
          >
        </a-upload>
      </template>
      <template #link="{ record }">
        <a :href="record.link" target="_blank" rel="noopener noreferrer">{{
          record.link
        }}</a>
      </template>
    </serve-list>
    <model
      v-model:isVisible="isVisible"
      title="漫画编辑"
      :isLoading="isLoading"
      :isDisabled="isDisabled"
    >
      <template v-slot:content>
        <div class="blog-img">
          <div>文章图片资源:</div>
          <a-upload
            :showUploadList="false"
            :multiple="true"
            name="blogImage"
            :action="`/api/mangaBlog/uploadMangaBlogImage2ProdEnv`"
            :headers="headers"
            :data="{ blogFileName: blogFileName }"
            @change="handleChangeImg"
          >
            <a-button :loading="upImgLoading" @click="addBlo" type="primary"
              >添加</a-button
            >
          </a-upload>

          <div v-if="getimgLoading">加载...</div>
          <ul v-else class="imglist">
            <li v-for="(item, index) in imglistinfo" :key="index" class="item">
              <div>名称： {{ item.fileName }}</div>
              <div>{{ item.blogUrl }}</div>
              <div class="img-box">
                <a :href="item.blogUrl" target="_blank">
                  <img :src="item.blogUrl" alt="" />
                </a>
              </div>
              <div class="btn">
                <a-popconfirm
                  title="确定删除？"
                  ok-text="Yes"
                  @confirm="delImg(item.fileName)"
                >
                  <a-button type="primary" :loading="delImgloading" danger
                    >删除</a-button
                  >
                </a-popconfirm>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </model>
  </div>
</template>

<script lang='ts' setup>
import { defineComponent, reactive, ref, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue"; // 图标库
import serveList from "@/components/serveList.vue";
import model from "@/components/model.vue";
import { delItem } from "@/hooks/advertising";
import { message, Modal, Popconfirm } from "ant-design-vue"; //提示组件
import {
  IListOperation,
  ISearchItems,
  ShowClient,
  State,
  AuditState,
} from "@/typing/view";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import {
  uploadJson,
  getJSONlist,
  delJson,
  selectProdEnvBlogResourceList,
  deleteResourceFile,
  imgList,
  downLoadJson,
  publishMangaBlogFile2Prod,
} from "@/api/index";
import { Item } from "ant-design-vue/lib/menu";

const serveListMd = ref<InstanceType<typeof serveList> | null>(null);

let searchItems = ref<ISearchItems[]>([
  {
    label: "快速搜索",
    key: "name",
    value: "",
    type: "input",
    placeholder: "请输入",
  },
]);

let listHeader: ColumnProps[] = [
  {
    title: "博客名称",
    dataIndex: "name",
    key: "name",
    // slots: { customRender: 'name' },
  },
  {
    title: "网站链接",
    dataIndex: "link",
    key: "link",
    slots: { customRender: "link" },
  },
  {
    title: "发布时间",
    dataIndex: "lastModifiedTime",
    key: "lastModifiedTime",
  },
  {
    title: "发布状态",
    dataIndex: "status",
    key: "status",
    customRender: ({ text, record, index }) => {
      switch (text) {
        case 0:
          return "未发布";
        default:
          return "已发布";
      }
    },
  },
];

let listOperation: IListOperation[] = [
  {
    label: "图片编辑",
    key: "edit",
  },
  {
    label: "JSON下载",
    key: "dow",
  },
  {
    label: "发布",
    key: "prod",
  },
  {
    label: "删除",
    key: "del",
  },
];

// //初始请求数据
// function original(){
//   return {
//     name:'',
//     id:undefined,
//     adPosId:undefined,
//     state:State.关闭,
//     auditState:AuditState.待审核,
//     showClient:'0',
//     offlineTimeEnd:'',
//     offlineTimestart:'',
//     onlineTimeEnd:'',
//     onlineTimestart:'',
//     showVersion: '',
//     channel: '',
//     // pageBean:pageBean
//     // pageBean:
//   }
// }
// let formState = reactive<IVertisingQueryData>(original())

let getList = (val: {}, resolve: (data: {}) => void): void => {
  // getMangaNb()
  // return

  // let a = Object.assign(ddd,val)
  // console.log('getList',val);
  // resolve(datasd)
  getJSONlist().then((res) => {
    // dataSource.value = res.records
    // pageBean.totalCount = res.total;
    console.log(res.data);
    let msg: any = [];
    if (res.code == 200) {
      msg = res.data?.map((item) => {
        return {
          name: item.fileName,
          link: item.blogUrl,
          lastModifiedTime: item.lastModifiedTime,
          status: item.status,
        };
      });
    }
    resolve(msg);
  });
};

let isVisible = ref<boolean>(false);
let isLoading = ref<boolean>(false);
let isDisabled = ref<boolean>(false);
let isda = ref<boolean>(false);
let imglistinfo = reactive<imgList[]>([]);
let blogFileName = ref<string>("");
let blogFileName2 = ref<string>("");
function funBtn(key: string, item?: any): void {
  console.log(item);
  blogFileName.value = item.name.split(".")[0];
  blogFileName2.value = item.name;
  if (key == "edit") {
    isVisible.value = true;
    getSelectProdEnvBlogResourceList();
  }
  if (key == "showca") {
    isda.value = true;
  }
  if (key == "del") {
    Modal.confirm({
      title: () => "是否确定执行操作?",
      icon: () => createVNode(ExclamationCircleOutlined),

      onOk() {
        delJson(item.name).then((res) => {
          console.log("delJson", res);
          if (res.code == 200) {
            serveListMd.value!.queryList();
            message.success("操作成功!");
          } else {
            message.info("操作失败!");
          }
        });
      },
      onCancel() {
        //  message.info('操作失败!')
      },
    });
  }
  if (key == "dow") {
    downLoadJson(item.name).then((res) => {
      console.log("downLoadJson", res);
      downloadJsonFile(res, item.name);
    });
  }
  if (key == "prod") {
    Modal.confirm({
      title: () => "是否确定执行操作?",
      icon: () => createVNode(ExclamationCircleOutlined),

      onOk() {
        publishMangaBlogFile2Prod(item.name).then((res) => {
          console.log("publishMangaBlogFile2Prod", res);
          serveListMd.value!.queryList();
          if (res.code == 200) {
            message.success("操作成功!");
          } else {
            message.info("操作失败!");
          }
        });
      },
      onCancel() {
        //  message.info('操作失败!')
      },
    });
  }
}

let getimgLoading = ref<boolean>(false);
function getSelectProdEnvBlogResourceList() {
  getimgLoading.value = true;
  selectProdEnvBlogResourceList(blogFileName.value).then((res) => {
    console.log("selectProdEnvBlogResourceList", res);
    imglistinfo.length = 0;
    getimgLoading.value = false;
    if (res.code == 200) {
      if (res.data.length > 0) {
        // 清空原有数据
        // 使用 push 将新数据添加到响应式数组中
        res.data.forEach((item) => {
          imglistinfo.push({
            blogUrl: item.blogUrl,
            fileName: item.fileName,
          });
        });
      }
      console.log("imglistinfo", imglistinfo);
    }
  });
}
// 下载json文件
function downloadJsonFile(data: any, fileName: string) {
  // 将数据转换为 JSON 字符串
  const jsonString = JSON.stringify(data, null, 2);

  // 创建一个 Blob 对象
  const blob = new Blob([jsonString], { type: "application/json" });

  // 创建一个 URL 对象
  const url = URL.createObjectURL(blob);

  // 创建一个链接元素并触发下载
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName || "data.json"; // 设置默认文件名
  document.body.appendChild(a);
  a.click();

  // 清理 URL 对象和链接元素
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// 编辑弹窗
let createFormState = reactive({
  candidateGroup: "",
  candidateUser: "",
  createBy: 0,
  createTime: "",
  id: 0,
  modelFileName: "",
  modelId: "",
  modelKey: "",
  modelName: "",
  modelRelNum: 0,
  updateBy: 0,
  updateTime: "",
});
const createRules = {
  modelName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  modelKey: [{ required: true, message: "请输入标识Key", trigger: "blur" }],
};

//删除选项
type Key = ColumnProps["key"];
function delItemBtn(key: Key[]) {
  console.log(key);
  delItem<Key[], () => void>(key, () => {
    // deleteAdPlace<Key[]>(selItem.selectedRowKeys).then((res) =>{
    //   console.log(res);
    //   selItem.selectedRowKeys = [];
    //   formState.pageBean = pageBean
    //   getList()
    // })
  });
}

// 上传
function addBlo() {
  console.log(4242);
}

let headers = {
  authorization: "authorization-text",
};

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

let upLoading = ref<boolean>(false);

function handleChange(info: FileInfo) {
  upLoading.value = true;
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(` 上传成功!`);
    serveListMd.value!.queryList();
    upLoading.value = false;
    // message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    upLoading.value = false;
    // message.error(`${info.file.name} file upload failed.`);
  }
}

let upImgLoading = ref<boolean>(false);
function handleChangeImg(info: FileInfo) {
  upImgLoading.value = true;
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    console.log("info", info.file.response);

    message.success(` 上传成功!`);
    getSelectProdEnvBlogResourceList();
    upImgLoading.value = false;
    // message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    upImgLoading.value = false;
    // message.error(`${info.file.name} file upload failed.`);
  }
}

let delImgloading = ref<boolean>(false);
function delImg(name: string) {
  delImgloading.value = true;
  deleteResourceFile(blogFileName.value, name).then((res) => {
    delImgloading.value = false;
    console.log("deleteResourceFile", res);
    getSelectProdEnvBlogResourceList();
  });
  console.log(name);
}
</script>

<style scoped>
.item {
  margin-top: 20px;
}
.imglist img {
  width: 100px;
  object-fit: contain;
}
.blog-img {
  margin-top: 10px;
}
.img-box {
  margin-top: 5px;
}
.btn {
  margin-top: 5px;
}
</style>
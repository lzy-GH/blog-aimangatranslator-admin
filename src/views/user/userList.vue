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
      <template #registerTime="{ record }">
        <span> {{ record.registerTime }}232323</span>
      </template>

    </serve-list>
    <model
      v-model:isVisible="isVisible"
      title="用户管理"
      :isLoading="isLoading"
      :isDisabled="isDisabled"
    >
      <template v-slot:content>
        <a-form :model="editForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item label="调整翻译次数">
            <a-input-number 
              v-model:value="editForm.adjustTimes" 
              :min="0" 
              placeholder="输入正数增加/负数减少"
            />
          </a-form-item>
          
          <a-form-item label="订阅管理">
            <a-button danger v-if="editForm.hasSubscription" @click="cancelSubscription">
              取消订阅
            </a-button>
            <span v-else>无订阅</span>
          </a-form-item>

          <a-form-item label="账号状态">
            <a-switch
              v-model:checked="editForm.isActive"
              :checkedValue="true"
              :unCheckedValue="false"
              checked-children="正常"
              un-checked-children="封禁"
            />
          </a-form-item>

          <a-form-item label="支付历史">
            <a-button type="link" @click="showPaymentHistory">查看支付记录</a-button>
          </a-form-item>
        </a-form>
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
    label: "邮箱",
    key: "email",
    value: "",
    type: "input",
    placeholder: "请输入邮箱",
  },
]);

let listHeader: ColumnProps[] = [
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    // slots: { customRender: 'email' },
  },
  {
    title: "注册时间",
    dataIndex: "registerTime",
    key: "registerTime",
    slots: { customRender: "registerTime" },
  },
  {
    title: "支付方式",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "剩余次数",
    dataIndex: "remainingTimes",
    key: "remainingTimes",
  },
  {
    title: "已用次数",
    dataIndex: "usedTimes",
    key: "usedTimes",
  },
  {
    title: "会员类型",
    dataIndex: "memberType",
    key: "memberType",
    customRender: ({ text, record, index }) => {
      switch (text) {
        case 0:
          return "次数";
        default:
          return "订阅";
      }
    },
  },
];

let listOperation: IListOperation[] = [
  {
    label: "编辑",
    key: "edit",
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


let data = reactive([{
  email: "1",
  registerTime: "2",
  paymentMethod: "3",
  remainingTimes: "4",
  usedTimes: "5",
  memberType: "6",
}]);
let getList = (val: {}, resolve: (data: {}) => void): void => {
  // getMangaNb()
  // return

  // let a = Object.assign(ddd,val)
  // console.log('getList',val);
  resolve(data)

  // getJSONlist().then((res) => {
  //   // dataSource.value = res.records
  //   // pageBean.totalCount = res.total;
  //   console.log(res.data);
  //   let msg: any = [];
  //   if (res.code == 200) {
  //     msg = res.data?.map((item) => {
  //       return {
  //         name: item.fileName,
  //         link: item.blogUrl,
  //         lastModifiedTime: item.lastModifiedTime,
  //         status: item.status,
  //       };
  //     });
  //   }
  //   resolve(msg);
  // });
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
  if (key == "edit") {
    isVisible.value = true;
    console.log('cscs',data);
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



let delImgloading = ref<boolean>(false);
function delImg(name: string) {
  delImgloading.value = true;
  deleteResourceFile(blogFileName.value, name).then((res) => {
    delImgloading.value = false;
    console.log("deleteResourceFile", res);
  });
  console.log(name);
}

const editForm = reactive({
  adjustTimes: 0,
  hasSubscription: true,
  isActive: true,
});

function cancelSubscription() {
  Modal.confirm({
    title: '确认取消订阅?',
    content: '此操作将立即终止用户的订阅服务',
    onOk() {
      // TODO: Implement subscription cancellation API call
      message.success('订阅已取消');
    }
  });
}

function showPaymentHistory() {
  // TODO: Implement payment history display logic
  message.info('支付历史记录功能开发中');
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
<template>
  <!-- 筛选表单 -->
  <div class="query">
    <a-form layout="inline">
      <template v-for="item in searchItems" :key="item.key">
        <a-form-item :label="item.label">
          <a-input
            :maxLength="item.maxLength || 99999"
            v-if="item.type === 'input'"
            v-model:value="item.value"
            :placeholder="item.placeholder || '请输入'"
          />

          <a-select
            v-if="item.type === 'select'"
            v-model:value="item.value"
            :style="{ width: item.width || '200px' }"
            :options="item.options"
            :placeholder="item.placeholder || '请选择'"
            allowClear
          >
          </a-select>
          <a-select
            v-if="item.type === 'selectMode'"
            v-model:value="item.value"
            :style="{ width: item.width || '200px' }"
            :options="
              item.options || item.key === 'showClient' ? showClientOptions : []
            "
            :placeholder="item.placeholder || '请选择'"
            mode="multiple"
          >
          </a-select>

          <!-- @change="(val: Moment[], mode: string)=>{pickerRangeChange(val,mode,item)}" -->
          <a-range-picker
            v-if="item.type === 'pickerRange'"
            v-model:value="item.value"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
      </template>
      <a-form-item label="">
        <a-button @click="queryList" type="primary">查询</a-button>
        <!-- <a-button @click="funBtn('reset')">重置</a-button> -->
        <slot name="button"> </slot>
      </a-form-item>
    </a-form>
    <a-form>
      <a-form-item label="">
        <slot name="labelButton"> </slot>
        <a-button v-show="del" @click="delItem">删除</a-button>
      </a-form-item>
    </a-form>
  </div>

  <!-- <div class="sel-til">
      已选择{{selItem.selectedRowKeys.length}}项
        <span class="cursor" @click="delSel">清空</span>
    </div> -->
  <!-- 表格 :row-selection="{ selectedRowKeys:selItem.selectedRowKeys, onChange: onSelectChange}" 去除选择列表-->
  <a-table
    :pagination="pagination"
    @change="handleTableChange"
    rowKey="id"
    :dataSource="dataSource"
    :columns="columns"
    :loading="tableLoading"
  >
    <!-- <template #showClient="{text,record }">
          {{getShowClient(text)}}
      </template>
      <template #materialUrl="{text,record }">
          <img style="width: 100px;height: 100px;object-fit: contain;" :src="text" alt="预览图片">
      </template> -->
    <template v-for="col in columnSlots" #[col]="{ record }" :key="col">
      <slot :name="col" :record="record"></slot>
    </template>
    <template #operation="{ record }">
      <span
        v-for="item in listOperation"
        :key="item.key"
        class="cursor"
        @click="funBtn(item.key, record)"
        >{{ item.label }}</span
      >
    </template>
    <template v-if="isExpandedRowRender" #expandedRowRender>
      <a-table :columns="innerColumns" :data-source="innerData"> </a-table>
    </template>
  </a-table>
</template>

<script lang='ts' setup>
import {
  defineProps,
  defineEmits,
  ref,
  reactive,
  onMounted,
  watch,
  computed,
  defineExpose,
  nextTick,
} from "vue";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import { SelectTypes } from "ant-design-vue/lib/select";
import { TableState } from "ant-design-vue/lib/table/interface";
// import { requestPageBean } from '@/api/type';
// import { IVtCreatFormState,IProvAreaList,IAdPlaceList, IVertisingDataType, IVertisingQueryData,IProvList } from '@/apiTyep/advertisingType';
import { Moment } from "moment";
import { formatting } from "@/hooks/queryItem";
// import { State } from '@/apiTyep/user';
import {
  ISearchItems,
  ShowClient,
  IListOperation,
  requestPageBean,
  State,
} from "@/typing/view";
import { useRoute } from "vue-router";

const route = useRoute();
/*
 *改造
 */
interface IProps {
  searchItems: ISearchItems[];
  listOperation: IListOperation[];
  listHeader: ColumnProps[];
  del?: boolean;
  isExpandedRowRender?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  del: false,
  isExpandedRowRender: false,
});

interface IEmit {
  (e: "getList", searchObj: any, resolve: (data: {}) => void): void;
  (e: "funBtn", btn: string, record?: any): void;
  (e: "delItem", selectedRowKeys: Key[]): void;
}
const emit = defineEmits<IEmit>();

let columnSlots = ref<string[]>([]);
let dataSource = ref<any[]>([]);
let innerData = ref<any[]>([]);
let innerColumns = ref<any[]>([]);
let columns: ColumnProps[] = [
  ...props.listHeader,
  {
    title: "",
    dataIndex: "operation",
    slots: { customRender: "operation" },
  },
];

// 选择项
type Key = ColumnProps["key"];
const selItem = reactive<{
  selectedRowKeys: Key[];
}>({
  selectedRowKeys: [],
});
const onSelectChange = (selectedRowKeys: Key[]): void => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  selItem.selectedRowKeys = selectedRowKeys;
};
//清空
let delSel = (): void => {
  selItem.selectedRowKeys = [];
};
function delItem() {
  emit("delItem", selItem.selectedRowKeys);
}

//请求分页数据
let pageBean = reactive<requestPageBean>({
  pageNum: 1,
  pageSize: 5,
  totalCount: 1,
  totalPageNum: 3,
});
/*
 *分页功能
 */
//控制表格分页
const pagination = computed(() => ({
  total: pageBean.totalCount,
  current: pageBean.pageNum,
  pageSize: pageBean.pageSize,
}));

type Pagination = TableState["pagination"];
// 分页触发事件
let handleTableChange = (pagination: Pagination) => {
  console.log(pagination);
  pageBean.pageNum = pagination!.current!;
  getList();
};

/*
 *获取需要的插槽
 */
props.listHeader.forEach((element: ColumnProps) => {
  if (element.slots) {
    columnSlots.value.push(element.slots.customRender!);
  }
});

// 处理时间
// let time:{[propName: string]: any } = {}
// function pickerRangeChange(val: Moment[], mode: string,item:ISearchItems){
//   console.log(val, mode,item);
//   let timeArr:string[] = item.key.split('-');
//   time[timeArr[0]] = mode[0]
//   time[timeArr[1]] = mode[1]
// }

// 查询
let tableLoading = ref<boolean>(false);
let searchObj: { [propName: string]: any } = {};
let queryList = (): void => {
  tableLoading.value = true;
  props.searchItems.forEach((item: ISearchItems) => {
    if (item.type === "selectMode") {
      // 端侧数据处理
      searchObj[item.key] = item.value.join();
    } else if (item.type === "pickerRange") {
      //时间数据处理
      let timeArr: string[] = item.key.split("-");
      searchObj[timeArr[0]] = formatting(item.value).timeEnd;
      searchObj[timeArr[1]] = formatting(item.value).timestart;
    } else {
      searchObj[item.key] = item.value;
    }
  });
  //查询页码要回到第一页
  pageBean.pageNum = 1;
  // Object.assign(obj,time)
  console.log(4245, searchObj);
  getList();
};

function getList() {
  searchObj.pageBean = pageBean;
  new Promise((resolve, reject) => {
    emit("getList", searchObj, resolve);
  }).then((res: any) => {
    console.log(5, res);
    dataSource.value = res.records || res;
    pageBean.totalCount = res.total;
    tableLoading.value = false;
  });
}
defineExpose({
  getList,
  queryList,
});

const showClientOptions = ref<SelectTypes["options"]>([
  {
    label: "全部",
    value: ShowClient.全部,
  },
  {
    label: "android",
    value: ShowClient.android,
  },
  {
    label: "iphone",
    value: ShowClient.iphone,
  },
  {
    label: "pc",
    value: ShowClient.pc,
  },
  {
    label: "web",
    value: ShowClient.web,
  },
  {
    label: "androidsdk",
    value: ShowClient.androidsdk,
  },
  {
    label: "iphonesdk",
    value: ShowClient.iphonesdk,
  },
  {
    label: "miniprogram",
    value: ShowClient.miniprogram,
  },
  {
    label: "tv",
    value: ShowClient.tv,
  },
]);

let funBtn = (btn: string, record?: any): void => {
  // Object.assign(formState, original())
  emit("funBtn", btn, record);
};

watch(
  () => route.fullPath,
  (newValue, oldValue) => {
    nextTick(() => {
      queryList();
    });
  },
  { immediate: true }
);
// onMounted(()=>{

// })
/*
 *改造end
 */
</script>

<style lang="less" scoped>
.cursor {
  cursor: pointer;
  margin-left: 10px;
  color: #3395ff;
  white-space: nowrap;
}
.sel-til {
  background-color: #e6f7ff;
  margin-bottom: 15px;
  padding: 10px 5px;
}
.query {
  .ant-row {
    margin-bottom: 10px;
  }
  button {
    margin: 0 7px;
  }
}
</style>

import { message, Modal } from "ant-design-vue";
import { createVNode, ref } from "vue";
import {ExclamationCircleOutlined } from '@ant-design/icons-vue'; // 图标库
import { ColumnProps } from "ant-design-vue/lib/table/interface";


type Key = ColumnProps['key'];
interface Fun {
  ():void
}
export function delItem<T extends Key[], K extends Fun >(selId: T, fun:K):void {
  if(selId.length < 1){
    message.info('请选择一条数据!') 
  } else{
    Modal.confirm({
      title: () => '是否确定执行操作?',
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => '',
      onOk() {
        fun()
        // deleteAdPlace<Key[]>(selItem.selectedRowKeys).then((res) =>{
        //   console.log(res);
        //   selItem.selectedRowKeys = []
        //   getList()
        // })
      },
      onCancel() {
      },
    });
  }
}
<template>
  <div class="bread_box">
    <a-breadcrumb>
        <!-- <template v-for="item in routes" :key="item.name"> -->
            <a-breadcrumb-item v-for="(item,index) in breadcrumbArr" :key="index">{{item}}</a-breadcrumb-item>
        <!-- </template> -->
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import router from '@/router';
import { defineComponent, ref, toRefs, watch } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import adRouter from '../router/model/ChRouter'


interface Route {
  path: string;
  title: string;
  [propName:string]:any
  children?: Route[];
}

export default defineComponent({
  props: ['pushRoutePath'],
  setup(props,context) {
    console.log(props);
    const route = useRoute();
    const routes = ref<Route[]>(adRouter)

    console.log(23,route.path);


    let path:string= '';
    function filterPath(ch:Route[],item:string):string{
      // debugger
      if(ch.length){
        ch.find(item2 => {
          if(item == item2.name){
            path = item2.title
          }else if(item2.children?.length){
            path = filterPath(item2.children,item)
          }
        });
      }
      return path
    }

    
    let breadcrumbArr = ref<string[]>([]);

    function first(route:string) {
      let setPathArr = route.split('/')
      console.log(14,setPathArr);
      console.log(15,adRouter);
      setPathArr.forEach((item:string) => {
        if(item){
          breadcrumbArr.value.push(filterPath(adRouter,item))
        }
        console.log('setPath',breadcrumbArr.value);
      });
    }

    first(route.path);

    watch(()=>props.pushRoutePath,(nval,oval)=>{
      console.log(nval);
      
      breadcrumbArr.value = [];
      first(nval);
    })

    return {
      basePath: '/components/breadcrumb',
      routes,
      breadcrumbArr,
    };
  },
});
</script>

<style lang="less" scoped>
.bread_box{
  padding: 20px;
  padding-bottom: 0;
}
</style>
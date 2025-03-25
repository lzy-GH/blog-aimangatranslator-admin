<template>
    <a-layout class="layout-box">
        <a-layout-sider
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        >
        <div class="logo">AiMangaTranslator</div>
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys"  v-model:openKeys="openKeys">
            <template v-for="item in routerPath" :key="item.name">
                <a-menu-item v-if="!item.children" :key="item.name" @click="pushPath(item.path)">{{item.title}}</a-menu-item>
                <template v-else>
                    <sub-menu @routeClick="routeClick"  :menu-info="item" :key="item.name"/>
                </template>
                <!-- <a-sub-menu v-else>
                    <template #icon>
                        <appstore-outlined />
                    </template>
                    <template #title>{{item.title}}</template>
                    <a-menu-item v-for="item2 in item.children" :key="item2.name" @click="pushPath(item2.path)">{{item2.title}}</a-menu-item>
                </a-sub-menu> -->
            </template>
        </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="{ background: '#fff', padding: 0 }" >
                <div class="hd">
                  <span class="hd_name">{{userName}}</span>
                   <!-- 退出登录 -->
                  <a-popconfirm
                      title="确定要退出登录?"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="logOut"
                    >
                      <span class="out">
                        <!-- 退出 -->
                      </span>
                    </a-popconfirm>
                </div>
            </a-layout-header>
            <Breadcrumb :pushRoutePath='pushRoutePath' />
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <router-view class="content-box"/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import {MailOutlined,PieChartOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive } from 'vue';
import { useRouter,useRoute } from 'vue-router'
import adRouter from '../router/model/ChRouter'
import Breadcrumb  from '@/components/breadcrumb.vue';
import store from '@/store';

const SubMenu = {
  name: 'SubMenu',
  emits:['routeClick'],
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.name">
      <template #icon><MailOutlined /></template>
      <template #title @click="pushPath(menuInfo.path)">{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name" @click="pushPath(item.path)">
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu @routeClick="routeClick" :menu-info="item" :key="item.name" />
        </template>
      </template>
    </a-sub-menu>
  `,
    setup(props:any,context:any){
        const router = useRouter()
        
        const pushPath =  (url:string):void => {
            console.log(4442,url);
            router.push(url)
            context.emit('routeClick',url)
        }

        const routeClick = (url:string):void => {
          context.emit('routeClick',url)
        }
        return{
            pushPath,
            routeClick
        }
    },
  components: {
    PieChartOutlined,
    MailOutlined,
  },
};

export default defineComponent({
    components: {
        Breadcrumb,
        'sub-menu': SubMenu,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const onCollapse = (collapsed: boolean, type: string) => {
            console.log(collapsed, type);
        };

        const onBreakpoint = (broken: boolean) => {
        console.log(broken);
        };
        
        var pushRoutePath = ref<string>('我的娃达娃')
        var msg = ref<string>('卧槽')
        const pushPath =  (url:string):void => {
            console.log(4442,url);
            router.push(url)
            pushRoutePath.value = url
        }
        const routerPath = reactive(adRouter);
        console.log('routerPath',routerPath)
        // 刷新时匹配选择的路由
        console.log(2,route.path);
        let routeArr:string[] = route.path.split('/')
        console.log('routeArr',routeArr[routeArr.length - 1])
        let selKey = ref<string[]>([routeArr[routeArr.length - 1] || 'adMaterial'])
        console.log('selKey',selKey)
        

        function routeClick(url:string):void{
          console.log(660,url);
          pushRoutePath.value = url
          console.log(661,pushRoutePath.value);
        }


        let userName = ref<string>('')
        userName.value = store.state.user.userName

        function logOut(){
           router.replace({
              name: 'login',
          });
        }


        // console.log('selKey',selKey.value)
        return {
            selectedKeys: selKey,
            openKeys:ref<string[]>(['ad']),
            onCollapse,
            onBreakpoint,
            pushPath,
            routerPath,
            pushRoutePath,
            routeClick,
            userName,
            logOut
        };
    },
});
</script>

<style scoped lang="less">
.layout-box{
    height: 100%;
}
.logo {
  // height: 32px;
  // background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  text-align: center;
  line-height: 32px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}

.content-box{
    background-color: #fff;
    padding: 20px;
    height: calc(100%);
    overflow: auto;
}
.hd{
  padding: 0 20px;
  .hd_name{
    float: right;
  }
}
</style>

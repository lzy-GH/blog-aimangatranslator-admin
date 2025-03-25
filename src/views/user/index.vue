<template>
    <div>
        <a-config-provider :locale="locale">
            <router-view/>
        </a-config-provider>
    </div>
</template>


<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  export default {
    data() {
      return {
        locale: zhCN,
      };
    },
  };
</script>

<style scoped>
</style>
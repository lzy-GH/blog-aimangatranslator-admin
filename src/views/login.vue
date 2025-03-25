<template>
    <div class="login">
        <div class="lg_form">
            <div class="hd">
                <arrow-left-outlined class="left_ico" />
                账号密码登录
            </div>
            <div class="form_data">
                <a-input :maxlength="18" size="large" placeholder="请输入账号">
                    <template #prefix>
                        <user-outlined type="user" />
                    </template>
                </a-input>
                <a-input-password :maxlength="50" size="large" placeholder="请输入密码">
                    <template #prefix>
                        <lock-outlined type="user" />
                    </template>
                </a-input-password>
                 <!-- Turnstile 小部件 -->
                <div
                    class="cf-turnstile"
                    data-sitekey="0x4AAAAAAAjq4OnnOZnIn9LQ"
                    data-action="interactive"
                    data-callback="onSuccess"
                ></div>
                <!-- <a-input-search placeholder="请输入验证码" :enter-button="'获取验证码'" size="large" /> -->
                <!-- <div class="alter_pwd">忘记密码</div> -->
                <a-button :disabled="true" size="large" type="primary">登录</a-button>
            </div>

            <div class="form_data" style="display: none;">
                <a-input size="large" :maxlength="18" placeholder="请输入你要找回的账号">
                    <template #prefix>
                        <user-outlined type="user" />
                    </template>
                </a-input>
                <a-input size="large" :maxlength="18" placeholder="请输入手机号号码">
                    <template #prefix>
                        <phone-outlined type="user" />
                    </template>
                </a-input>
                <a-input-search placeholder="请输入验证码" :enter-button="'获取验证码'" size="large" />
                <a-input-password :maxlength="50" size="large" placeholder="请输入新密码">
                    <template #prefix>
                        <lock-outlined type="user" />
                    </template>
                </a-input-password>
                <a-input-password :maxlength="50" size="large" placeholder="请再次输入密码">
                    <template #prefix>
                        <lock-outlined type="user" />
                    </template>
                </a-input-password>
                <a-button :disabled="true" size="large" type="primary">确定</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined, PhoneOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
import { onMounted,ref } from 'vue';
 console.log('setup')
onMounted(() => {
    console.log('onMounted')
    // 动态加载 Cloudflare Turnstile 的脚本
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.head.appendChild(script);
});
const token = ref<string | null>(null);
 const onSuccess = (tokenValue:string) => {
    token.value = tokenValue;
    // submitForm(token.value);
    console.log('token',token.value)
    return false
};


// const submitForm = async (token:string | null) => {
//     try {
//     const response = await fetch('/api/verify-cf-token', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//     });
//     const result = await response.json();
//     if (result.success) {
//         console.log('验证通过');
//     } else {
//         console.error('验证失败');
//     }
//     } catch (error) {
//     console.error('验证请求出错', error);
//     }
// };
</script>

<style scoped lang="less">
.login {
    height: 100%;
    background: url(../assets/login.jpg) center no-repeat;
    position: relative;
    .lg_form {
        width: 400px;
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: #fff;
        .hd {
            background-color: #2d8cf0;
            padding: 20px;
            color: #fff;
            font-size: 18px;
            .left_ico {
                color: #fff;
                float: left;
                cursor: pointer;
            }
        }
        .form_data {
            padding: 15px 20px;
        }
        .alter_pwd {
            text-align: left;
            cursor: pointer;
            color: #2d8cf0;
            font-size: 14px;
            line-height: 1.5;
        }
        .ant-input-affix-wrapper,
        .ant-input-search {
            margin: 10px 0;
        }
        .ant-btn {
            width: 100%;
        }
    }
    .cf-turnstile{
        display: flex;
        align-items: left;
    }
}
</style>

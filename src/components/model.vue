<template>
    <a-modal
        v-model:visible="isVisible" 
        @cancel="downModal"
        :ok-button-props="{ loading:isLoading,disabled:isDisabled }"
        @ok="createAdPlaceBtn"
        :maskClosable='false'
        okText="确定"
        cancelText="取消"
        :forceRender='true'
    >
        <template #title>
            <div style="text-align: center;">
                {{title}}
            </div>
        </template>
        <slot name="content" ></slot>

        <template #footer v-if="slots.footerButton">
            <slot name="footerButton"></slot>
        </template>
        
    </a-modal>
</template>

<script lang='ts' setup>
import { ref,defineProps,defineEmits, useSlots } from 'vue';

interface IProps {
    isVisible:boolean;
    title: string;
    isLoading?: boolean;
    isDisabled?:boolean
}

let props = withDefaults(defineProps<IProps>(), {
    isVisible:false,
    isLoading:false,
    isDisabled:false,
});

const slots = useSlots();
console.log(551516,!slots.footerButton);

interface IEmit {
    (e: 'downModal'): void;
    (e: 'createAdPlaceBtn'): void;
    (e:'update:isVisible',bool:boolean):void
}
let emit = defineEmits<IEmit>();
function downModal():void{
    emit("update:isVisible", false);
    emit("downModal")
};

function createAdPlaceBtn():void{
    emit("createAdPlaceBtn")
}

</script>

<style scoped>
</style>
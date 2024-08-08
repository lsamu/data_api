<template>
    <div>
        <el-tabs v-model="thatOption.active" class="magic-footer-tabs">
            <el-tab-pane name="first" label="执行结果">
                <box-magic-monaco-editor v-model="currentResponseText"
                    :style="{ height: useThat.sizeOption.footer.height - 55 + 'px' }" language="json">

                </box-magic-monaco-editor>

            </el-tab-pane>
            <el-tab-pane name="sec3" label="运行日志">
                <box-magic-monaco-editor v-model="currentResponseLogs"
                    :style="{ height: useThat.sizeOption.footer.height - 55 + 'px' }" languate="plaintext">

                </box-magic-monaco-editor>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>

import { thatStore } from "../../store/thatStore"
const useThat = thatStore();

const thatOption = reactive({
    active: "first",
    tabPosition: "left"
})

const currentResponseText = computed(()=>{
    if(!useThat.thatOption.dataSelected){
        return ""
    }
    if(!useThat.thatOption.dataSelected["response_text"]){
        return ""
    }
    return useThat.thatOption.dataSelected["response_text"]
})

const currentResponseLogs = computed(()=>{
    if(!useThat.thatOption.dataSelected){
        return ""
    }
    if(!useThat.thatOption.dataSelected["response_logs"]){
        return ""
    }
    return useThat.thatOption.dataSelected["response_logs"]
})

</script>
<style lang="scss">
.magic-footer-tabs {
    .el-textarea__inner {
        height: 100%;
    }
}
</style>
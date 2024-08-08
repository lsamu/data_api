<template>
    <div>
        <el-row>
            <el-col>
                <div style="display: flex;flex-direction: row;">
                    <el-input placeholder="请输入函数路径" v-model="thatOption.form.key" style="flex: 1;">
                    </el-input>
                    <el-button  type="primary" size="small" style="margin-left: 10px" icon="el-icon-CaretRight" title="运行 ctrl+r " @click="handleRun" >
                    </el-button>
                    <el-button   type="primary" size="small" style="margin-left: 6px" icon="el-icon-check" title="保存 ctrl+s " @click="handleSave">
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tabs v-model="thatOption.active">
                    <el-tab-pane name="script" label="脚本内容">
                        <box-magic-monaco-editor v-model="thatOption.form.script"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }">

                        </box-magic-monaco-editor>
                    </el-tab-pane>
                    <el-tab-pane name="params" label="请求参数">
                        <BBParams v-model="thatOption.form.param.params"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }"></BBParams>
                    </el-tab-pane>
                    <el-tab-pane name="desc" label="函数描述">
                        <box-magic-monaco-editor v-model="thatOption.form.desc"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }" language="text"></box-magic-monaco-editor>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { thatStore } from "../../store/thatStore"
import requestUtil from "../../utils/requestUtil";
import { ElMessageBox as MessageBox, ElAlert as Alert, ElNotification as Notification, ElMessage as Message } from "element-plus";
import lodash from "lodash"

import BBParams from "./params.vue"

const useThat = thatStore();

const props = defineProps(["modelValue"])


const keys = useMagicKeys({
    passive: false,
    onEventFired(e) {
        e.preventDefault()
        return false
    }
})

const ctrls = keys['ctrl+s']

watch(ctrls, (v) => {
    if (v) {
        if (useThat.thatOption.dataSelected.id == props.modelValue.id) {
            console.log('触发了保存')
            handleSave()
        }
    }
})

const ctrlr = keys['ctrl+r']

watch(ctrlr, (v) => {
    if (v) {
        if (useThat.thatOption.dataSelected.id == props.modelValue.id) {
            console.log('触发了运行')
            handleRun()
        }
    }
})

const thatOption = reactive({
    active: "script",
    form: lodash.merge(props.modelValue, {
        param: {
            params: []
        },
        desc: ""
    }) as any
})

const handleSave = async () => {
    const ret = await requestUtil.request("/admin/magic/magic/update", "post", thatOption.form)
    if (ret.code != 0) {
        Message.error(ret.msg);
        return
    }
    Message.success("保存成功");
}

const handleRun = async () => {
    const ret = await requestUtil.request("/admin/magic/magic/update", "post", thatOption.form)
    if (ret.code != 0) {
        Message.error(ret.msg);
        return
    }
}
</script>
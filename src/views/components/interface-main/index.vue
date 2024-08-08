<template>
    <div>
        <el-row type="flex" justify="start">
            <el-col :span="24" style="padding-bottom: 5px;">
                <div style="display: flex;flex-direction: row;">
                    <el-input placeholder="请输入请求URL" v-model="thatOption.form.key" style="flex: 1;">
                        <template #prepend>
                            <div class="centerClass">
                                <el-select v-model="thatOption.form.param.method" style="width: 100px">
                                    <el-option v-for="item, index in ['GET', 'POST', 'PUT', 'DELETE']" :key="index"
                                        :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="centerClass">
                                <div class="line"></div>
                            </div>
                        </template>
                    </el-input>
                    <el-button type="primary" size="small" style="margin-left: 10px" @click="handleRun" icon="el-icon-CaretRight"
                        title="运行 ctrl+r ">
                    </el-button>
                    <el-button type="primary" size="small" style="margin-left: 6px" @click="handleSave" icon="el-icon-check"
                        title="保存 ctrl+s ">
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tabs v-model="thatOption.active">
                    <el-tab-pane name="first0" label="脚本内容">
                        <box-magic-monaco-editor v-model="thatOption.form.script"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }">
                        </box-magic-monaco-editor>
                    </el-tab-pane>
                    <el-tab-pane name="first1" label="请求参数">
                        <BBParams v-model="thatOption.form.param.params"></BBParams>
                    </el-tab-pane>
                    <el-tab-pane name="first2" label="请求Header">
                        <BBHeader v-model="thatOption.form.param.headers"></BBHeader>
                    </el-tab-pane>
                    <el-tab-pane name="first3" label="请求Body">
                        <box-magic-monaco-editor v-model="thatOption.form.param.headers.bodys" language="json"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }"></box-magic-monaco-editor>
                    </el-tab-pane>
                    <el-tab-pane name="first4" label="接口描述">
                        <box-magic-monaco-editor v-model="thatOption.form.desc"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }"
                            language="text">

                        </box-magic-monaco-editor>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { ElMessageBox as MessageBox, ElAlert as Alert, ElNotification as Notification, ElMessage as Message } from "element-plus";
import { thatStore } from "../../store/thatStore"
import lodash from "lodash"
import requestUtil from "../../utils/requestUtil";

import BBHeader from "./header.vue"
import BBParams from "./params.vue"

const props = defineProps(["modelValue"])
const emits = defineEmits(["update:modelValue"])
const useThat = thatStore();

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
    active: "first0",
    form: {} as any
})

watchEffect(() => {
    thatOption.form = lodash.merge(props.modelValue, {
        param: {
            params: [],
            headers: []
        }
    });
})


// thatOption.form = computed({
//     get: () => {
//         return lodash.merge(props.modelValue, {
//             param: {
//                 params: [],
//                 headers: []
//             }
//         });
//     },
//     set: (o) => {
//         emits("update:modelValue", o)
//     }
// })

// 执行
const handleRun = async () => {

    if (!thatOption.form.param.method) {
        Message.error("请选择请求方式");
        return
    }
    if (!thatOption.form.key) {
        Message.error("请输入请求地址");
        return
    }
    if (!thatOption.form.script) {
        Message.error("脚本不能为空");
        return
    }

    const ret = await requestUtil.request("/admin/magic/magic/update", "post", thatOption.form)
    if (ret.code != 0) {
        Notification.error(ret.msg);
        return
    }

    const ret2 = await requestUtil.request(thatOption.form["full_url"], thatOption.form.param.method, thatOption.form.param.bodys, thatOption.form.param.headers)

    useThat.setResponseText(JSON.stringify(ret2))

}

// 保存
const handleSave = async () => {

    const ret = await requestUtil.request("/admin/magic/magic/update", "post", thatOption.form)
    if (ret.code != 0) {
        Message.error(ret.msg);
        return
    }
    Message.success("保存成功");
}

</script>
<style lang="scss">
.splitpanes.default-theme .splitpanes__pane {
    background-color: none !important;
}
</style>
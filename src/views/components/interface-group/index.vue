<template>
    <div>
        <el-row type="flex" justify="start">
            <el-col :span="24" style="padding-bottom: 5px;">
                <div style="display: flex;flex-direction: row;">
                    <el-input placeholder="请输入请求URL" v-model="thatOption.form.key" style="flex: 1;">
                    </el-input>
                    <el-button type="primary" style="margin-left: 10px" @click="handleRun" icon="el-icon-CaretRight"
                        title="运行">
                    </el-button>
                    <el-button type="primary" style="margin-left: 6px" @click="handleSave" icon="el-icon-check"
                        title="保存">
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tabs v-model="thatOption.active">
                    <el-tab-pane name="first0" label="脚本">
                        <box-magic-monaco-editor v-model="thatOption.form.script"
                            :style="{ height: useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 245 + 'px' }">
                        </box-magic-monaco-editor>
                    </el-tab-pane>
                    <el-tab-pane name="params" label="路径变量">
                        <BBParams v-model="thatOption.form.param.params"></BBParams>
                    </el-tab-pane>
                    <el-tab-pane name="options" label="分组选项">
                        <BBOption v-model="thatOption.form.param.options"></BBOption>
                    </el-tab-pane>
                    <el-tab-pane name="desc" label="分组描述">
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

import BBOption from "./option.vue"
import BBParams from "./params.vue"

const props = defineProps(["modelValue"])
const emits = defineEmits(["update:modelValue"])
const useThat = thatStore();

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
        Notification.error("请选择请求方式");
        return
    }
    if (!thatOption.form.key) {
        Notification.error("请输入请求地址");
        return
    }
    if (!thatOption.form.script) {
        Notification.error("脚本不能为空");
        return
    }

    // 组装地址
    thatOption.form["full_url"] = "";

    const ret = await requestUtil.request("/admin/magic/api/update", "post", thatOption.form)
    if (ret.code != 0) {
        Notification.error(ret.msg);
        return
    }

    // todo: 访问数据
    const ret2 = await requestUtil.request(thatOption.form["full_url"], thatOption.form.param.method, thatOption.form.param.bodys, thatOption.form.param.headers)

    useThat.setResponseText(JSON.stringify(ret2))
    Notification.success("处理成功");
}

// 保存
const handleSave = async () => {

    const ret = await requestUtil.request("/admin/magic/api/update", "post", thatOption.form)
    if (ret.code != 0) {
        Notification.error(ret.msg);
        return
    }
    Notification.success("处理成功");
}

</script>
<style lang="scss">
.splitpanes.default-theme .splitpanes__pane {
    background-color: none !important;
}
</style>
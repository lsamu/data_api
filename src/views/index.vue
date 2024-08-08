<template>
    <el-container class="magic-index" v-element-size="onResizeWidow">
        <box-magic-container-header></box-magic-container-header>
        <el-container class="bodyer">
            <splitpanes class="default-theme">
                <pane min-size="10" size="22" max-size="50">
                    <el-aside width="100%" class="lefter">
                        <box-magic-container-lefter></box-magic-container-lefter>
                    </el-aside>
                </pane>
                <pane min-size="20">
                    <splitpanes class="default-theme" horizontal>
                        <pane min-size="20">
                            <el-main style="padding-top: 0; height: 100%;" class="magic-main-container">
                                <template v-if="useThat.thatOption.data && useThat.thatOption.data.length > 0">
                                    <el-tabs v-model="thatOption.active" closable @tab-remove="handleTabRemove"
                                        @tab-click="handleTabClick" class="main-tabs">

                                        <el-tab-pane :name="'first_' + index" :label="getMethod(item) + ' ' + item.name"
                                            v-for="item, index in useThat.thatOption.data" :key="index">
                                            <template #label>
                                                <span style="font-size: 12px; padding-right: 5px;"
                                                    :style="{ 'color': apiUtil.getTagColor(getMethod(item)) }"> {{
                                                        getMethod(item) }} </span> {{ ' ' + item.name }}
                                            </template>

                                            
                                            <template v-if="item['componentName'] == 'box-magic-interface-main'">
                                                <box-magic-interface-main
                                                    v-model="useThat.thatOption.data[index]"></box-magic-interface-main>
                                            </template>

                                            <template v-if="item['componentName'] == 'box-magic-function-main'">
                                                <box-magic-function-main
                                                    v-model="useThat.thatOption.data[index]"></box-magic-function-main>
                                            </template>

                                            <template v-if="item['componentName'] == 'box-magic-page-main'">
                                                <box-magic-page-main
                                                    v-model="useThat.thatOption.data[index]"></box-magic-page-main>
                                            </template>

                                            <template v-if="item['componentName'] == 'box-magic-task-main'">
                                                <box-magic-task-main
                                                    v-model="useThat.thatOption.data[index]"></box-magic-task-main>
                                            </template>


                                        </el-tab-pane>

                                    </el-tabs>

                                </template>
                                <template v-else>
                                    <div class="empty">
                                        请在左边创建你的接口,开始新的API设计
                                    </div>
                                </template>
                            </el-main>
                        </pane>
                        <pane min-size="20" size="20" v-element-size="onResizeWidowMainFooter">
                            <el-footer>
                                <box-magic-container-footer></box-magic-container-footer>
                            </el-footer>
                        </pane>
                    </splitpanes>
                </pane>
            </splitpanes>
        </el-container>
        <el-footer class="footer" height="30px">
            版权所有 2024 ~ present 
        </el-footer>

    </el-container>
</template>
<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { thatStore } from "./store/thatStore"

import { vElementSize } from '@vueuse/components'
import apiUtil from './utils/apiUtil';

const useThat = thatStore();

const thatOption = reactive({
    active: "first_0",
})

const onResizeWidow = (opt) => {
    useThat.sizeOption.global = opt;
}

const onResizeWidowMainFooter = (opt) => {
    useThat.sizeOption.footer = opt;
}

watchEffect(() => {
    thatOption.active = "first_" + useThat.thatOption.selectedIndex
})


const handleTabRemove = (active) => {
    const aa = active.split("_");
    const bb = aa[1] - 0
    useThat.remove(bb)
}

const handleTabClick = (com, event) => {
    const index = com.index;
    useThat.selectedItemByIndex(index)
}


const getMethod = (item) => {
    const componentName = item["componentName"]
    let method = "未知"
    switch (componentName) {
        case "box-magic-interface-main":
            method = item.param ? item.param.method : "未知"
            break
        case "box-magic-function-main":
            method = "Fn"
            break
        case "box-magic-page-main":
            method = "Vue"
            break
        case "box-magic-task-main":
            method = "Task"
            break
    }

    return method
}

</script>
<style lang="scss">
.magic-index {
    height: 100%;
    min-height: 800px;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 2px;

    .header {
        height: 30px;
        display: flex;
        // align-items: center;
        // justify-content: center;
        flex-direction: row;

        border-bottom: 1px solid #ccc;
        margin-bottom: 2px;
        padding: 2px;

        &-left {
            width: 200px;
            display: flex;
            align-items: center;
            font-weight: bolder;
        }

        &-center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        &-right {
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: right;

            i {
                padding: 0 5px;
            }
        }
    }

    .bodyer {
        flex: 1;
        height: calc(100vh - 60px);
    }

    .footer {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
        border-top: 1px solid #ccc;
        padding: 2px;
        font-size: 12px;
    }

    .splitpanes.default-theme .splitpanes__pane {
        background-color: transparent;
    }

    .lefter {
        padding: 0
    }

    aside {
        background-color: transparent;
    }

    .main-tabs {
        // height: 90%;

        // .el-tabs__content {
        //     height: 100%;

        //     .el-tab-pane {
        //         height: 100%;
        //     }
        // }
    }

    .magic-main-container {

        display: flex;
        flex-direction: column;
        height: 100%;

        .empty {
            flex: 1;
            align-items: center;
            justify-content: center;
            display: flex;
            font-size: 20px;
            color: #a8abb2;
        }
    }



}
</style>
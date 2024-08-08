<template>
    <el-tabs v-model="thatOption.active" :tab-position="thatOption.tabPosition">
        <el-tab-pane name="interface" label="接口">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <ElIconCalendar />
                    </el-icon>
                    <span>接口</span>
                </span>
            </template>
            <box-magic-interface></box-magic-interface>
        </el-tab-pane>
        <el-tab-pane name="function" label="函数">

            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <ElIconChatSquare />
                    </el-icon>
                    <span>函数</span>
                </span>
            </template>
            <box-magic-function></box-magic-function>
        </el-tab-pane>
        <el-tab-pane name="page" label="页面">

            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <ElIconDocument />
                    </el-icon>
                    <span>页面</span>
                </span>
            </template>
            <box-magic-page></box-magic-page>
        </el-tab-pane>
        <el-tab-pane name="task" label="定时任务">

            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <ElIconList />
                    </el-icon>
                    <span>定时任务</span>
                </span>
            </template>
            <box-magic-task></box-magic-task>
        </el-tab-pane>
        <el-tab-pane name="datasource" label="数据源">

            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <ElIconList />
                    </el-icon>
                    <span>数据源</span>
                </span>
            </template>
            <box-magic-data-source></box-magic-data-source>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { thatStore } from "../../store/thatStore"

const useThat = thatStore();

const thatOption = reactive({
    active: "interface",
    tabPosition: "left"
})

</script>

<style lang="scss">
.el-tabs--left {
    height: auto !important;

    .el-tabs__item {
        width: 60px;
        line-height: 24px;
        height: auto;
        word-wrap: break-word;
        white-space: pre-line;
        // margin-bottom: 20px;
    }

    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
</style>
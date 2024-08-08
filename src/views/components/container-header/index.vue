<template>
    <div>
        <el-header class="header" height="30px" style="line-height: 30px;">
            <div class="header-logo" style="margin-right: 5px;">
                <img src="/src/assets/logo.png" width="16px" height="16px"/>
            </div>
            <div class="header-left">
                {{ currentAPPTitle }}
            </div>
            <div class="header-center">
                {{ currentTitle }}
            </div>
            <div class="header-right">
                <!-- <el-icon :size="15" title="导出"><el-icon-upload @click="handleOpenExport" /></el-icon>
                <el-icon :size="15" title="导入"><el-icon-download @click="handleOpenImport" /></el-icon>
                <el-icon :size="15" title="同步"><el-icon-promotion @click="handleOpenSync" /></el-icon> -->
                <!-- <el-icon :size="15" title="帮助"><el-icon-help @click="handleOpenHelp" /></el-icon> -->
                <el-icon :size="15" title="设置"><el-icon-setting @click="handleOpenSet" /></el-icon>
            </div>
        </el-header>

        <el-dialog :title="exportOption.dialog.title" v-model="exportOption.dialog.visible" width="50%" append-to-body
            draggable>
            <el-scrollbar height="300px">
                <el-tree :props="exportOption.tree.props" show-checkbox :data="exportOption.tree.data" />
            </el-scrollbar>
            <template #footer class="dialog-footer">
                <el-button @click="exportOption.dialog.visible = false">展开</el-button>
                <el-button @click="exportOption.dialog.visible = false">收缩</el-button>
                <el-button @click="exportOption.dialog.visible = false">全选</el-button>
                <el-button @click="exportOption.dialog.visible = false">取消全选</el-button>
                <el-button type="primary" @click="exportOption.dialog.visible = false">导出</el-button>
            </template>
        </el-dialog>

        <el-dialog :title="importOption.dialog.title" v-model="importOption.dialog.visible" width="50%" append-to-body
            draggable>
            <el-upload ref="uploadRef" class="upload-demo" action="#" :auto-upload="false">
                <template #trigger>
                    <el-button type="primary">选择文件</el-button>
                </template>
                <template #tip>
                    <div class="el-upload__tip">
                        上传文件提示
                    </div>
                </template>
            </el-upload>
            <template #footer class="dialog-footer">
                <el-button @click="importOption.dialog.visible = false">增量上传</el-button>
                <el-button type="primary" @click="importOption.dialog.visible = false">全量上传</el-button>
            </template>
        </el-dialog>

        <el-dialog :title="syncOption.dialog.title" v-model="syncOption.dialog.visible" width="50%" append-to-body
            draggable>
            <el-scrollbar height="300px">
                <el-tree :props="exportOption.tree.props" show-checkbox :data="exportOption.tree.data" />
            </el-scrollbar>

            <el-form :model="syncOption.form" label-width="120px">
                <el-form-item label="远程地址">
                    <el-tree-select v-model="syncOption.form.value" :data="syncOption.data" multiple
                        :render-after-expand="false"   show-checkbox />
                </el-form-item>
                <!-- <el-form-item label="密钥">
                    <el-input v-model="syncOption.form.name" />
                </el-form-item> -->
            </el-form>

            <template #footer class="dialog-footer">
                <el-button @click="syncOption.dialog.visible = false">全选</el-button>
                <el-button @click="syncOption.dialog.visible = false">取消全选</el-button>
                <el-button type="primary" @click="syncOption.dialog.visible = false">增量推送</el-button>
                <el-button type="primary" @click="syncOption.dialog.visible = false">全量推送</el-button>
            </template>
        </el-dialog>

        <el-dialog :title="helpOption.dialog.title" v-model="helpOption.dialog.visible" width="50%" append-to-body
            draggable>
            <span>帮助</span>
            <template #footer class="dialog-footer">
                <el-button @click="helpOption.dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="helpOption.dialog.visible = false">确 定</el-button>
            </template>
        </el-dialog>

        <el-dialog :title="setOption.dialog.title" v-model="setOption.dialog.visible" width="50%" append-to-body draggable>
            数据API 是一个基于接口快速开发框架，通过数据API快速方便编写UI界面的接口，可完成常见的HTTP,SOCKET接口开发
            <template #footer class="dialog-footer">
                <el-button @click="setOption.dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="setOption.dialog.visible = false">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { thatStore } from "../../store/thatStore"

const useThat = thatStore();

const currentAPPTitle = computed(() => {
    return import.meta.env.VITE_TITLE + " - " + import.meta.env.VITE_VERSION
})

// 导出
const exportOption = reactive({
    dialog: {
        visible: false,
        title: "导出"
    },
    form: {} as any,
    data: [],
    tree: {
        data: [
            {
                label: 'Level one 1',
                children: [
                    {
                        label: 'Level two 1-1',
                        children: [
                            {
                                label: 'Level three 1-1-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 2',
                children: [
                    {
                        label: 'Level two 2-1',
                        children: [
                            {
                                label: 'Level three 2-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 2-2',
                        children: [
                            {
                                label: 'Level three 2-2-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 3',
                children: [
                    {
                        label: 'Level two 3-1',
                        children: [
                            {
                                label: 'Level three 3-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 3-2',
                        children: [
                            {
                                label: 'Level three 3-2-1',
                            },
                        ],
                    },
                ],
            },
        ],
        props: {
            label: 'label',
            children: 'children',
        }
    }
})

const handleOpenExport = () => {
    exportOption.dialog.visible = true
}

// 导入
const importOption = reactive({
    dialog: {
        visible: false,
        title: "导入"
    },
    form: {} as any,
    data: []
})

const handleOpenImport = () => {
    importOption.dialog.visible = true
}

// 同步
const syncOption = reactive({
    dialog: {
        visible: false,
        title: "同步"
    },
    form: {} as any,
    data: []
})

const handleOpenSync = () => {
    syncOption.dialog.visible = true
}

// 帮助
const helpOption = reactive({
    dialog: {
        visible: false,
        title: "帮助"
    },
    form: {} as any,
    data: []
})

const handleOpenHelp = () => {
    helpOption.dialog.visible = true
}

const currentTitle = computed(() => {
    if (!useThat.thatOption.dataSelected) {
        return ""
    }
    return useThat.thatOption.dataSelected["full_title"];
})

const setOption = reactive({
    dialog: {
        visible: false,
        title: "设置"
    },
    form: {} as any,
    data: []
})
// 设置
const handleOpenSet = () => {
    setOption.dialog.visible = true
}
</script>
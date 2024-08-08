<template>
    <div>
        <el-button  type="primary" @click="handleInsert">添加</el-button>
        <el-table :data="props.modelValue" style="width: 100%" :height="useThat.sizeOption.global.height - useThat.sizeOption.footer.height - 280">
            <el-table-column prop="key" label="Key" width="180" >
                <template #default="scope">
                    <el-input v-model="scope.row.key"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Value" width="180">
                <template #default="scope">
                    <el-input v-model="scope.row.name"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="defaultValue" label="默认值" width="180">
                <template #default="scope">
                    <el-input v-model="scope.row.defaultValue"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="描述">
                <template #default="scope">
                    <el-input v-model="scope.row.desc"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="key" label="操作" width="80">
                <template #default="scope">
                    <el-button   type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts" setup>

import { thatStore } from "../../store/thatStore"
const useThat = thatStore();

const props = defineProps(["modelValue"])

const handleInsert = () => {
    props.modelValue.push({})
}

const handleDelete = (row, index) => {
    props.modelValue.splice(index, 1)
}
</script>
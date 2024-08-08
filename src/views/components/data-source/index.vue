<template>
    <div>
        <el-row>
            <el-col>
                <div class="grid-content bg-purple-dark centerClass">
                    <el-input placeholder="按关键字搜索" v-model="treeOption.search" prefix-icon="el-icon-search"
                        class="searchClass" clearable @update:modelValue="handleSearch">
                        <template #append>
                            <el-button type="primary" icon="el-icon-plus" @click="handleNodeAdd"></el-button>
                        </template>
                    </el-input>
                </div>
            </el-col>
            <el-col>
                <el-scrollbar :style="{ height: (useThat.sizeOption.global.height - 100) + 'px' }">
                    <el-tree ref="refTree" :data="treeOption.data" highlight-current :props="treeOption.defaultProps"
                        default-expand-all @node-click="handleNodeClick" node-key="id"
                        :default-expanded-keys="treeOption.defaultExpandIds" @node-expand="handleNodeExpand"
                        :expand-on-click-node="false" @node-collapse="handleNodeCollapse"
                        :filter-node-method="filterNode">

                        <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <span> <span v-if="data.kind_type == 2"><span
                                            :style="{ 'color': apiUtil.getTagColor('DS') }">DS</span></span> {{
                        node.label }}
                                </span>
                                <span class="context-menu">
                                    <el-dropdown trigger="click" @command="handleCommand($event, node, data)">
                                        <el-icon class="el-icon--right"><el-icon-more /></el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item icon="el-icon-plus" command="addGroup"
                                                    v-if="data.kind_type == 1">增加分组</el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-edit" command="editGroup"
                                                    v-if="data.kind_type == 1">编辑分组</el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-delete" command="deleteGroup"
                                                    v-if="data.kind_type == 1">删除分组</el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-plus" command="add" divided
                                                    v-if="data.kind_type == 1">增加数据源</el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-edit" command="edit"
                                                    v-if="data.kind_type != 1">编辑数据源</el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-document-copy" command="copy"
                                                    v-if="data.kind_type != 1">复制数据源</el-dropdown-item>
                                                <el-dropdown-item icon="el-icon-delete" command="delete"
                                                    v-if="data.kind_type != 1">删除数据源</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </span>
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </el-col>
        </el-row>

        <el-dialog :title="dialogOptionGroup.title" v-model="dialogOptionGroup.visible" width="40%" append-to-body
            modal-append-to-body draggable>
            <el-form ref="refFormGroup" :model="dialogOptionGroup.form" label-width="110px"
                :rules="dialogOptionGroup.rules">
                <el-form-item label="分组名称:" prop="name">
                    <el-input v-model="dialogOptionGroup.form.name"></el-input>
                </el-form-item>
            </el-form>

            <template #footer class="dialog-footer">
                <el-button @click="dialogOptionGroup.visible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditGroup">确 定</el-button>
            </template>
        </el-dialog>

        <el-dialog :title="dialogOptionApi.title" v-model="dialogOptionApi.visible" width="40%" append-to-body
            modal-append-to-body draggable>
            <el-form ref="refForm" :model="dialogOptionApi.form" label-width="110px"
                :rules="dialogOptionApi.rules">
                <el-form-item label="名称:" prop="name">
                    <el-input v-model="dialogOptionApi.form.name" placeholder="数据源名称,仅作显示使用"></el-input>
                </el-form-item>
                <el-form-item label="Key:" prop="key">
                    <el-input v-model="dialogOptionApi.form.key"
                        placeholder="数据源KEY,代码中使用 db.database('key')"></el-input>
                </el-form-item>
                <el-form-item label="驱动类:" prop="driver">
                    <el-select v-model="dialogOptionApi.form.param.driver" placeholder="请选择数据库驱动类" clearable filterable >
                        <el-option  label="MySql" value="mysql"></el-option>
                        <el-option  label="达梦" value="dameng"></el-option>
                        <el-option  label="SqlServer" value="sqlserver"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="地址:" prop="host">
                    <el-input v-model="dialogOptionApi.form.param.host" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="端口:" prop="port">
                    <el-input type="number" v-model="dialogOptionApi.form.param.port" placeholder="请输入端口"></el-input>
                </el-form-item>
                <el-form-item label="数据库:" prop="database">
                    <el-input v-model="dialogOptionApi.form.param.database" placeholder="请输入数据库名称"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" prop="userName">
                    <el-input v-model="dialogOptionApi.form.param.userName" placeholder="请输入数据库用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="userPwd">
                    <el-input v-model="dialogOptionApi.form.param.userPwd" placeholder="请输入数据库密码"></el-input>
                </el-form-item>
                <el-form-item label="额外链接字符串:" prop="linkStr">
                    <el-input v-model="dialogOptionApi.form.param.linkStr" placeholder="请输入额外链接字符串"></el-input>
                </el-form-item>

            </el-form>

            <template #footer class="dialog-footer">
                <el-button @click="dialogOptionApi.visible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditApiTest">测 试</el-button>
                <el-button type="primary" @click="handleEditApi">确 定</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { thatStore } from "../../store/thatStore"
import uuid from 'node-uuid';
import { ElMessageBox as MessageBox, ElAlert as Alert, ElNotification as Notification, ElMessage as Message } from "element-plus";
import requestUtil from "../../utils/requestUtil";
import apiUtil from "@/views/utils/apiUtil";

const that = getCurrentInstance().proxy;

const useThat = thatStore();

const CLS = "dataSource"
const refTree = ref();

const treeOption = reactive({
    search: "",
    data: [],
    defaultProps: {
        children: 'children',
        label: 'name'
    },
    defaultExpandIds: [], //默认展开ID集合
    parentID: 0,
    selectedNode: null,
    loading: false
})

const filterNode = (value, data) => {
    if (!value) return true;
    return data.name.indexOf(value) !== -1;
}

const handleSearch = () => {
    refTree.value.filter(treeOption.search);
}

const refFormGroup = ref()

const dialogOptionGroup = reactive({
    title: "创建组",
    visible: false,
    form: {} as any,
    rules: {
        name: [
            { required: true, message: "请输入组名称", trigger: "blur" }
        ]
    }
})

const refForm = ref()

const dialogOptionApi = reactive({
    title: "创建数据源",
    visible: false,
    form: { param: {} } as any,
    rules: {
        name: [
            { required: true, message: "请输入数据源名称", trigger: "blur" }
        ],
        key: [
            { required: true, message: "请输入Key名称", trigger: "blur" }
        ],
        driver: [
            { required: true, message: "请选中驱动类型", trigger: "blur" }
        ]
    }
})

const loadData = async () => {
    treeOption.loading = true;
    try {
        const ret = await requestUtil.request("/admin/magic/magic/tree", "post", {
            cls: CLS
        })
        treeOption.data = ret.data;
    } catch (e) {
        console.log(e)
    }
    treeOption.loading = false;
}

onMounted(async () => {
    await loadData();
})

const handleNodeClick = (node) => {
    treeOption.selectedNode = node;
    if (node.kind_type == 1) {
        return
    }
}

const handleEditGroup = async () => {
    refFormGroup.value.validate(async (valid) => {
        if (valid) {

            let ret = null;

            if (dialogOptionGroup.form["id"]) {
                ret = await requestUtil.request("/admin/magic/magic/update", "post", {
                    ...dialogOptionGroup.form
                })
            } else {
                ret = await requestUtil.request("/admin/magic/magic/create", "post", {
                    ...dialogOptionGroup.form,
                    cls: CLS
                })
            }


            if (ret.code != 0) {
                Notification.error({
                    title: "错误",
                    message: ret.msg
                })
                return
            }

            await loadData();

            dialogOptionGroup.visible = false;
        } else {
            console.log('error submit!!');
            return false;
        }
    })
}

const handleEditApiTest = ()=>{
    refForm.value.validate(async (valid) => {
        if (valid) {

        } else {
            console.log('error submit!!');
            return false;
        }
    })
}

const handleEditApi = async () => {
    refForm.value.validate(async (valid) => {
        if (valid) {
            if (!dialogOptionApi.form.id) {
                const ret = await requestUtil.request("/admin/magic/magic/create", "post", {
                    ...dialogOptionApi.form,
                    parent_id: treeOption.selectedNode.id,
                    cls: CLS
                })

                if (ret.code != 0) {
                    Notification.error({
                        title: "错误",
                        message: ret.msg
                    })
                    return
                }
            } else {
                const ret = await requestUtil.request("/admin/magic/magic/update", "post", {
                    ...dialogOptionApi.form
                })

                if (ret.code != 0) {
                    Notification.error({
                        title: "错误",
                        message: ret.msg
                    })
                    return
                }
            }

            await loadData();

            dialogOptionApi.visible = false;
        } else {
            console.log('error submit!!');
            return false;
        }
    })

}

const handleNodeAdd = async () => {
    dialogOptionGroup.visible = true;
    dialogOptionGroup.form = {
        kind_type: 1
    }
    dialogOptionGroup.title = "添加分组";
}

const handleRemove = async (node, data) => {

    const ret = await requestUtil.request("/admin/magic/magic/delete", "post", {
        id: [data.id]
    });
    if (ret.code != 0) {
        Notification.error({
            title: "错误",
            message: ret.msg
        })
        return
    }
    await loadData()
    // 同时删除选项卡的
    useThat.deleteData(data)
    Notification.success(ret.msg)
}

const handleCommand = (command, node, data) => {
    if (command == "addGroup") {
        dialogOptionGroup.form = {
            kind_type: 1
        }
        dialogOptionGroup.visible = true;
        dialogOptionGroup.title = "添加分组";
        return
    }

    if (command == "editGroup") {
        dialogOptionGroup.visible = true;
        dialogOptionGroup.title = "编辑分组";
        nextTick(() => {
            dialogOptionGroup.form = data
        })
        return
    }

    if (command == "deleteGroup") {
        handleRemove(node, data)
        return
    }

    if (command == "add") {
        dialogOptionApi.form = {
            kind_type: 2,
            script: ` return "hello fnction" `,
            param: {}
        }
        dialogOptionApi.visible = true;
        dialogOptionApi.title = "添加数据源"
        return
    }

    if (command == "edit") {
        dialogOptionApi.visible = true;
        dialogOptionApi.title = "编辑数据源";
        nextTick(() => {
            dialogOptionApi.form = data;
        })

        return
    }
    if (command == "delete") {
        handleRemove(node, data)
        return
    }
}

// 树节点展开
const handleNodeExpand = (data) => {
    // 保存当前展开的节点
    let flag = false
    treeOption.defaultExpandIds.some(item => {
        if (item === data.id) { // 判断当前节点是否存在， 存在不做处理
            flag = true
            return true
        }
    })
    if (!flag) { // 不存在则存到数组里
        treeOption.defaultExpandIds.push(data.id)
    }
}

// 树节点关闭
const handleNodeCollapse = (data) => {
    // 删除当前关闭的节点
    treeOption.defaultExpandIds.some((item, i) => {
        if (item === data.id) {
            treeOption.defaultExpandIds.splice(i, 1)
        }
    })
    removeChildrenIds(data) // 这里主要针对多级树状结构，当关闭父节点时，递归删除父节点下的所有子节点
}

// 删除树子节点
const removeChildrenIds = (data) => {
    if (data.children) {
        data.children.forEach(function (item) {
            const index = treeOption.defaultExpandIds.indexOf(item.id)
            if (index > 0) {
                treeOption.defaultExpandIds.splice(index, 1)
            }
            removeChildrenIds(item)
        })
    }
}

</script>

<style lang="scss">
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    &:hover>.context-menu {
        display: inherit;
    }
}

.context-menu {
    float: right;
    display: none;
}
</style>
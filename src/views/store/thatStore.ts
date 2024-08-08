import { defineStore } from 'pinia'

export const thatStore = defineStore("thatMagicStore", () => {

    let thatOption = reactive({
        data: [] as any,
        selectedIndex: 0,
        dataSelected: null,
        baseURL: "admin"
    });

    const sizeOption = reactive({
        global: {
            height: 0,
            width: 0
        },
        footer: {
            height: 0,
            width: 0
        }
    })

    // 添加
    const add = (item) => {
        thatOption.data.push(item);
        thatOption.selectedIndex = thatOption.data.length - 1;
        thatOption.dataSelected = thatOption.data[thatOption.selectedIndex];
    }

    // 选择
    const selected = (item) => {
        const index = thatOption.data.findIndex((ele) => {
            return ele.id == item.id && ele["componentName"] == item["componentName"]
        });
        if (index < 0) {
            thatOption.data.push(item);
            thatOption.selectedIndex = thatOption.data.length - 1;
        } else {
            thatOption.selectedIndex = index;
        }
        thatOption.dataSelected = thatOption.data[thatOption.selectedIndex];
    }

    // 根据索引选中
    const selectedItemByIndex = (index) => {
        thatOption.selectedIndex = index;
        thatOption.dataSelected = thatOption.data[thatOption.selectedIndex];
    };

    // 移除
    const remove = (index) => {
        thatOption.data.splice(index, 1);
        thatOption.selectedIndex = index - 1;
        thatOption.dataSelected = thatOption.data[thatOption.selectedIndex];
    }

    // 删除
    const deleteData = (data) => {
        const findIndex = thatOption.data.findIndex((ele) => {
            return ele.id == data.id;
        })
        if (findIndex > -1) {
            thatOption.data.splice(findIndex, 1);
            thatOption.selectedIndex = findIndex - 1
            thatOption.dataSelected = thatOption.data[thatOption.selectedIndex];
        }
    }

    // 输出文本
    const setResponseText = (val) => {
        thatOption.dataSelected["response_text"] = val;
    }

    // 输出日志
    const setResponseLogs = (val) => {
        thatOption.dataSelected["response_logs"] = val;
    }


    return {
        thatOption,
        add,
        selected,
        remove,
        deleteData,
        sizeOption,
        selectedItemByIndex,
        setResponseText,
        setResponseLogs
    }
})
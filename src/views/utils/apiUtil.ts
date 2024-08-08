export default class apiUtil {
    static getTagColor = (name) => {
        let color = "";
        switch (name) {
            case "GET":
                color = `#0cbb52`;
                break
            case "POST":
                color = `#FFB400`;
                break
            case "PUT":
                color = `#FFB400`;
                break
            case "DELETE":
                color = `#EB2013`;
                break
            case "Fn":
                color = `#9012FE`;
                break
            case "Vue":
                color = `#0cbb52`;
                break
            case "Task":
                color = `#9012FE`;
                break
            case "DS":
                color = `#9012FE`;
                break
        }
        return color;
    }

    // 生成完整路径
    static fullUrl = (dataSource, targetItem) => {
        function findParentUrl(data, target) {
            for (const d of data) {
                if (d.id === target.id) {
                    // 找到匹配的节点，返回路径数组
                    return [d.key];
                }
                if (d.children) {
                    const pathInChild = findParentUrl(d.children, target);
                    if (pathInChild) {
                        // 在子节点中找到匹配的节点，将当前节点名添加到路径数组的前面
                        pathInChild.unshift(d.key);
                        return pathInChild;
                    }
                }
            }
            return null;
        }
        let path = findParentUrl(dataSource, targetItem);
        if (!path) {
            path = []
        }
        return path.join("/")
    }

    // 生成完整路径名称
    static fullName = (dataSource, targetItem) => {
        function findParentUrl(data, target) {
            for (const d of data) {
                if (d.id === target.id) {
                    // 找到匹配的节点，返回路径数组
                    return [d.name];
                }
                if (d.children) {
                    const pathInChild = findParentUrl(d.children, target);
                    if (pathInChild) {
                        // 在子节点中找到匹配的节点，将当前节点名添加到路径数组的前面
                        pathInChild.unshift(d.name);
                        return pathInChild;
                    }
                }
            }
            return null;
        }
        let path = findParentUrl(dataSource, targetItem);
        if (!path) {
            path = []
        }
        return path.join("/")
    }
}
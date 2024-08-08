请求接口返回
low.api.xxxx

环境变量
low.env.set("xxx","xxxx")
low.env.get("xxx","1111");// 获取不到值 取默认第二个值

URL变量
low.url.get("xxx","1111")

调用函数
low.event.trigger("xxx",{a:1,b:2})

组件
low.component.get("xxx")

const refTable = low.component.get("");

refTable.setData({
    list:[],
    total:1000
})

refTable.getData()

refTable.setProp({
    title:"你好啊"
})

refTable.getProp()

Cookies
low.cookies.get("xxxx","1111")

加密
CryptoJS

CryptoJS.md5("xxx",32)

加载

low.load.css("")
low.load.js("")




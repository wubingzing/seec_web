let Mock= require("mockjs")
let dayjs = require("dayjs")

//aa 拦截
let arr= [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
    }, {
    date: '2016-05-04',
    name: '张小虎',
    address: '上海市普陀区金沙江路 1517 弄'
    }, {
    date: '2016-05-01',
    name: '李小虎',
    address: '上海市普陀区金沙江路 1519 弄'
    }, {
    date: '2016-05-03',
    name: '赵小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}]
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options) //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
//正则
// Mock.mock(/\/api\/aa/,"get",(options)=>{
//     console.log(options) //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
Mock.mock("/api/all","get",(options)=>{
    console.log(10,options)
    return {
        status:200,
        message:"success",
        tabledata:arr
    }
})
Mock.mock("/api/add","post",(options)=>{
    let body = JSON.parse(options.body)
    body.date = dayjs(new Date(body.date)).format("YYYY-MM-DD")
    console.log(20,options)
    arr.push(body)
    return {
        status:200,
        message:"success",
        tabledata:arr
    }
})
Mock.mock(/\/api\/delete\?index=\d/,"delete",(options)=>{
    console.log(30,options)
    let url = options.url
    let index = url.split("=")[1]
    console.log(index)
    let newarr = arr.splice(index,1)
    console.log(newarr);
    return {
        status:200,
        message:"删除成功",
        data:arr
    }
})
Mock.mock("/api/update","put",(options)=>{
    console.log(40,options)
    let body = JSON.parse(options.body)
    console.log(body)
    let {date,name,address,index} = body
    arr[index].date = date
    arr[index].name = name
    arr[index].address = address
    return {
        status:200,
        message:"success",
        data:arr
    }
})
let Mock = require("mockjs")
Mock.mock("/api/login","post",(config)=>{
    console.log(config); //string
    let body = JSON.parse(config.body)
    console.log(5,body)
    let username = body.username
    let password = body.password
    if(username==='admin'&&password==="123456"){
        return {
            status:200,
            message:"success",
            data:{username,password,token:"520365wbx"}
        }
    }else{
        return {
            status:501,
            message:"fail"
        }
    }
   
})
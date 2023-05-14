/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-04-16 23:41:10
 * @Description: 
 */
const fs=require('fs');
const path=require("path");
const express=require("express");
const redir=path.resolve(__dirname,"../../control/");
const dir=fs.readdirSync(path.resolve(__dirname,'../../control'));
const fileList=[];
const modules={};
try{
    for(let i = 0;i<dir.length;i ++ ){
        if(fs.statSync(path.join(redir,dir[i])).nlink===1){
            fileList.push(fs.readFileSync(path.join(redir,dir[i])).toString());
        }
    }
    }catch(err){
        console.log(err)
    }
fileList.forEach((item)=>{
    const moduleName=item.match(/@Module:\w*/gi)
    const interfaceName=item.match(/@(GET|POST|PUT|DELETE):[\w]+(\/:\w+)?/gi);
    if(moduleName){
        const [,key]=moduleName[0].trim().split(':');
        Object.assign(modules,{[key]:interfaceName.map((v)=>{
            const params={
                type:'',
                path:'',
                method:''
            }
            if(/\/:\w/.test(v)){
                const [tp,...ph]=v.replace("@",'').split(":");
                params.path=ph.join('');
                params.type=tp;
                const [path,] =ph.splice('/');
                params.method=path.slice(0,-1)
                
            }else{
            const [type,name]= v.replace('@','').split(':');
                params.method=name,
                params.path=name,
                params.type=type;
            }
            return params;
        })})
    }
})
module.exports=modules;
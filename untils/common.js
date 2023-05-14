/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-13 17:58:06
 * @Description: 通用方法
 */
const fs=require("fs");
const path=require("path")
//发送错误
const ErrorMap=require('../constant/tips')

exports.sendRes=(doc,res)=>{
    
    doc.catch((err)=>{
        res.status(200).send({...err,data:null});
    })
}
//发送错误对象
exports.getErr=(code,err)=>{
    return {
        code,
        err: err?err:ErrorMap[code]
    }
}
//随机选择字母和数字
exports.randomCode=(num)=>{
    const result=[];
    while(result.length <= num){
    if(Math.floor(Math.random() * 10)  >5){
        let ranNum=Math.ceil(Math.random() * 25);
        result.push(String.fromCharCode(65 + ranNum));
    }else{
            result.push(Math.floor(Math.random() * 10))
        }
    }
    return result.join('');
}
//获取有效参数
exports.getParams=(obj)=>{
    const parmas=obj;
    for (let key in parmas) {
      if (!parmas[key]) {
        delete parmas[key];
      }
    }
    return parmas;
  }
  //深拷贝
exports.deepClone=(obj)=>{
    //获取对象所有的可枚举和不可枚举的键值
    const list=Reflect.ownKeys(obj);
    const result={};
    list.forEach((item)=>{
        //获取原对象属性的描述
        const desc=Object.getOwnPropertyDescriptor(obj,item);
        //基本类型数据
        if(typeof desc.value!=="object"){
            Object.defineProperty(result,item,desc);
        //引用类型
        } else{
            let t=null;
            switch(toString.call(desc.value)){
                //数组
                case '[object Array]':
                    //生成新的数组
                    t=[...desc.value]
                    break;
                //正则
                case '[object RegExp]':
                // 通过desc.value.source可拿到正则的内容
                // 通过desc.value.flags可拿到正则的修饰符
                  t=new RegExp(desc.value.source,desc.value.flags)
                  break;
                //对象
                case '[object Object]':
                t= deepClone(desc.value);
                  break;
                //时间
                case '[object Date]':
                  t=new Date(desc.value)
                  break;
            }
            Object.defineProperty(result,item,{
                ...desc,
                value:t
            })
          
        }
    })
    return result;
}
//获取特点注释方法
exports.moduleSerive=(type,name)=>{
let fileContent='';
let list=[];
try{
    fileContent=fs.readFileSync(path.join(__dirname,'../control',type,`${name}.js`)).toString()
    const interfaceName=fileContent.match(/@(GET|POST|PUT|DELETE):[\w]+(\/:\w+)?/gi);
    if(interfaceName){
     list= interfaceName.map((v)=>{
           const params={
                type:'',
                path:'',
                method:''
            }
            if(/\/:\w/.test(v)){
                const [tp,...ph]=v.replace("@",'').split(":");
                params.path=ph.reduce((pre,doc,index)=>{
                    console.log(doc)
                    if(index===ph.length - 1){
                        return `${pre}:${doc}`;
                    }              
                    return pre + doc;      
                });
                params.type=tp;
                const [path,] =ph.splice('/');
                params.method=path.slice(0,-1)
                
            }else{
            const [type,name]= v.replace('@','').split(':');
                params.method=name,
                params.path=name,
                params.type=type
            }
            return params;
        })
    }
    }catch(err){
        console.log(err)
    }

return list;
}
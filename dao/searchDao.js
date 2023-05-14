/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-08 22:37:52
 * @Description: 
 */
const { ObjectId } = require("mongodb");
const productDao=require("../model/product");
const {getParams}=require("../untils/parameter")

module.exports={
    find:(params)=>{
        const data=getParams(params);
        const filter=[]
        const match={};
        const range={}
        if(data?.keyword){
            Object.assign(match,{
                productTitle:{
                    $regex:new RegExp(data?.keyword)
                },
            })
        }
        Object.keys(data).forEach((item)=>{
             if( ['freightFree','notReason','allergyTurn','priceEnsure','freightInspection','newItem'].includes(item)){
                Object.assign(match,{[item]:eval(data[item])})
             }
             if(['brand','color','address','location'].includes(item)){
                if(data[item].indexOf(',')!==-1){
                Object.assign(match,{[item]:{
                            $in:data[item].split(',')
                        }})
                }else{
                    Object.assign(match,{[item]:data[item]})
                }
              
             }
        }) 
        if(data?.minPrice){
            Object.assign(range,{ $gte:+data.minPrice});
        }
        if(data?.maxPrice){
            Object.assign(range,{$lte:+data.maxPrice});
        }
        if(Object.keys(range).length>0){
            Object.assign(match,{discountPrice:range});
        }
        if(data?.categoryId){
            Object.assign(match,{categoryId:data?.categoryId});
        }
        if(Object.keys(match).length>0){
            filter.push({$match:match});
        }
        // filter.push( {
        //         $group: {
        //         _id: "$_id",
        //         colorList: { $push: "$color" },
        //         brandList:{ $push: "$brand" },
        //         locationList:{$push:'$location'},
        //         address:{$push:'$address'}
        //         }
        //     })
        // filter.push({
        //      $count: "totalCount"
        // })
      
        // if(data.sort){
        //         filter.push(
        //             {
        //                 $sort:{
        //                     discountPrice:data.sort==='max'?'1':'-1'
        //                 }
        //             }
        //         )
        // }
        // filter.push({
        //     $skip:(page - 1) * size
        // },{
        //     $limit:+size
        // })
      return filter;
    },
    search:async function(page,size,params){
        const data={};
         const filter=this.find(params);
         const itemFilter=[...filter];
         const group=[...filter,{$group:{
            _id:null,
            colorList: { $push: "$color" },
            brandList:{ $push: "$brand" },
            locationList:{$push:'$location'},
            addressList:{$push:'$address'}
         }}]
          if(params.sort){
                itemFilter.push(
                    {
                        $sort:{
                            discountPrice:params.sort==='max'?-1:1
                        }
                    }
                )
        }
        itemFilter.push({
            $skip:(page - 1) * size
        },{
            $limit:+size
        })
        console.log(itemFilter);
        console.log('--------------------')
         const itemList=await productDao.aggregate(itemFilter);
         Object.assign(data,{itemList})
         const typeList=(await productDao.aggregate(group))[0] || [];
         if(typeList){
         Object.assign(data,{
            filter:Object.keys(typeList).reduce((pre,item)=>{
            if(item && item!=='_id'){
                return {...pre,[item]:[...new Set(typeList[item])]}
            }
            return pre
         },{})
         })
        }
        const totalCount=await productDao.aggregate([...filter,{
            $count: "totalCount"
         }])
         console.log(totalCount);
         console.log("条目")
         Object.assign(data,{total:totalCount.length > 0?totalCount[0].totalCount:0})
         return data;
    }
}

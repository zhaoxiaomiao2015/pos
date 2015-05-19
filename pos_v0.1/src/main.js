//TODO: Please write code in this file.
function printInventory(inputs) {
    var head= '***<没钱赚商店>购物清单***\n';
    var conter = '----------------------\n';
    var sum = 0;
    var footte = '**********************';
    var array = [];
    for(var j=0; j<inputs.length; j++){
        var flag = false;
        for(var x=0; x<array.length; x++){
            if(inputs[j].name == array[x].name){
                array[x].count++;
                flag = true;
            }
        }
        if(!flag){
            var temp = {};
            temp.name = inputs[j].name;
            temp.unit = inputs[j].unit;
            temp.price = inputs[j].price;
            temp.count = 1;
            array.push(temp);
        }
    }


    for(var i=0; i< array.length; i++){
        //得到数组i个子集和array[i]
        //取得子集和的每个元素 如：取到名称--array[i].name;
        head = head + '名称：'+array[i].name+'，'+'数量：'+array[i].count+array[i].unit+'，单价：'+array[i].price.toFixed(2)+'(元)，小计：'+(array[i].price*array[i].count).toFixed(2)+'(元)\n';
        sum = sum + array[i].price*array[i].count;
    }
    var result = head + conter + '总计：' + sum.toFixed(2) + '(元)\n' +   footte;
    console.log(result);



}

//TODO: Please write code in this file.
function printInventory(inputs) {
    var head= '***<没钱赚商店>购物清单***\n';
    var conter = '----------------------\n';
    var sum = 0;
    var footte = '**********************';

    for(var i=0; i< inputs.length; i++){
        //得到数组i个子集和inputs[i]
        //取得子集和的每个元素 如：取到名称--inputs[i].name;
    //    head = head + '名称：'+inputs[i].name+' ,'+'数量：'+inputs[i].count+'瓶，单价：'+inputs[i].price.toFixed(2)+'(元)，小计：'+(inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';
        head = head + '名称：'+inputs[i].name+'，'+'数量：'+inputs[i].count+inputs[i].unit+'，单价：'+inputs[i].price.toFixed(2)+'(元)，小计：'+(inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';
        sum = sum + inputs[i].price*inputs[i].count;
    }
    var result = head + conter + '总计：' + sum.toFixed(2) + '(元)\n' +   footte;
    console.log(result);


}

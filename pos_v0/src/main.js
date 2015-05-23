//TODO: Please write code in this file.
function printInventory(inputs) {
    var head= '***<没钱赚商店>购物清单***\n';
    var conter = '----------------------\n';
    var sum = 0;
    var footte = '**********************';

    for(var i=0; i< inputs.length; i++){
        head = head + '名称：'+inputs[i].name+'，'+
        '数量：'+inputs[i].count+inputs[i].unit+
        '，单价：'+inputs[i].price.toFixed(2)+
        '(元)，小计：'+(inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';
        sum = sum + inputs[i].price*inputs[i].count;
    }
    
    var result = head + conter + '总计：' + sum.toFixed(2) + '(元)\n' +   footte;
    console.log(result);


}

//TODO: Please write code in this file.
function printInventory(inputs) {

    var head= '***<没钱赚商店>购物清单***\n';
    var conter = '----------------------\n';
    var sum = 0;
    var footte = '**********************';
    //取到全部商品信息数组
    var allCommoditiesArray = [];
    allCommoditiesArray = loadAllItems();
    //1、根据购物车中的条形码去取该商品的详细信息,构建一个新的数组
    var selectedCommodities = [];
    for(var x=0; x<inputs.length; x++){
        for (var y = 0; y < allCommoditiesArray.length; y++) {
            if(inputs[x] == allCommoditiesArray[y].barcode){//已选择的商品跟仓库中的商品对上了，则取出该商品的详细信息
                var temp = {};
                temp.barcode = allCommoditiesArray[y].barcode;
                temp.name = allCommoditiesArray[y].name;
                temp.unit = allCommoditiesArray[y].unit;
                temp.price = allCommoditiesArray[y].price;
                selectedCommodities.push(temp);
                break;
            }
        }
    }

    //2、统计购物车中每件商品的数量(去重)
    resultArray = [];
    for (var i = 0; i < selectedCommodities.length; i++) {
        var exist = false;
        for(var j=0; j<resultArray.length; j++){
            if(selectedCommodities[i].barcode == resultArray[j].barcode){
                resultArray[j].count++;
                exist = true;
            }
        }
        if(!exist){
            var temp2 = {};
            temp2.barcode = selectedCommodities[i].barcode;
            temp2.name = selectedCommodities[i].name;
            temp2.unit = selectedCommodities[i].unit;
            temp2.price = selectedCommodities[i].price;
            temp2.count = 1;
            resultArray.push(temp2);
        }
    }
    //3、输出信息
    for(var k=0; k< resultArray.length; k++){
        //得到数组i个子集和resultArray[i]
        //取得子集和的每个元素 如：取到名称--resultArray[i].name;
        head = head + '名称：'+resultArray[k].name+'，'+'数量：'+resultArray[k].count+resultArray[k].unit+'，单价：'+resultArray[k].price.toFixed(2)+'(元)，小计：'+(resultArray[k].price*resultArray[k].count).toFixed(2)+'(元)\n';
        sum = sum + resultArray[k].price*resultArray[k].count;
    }
    var result = head + conter + '总计：' + sum.toFixed(2) + '(元)\n' +   footte;
    console.log(result);
}

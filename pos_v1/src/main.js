//TODO: Please write code in this file.
function printInventory(inputs) {
    //去重
    var newInputs = [];
    function repeat(inputs){
        for (var i = 0; i < inputs.length; i++) {
            var exist = false;
            for (var j = 0; j < newInputs.length; j ++) {
                if (inputs[i] === newInputs[j].barcode) {
                    newInputs[j].count ++;
                    exist = true;
                }
            }
            if (!exist) {
                var newItems = {};
                newItems.barcode = inputs[i];
                newItems.count = 1;
                newInputs.push(newItems);
            }
        }
    }
    //调用去重方法
    repeat(inputs);
    //标准化条形码 //因为要改变原来数组的count的值，所以不用函数
    // cutBarcode(newInputs);
    // var finalInputsArray = []; //不改变原有数组，建立新数组存放改变后的数组
    // function cutBarcode(newInputs){
    //     for ( i = 0; i < newInputs.length; i++) {
    //         var flag = false;
    //         var exist = newInputs[i].barcode.indexOf('-');
    //         if (exist != -1) {
    //             var items2 = {};
    //             items2.barcode = newInputs[i].barcode.substring(0,exist);
    //             items2.count = newInputs[i].barcode.substring(exist);
    //             finalInputsArray.push(items2);
    //             flag = true;
    //         }
    //         if (flag) {
    //             items = {};
    //             items.barcode = newInputs[i].barcode;
    //             items = newInputs[i].count;
    //             finalInputsArray.push(items);
    //         }
    //     }
    // }
    //标准化条形码
    for (i = 0; i < newInputs.length; i ++) {
        var exist = newInputs[i].barcode.indexOf('-');
        if (exist != -1) {
            var temp = newInputs[i].barcode.split('-')
            newInputs[i].count = temp[1];
            newInputs[i].barcode = temp[0];
        }
    }

    //  console.log(newInputs);
    //根据条形码去取全部信息
    //拿到仓库全部信息
    var allCommoditiesArray = loadAllItems();
    var fullInformationArray = [];

        for (i = 0; i < newInputs.length; i++) {
        for ( j=0; j<allCommoditiesArray.length; j++) {
            if (newInputs[i].barcode === allCommoditiesArray[j].barcode) {
                var items = {};
                items.barcode = allCommoditiesArray[j].barcode;
                items.name = allCommoditiesArray[j].name;
                items.unit = allCommoditiesArray[j].unit;
                items.price = allCommoditiesArray[j].price;
                items.count = newInputs[i].count;
                fullInformationArray.push(items);
                }
            }
        }

    // console.log(fullInformationArray);
    //处理优惠信息
    // 取到有优惠商品的条形码
    var preferentialGoodsBarcodeArray = loadPromotions();
    //多个是考虑用循环来取
    preferentialGoodsBarcode = preferentialGoodsBarcodeArray[0].barcodes;
    var preferentialBeforeSubtotal = 0;
    var preferentianlAfterSubtotal = 0;
    var allGoodsOutput = "";
    var preferentialGoodsResult = "";
    var sum = 0;
    var save = 0;
    for (i = 0; i < fullInformationArray.length; i++) {
        subtotal = fullInformationArray[i].price *fullInformationArray[i].count;
        for (j = 0; j< preferentialGoodsBarcode.length; j++) {
            if (fullInformationArray[i].barcode === preferentialGoodsBarcode[j]) {
                //计算商品价格（买二送一）
                 subtotal = fullInformationArray[i].price *(fullInformationArray[i].count - Math.floor(fullInformationArray[i].count/3));
                 break;
            }
        }

        //输出完整信息
        allGoodsOutput += '名称：'+fullInformationArray[i].name+
                        '，数量：'+fullInformationArray[i].count+fullInformationArray[i].unit+
                        '，单价：'+fullInformationArray[i].price.toFixed(2)+'(元)，'+
                        '小计：'+subtotal.toFixed(2)+'(元)\n';
        sum += subtotal;
        //输出优惠信息
        if (fullInformationArray[i].barcode === preferentialGoodsBarcode[j]) {
            var giveNumber =  Math.floor(fullInformationArray[i].count/3);
            preferentialGoodsResult += '名称：'+fullInformationArray[i].name+
                                    '，数量：'+giveNumber+fullInformationArray[i].unit+'\n';
            save += fullInformationArray[i].price * giveNumber;
        }
    }
    //输出总计信息
    var res = '总计：'+sum.toFixed(2)+'(元)\n' +
    '节省：'+save.toFixed(2)+'(元)\n';

    //输出
    console.log('***<没钱赚商店>购物清单***\n' +
     allGoodsOutput +'----------------------\n' +
     '挥泪赠送商品：\n' +
     preferentialGoodsResult +
     '----------------------\n' +
     res +
     '**********************');





    }

//TODO: Please write code in this file.
function printInventory(inputs) {

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

    repeat(inputs);

    for (i = 0; i < newInputs.length; i ++) {
        var exist = newInputs[i].barcode.indexOf('-');
        if (exist != -1) {
            var temp = newInputs[i].barcode.split('-');
            newInputs[i].count = temp[1];
            newInputs[i].barcode = temp[0];
        }
    }

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

    var preferentialGoodsBarcodeArray = loadPromotions();
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

        allGoodsOutput += '名称：'+fullInformationArray[i].name+
                        '，数量：'+fullInformationArray[i].count+fullInformationArray[i].unit+
                        '，单价：'+fullInformationArray[i].price.toFixed(2)+'(元)，'+
                        '小计：'+subtotal.toFixed(2)+'(元)\n';
        sum += subtotal;

        if (fullInformationArray[i].barcode === preferentialGoodsBarcode[j]) {
            var giveNumber =  Math.floor(fullInformationArray[i].count/3);
            preferentialGoodsResult += '名称：'+fullInformationArray[i].name+
                                    '，数量：'+giveNumber+fullInformationArray[i].unit+'\n';
            save += fullInformationArray[i].price * giveNumber;
        }
    }

    var res = '总计：'+sum.toFixed(2)+'(元)\n' +
    '节省：'+save.toFixed(2)+'(元)\n';

    console.log('***<没钱赚商店>购物清单***\n' +
     allGoodsOutput +'----------------------\n' +
     '挥泪赠送商品：\n' +
     preferentialGoodsResult +
     '----------------------\n' +
     res +
     '**********************');
    }

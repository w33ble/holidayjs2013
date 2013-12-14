var gridRunner = function (lat, lon, cb, rowcb){
    for (var i = 1; i <= lat; i++ ){
        var myRow = [];
        for (var x = 1; x <= lon; x++ ){
            var item = cb(i,x);
            if(!item){
                continue;
            }
            
            myRow[x] = item;
            return item;
        }
        if(rowcb){
            rowcb(myRow);
        }
    }
};

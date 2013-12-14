var gridRunner = function (lat, lon, cb){
    for (var i = 1; i <= lat; i++ ){
        for (var x = 1; x <= lon; x++ ){
            var item = cb(i,x);
            if(!item){
                continue;
            }
            
            return item;
        }
    }
};


App.AppView = Backbone.View.extend({
  initialize: function() {
    var pieces      = new App.Pieces();
    var boardWidth  = 8;
    var boardHeight = 8;

    this.populateGrid(boardWidth, boardHeight, function(lat, lon) {
      var piece = new App.Piece({
        lat: lat,
        lon: lon,
        maxWidth: boardWidth,
        maxHeight: boardHeight
      });

      pieces.add(piece);

      var pieceView = new App.PieceView({
        model: piece
      });

      $('#grid').append(pieceView.render().el);

    });
  },

  populateGrid: function(lat, lon, cb) {
    console.log('creating pieces');
    for (var i = 0; i < lat; i++ ){
      for (var x = 0; x < lon; x++ ){
        var item = cb(i,x);
        if(!item){
          continue;
        }

        return item;
      }
    }
  }

});

var app = new App.AppView();
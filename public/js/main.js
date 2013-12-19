App.Vent = _.extend({}, Backbone.Events);

App.AppView = Backbone.View.extend({
  clickCount: 0,
  swapPieces: [],

  initialize: function() {
    var pieces      = new App.Pieces();
    var boardWidth  = 8;
    var boardHeight = 8;

    // initialize players
    this.playersView = new App.PlayersView();

    this.listenTo(App.Vent, 'piece:click', this.handleClick);

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

  handleClick: function (pieceView) {
    if (this.swapPieces.length && this.swapPieces[0].cid == pieceView.cid) {
      this.swapPieces = [];
      --this.clickCount;
      pieceView.deactivate();
    } else {
      this.swapPieces.push(pieceView);
      pieceView.activate();
    }

    if(this.clickCount%2) { //second click, time to swap
      latLon0 = {
        lat: this.swapPieces[0].model.get('lat'),
        lon: this.swapPieces[0].model.get('lon')
      };
      latLon1 = {
        lat: this.swapPieces[1].model.get('lat'),
        lon: this.swapPieces[1].model.get('lon')
      };
      // test for legal move
      // TODO test that different types of pieces were clicked
      latMove = Math.abs(latLon0.lat-latLon1.lat);
      lonMove = Math.abs(latLon0.lon-latLon1.lon);
      if ((latMove == 1 && lonMove == 0) || (latMove == 0 && lonMove == 1)) {
        this.swapPieces[0].model.set(latLon1);
        this.swapPieces[1].model.set(latLon0);

        // TODO: check for points & animate

        // next player's turn
        App.Vent.trigger('turns:change', this);

      } else {
        _.each(this.swapPieces, function(piece) {
          piece.deactivate();
        });
        alert('illegal move', latMove, lonMove);
      }
      this.swapPieces = [];
    }

    this.clickCount++;
  },

  populateGrid: function(lat, lon, cb) {
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

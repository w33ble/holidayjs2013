App.Vent = _.extend({}, Backbone.Events);
App.firebaseUrl = 'https://holiday-js-hackathon-2013.firebaseio.com/games/';
App.gameInstance = '';

App.AppView = Backbone.View.extend({
  boardWidth:  8,
  boardHeight: 8,
  clickCount:  0,
  swapPieces:  [],

  initialize: function() {
    this.$gridView = $('#grid');
    var games = new App.Games();

    this.listenTo(App.Vent, 'piece:click', this.handleClick);
    this.listenToOnce(games, 'game:ready', this.setGameInstance);
    // TODO: add event listener to Players, on add either create board or show waiting message
  },

  setGameInstance: function(game) {
    this.game = game;
    App.gameInstance = game.id + '/';
    // TODO: add player to Players collection
    this.initBoard();
  },

  initBoard: function() {
    // initialize players
    this.playersView = new App.PlayersView();

    this.listenTo(App.Vent, 'piece:click', this.handleClick);

    // init pieces, fetches from Firebase automatically
    var pieces = new App.Pieces();

    if (pieces.length === 0) {
      this._createBoard(pieces);
    }

    pieces.each(function(piece) {
      var pieceView = new App.PieceView({
        model: piece
      });

      this.$gridView.append(pieceView.render().el);
    }, this);
  },

  _createBoard: function(pieces) {
    for (var lat = 0; lat < this.boardWidth; lat++ ){
      for (var lon = 0; lon < this.boardHeight; lon++ ){
        var piece = new App.Piece({
          lat: lat,
          lon: lon,
          maxWidth: this.boardWidth,
          maxHeight: this.boardHeight
        });
        pieces.add(piece);
      }
    }
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
      if ((latMove === 1 && lonMove === 0) || (latMove === 0 && lonMove === 1)) {
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
  }

});

new App.AppView();

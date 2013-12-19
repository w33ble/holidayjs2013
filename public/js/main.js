App.Vent = _.extend({}, Backbone.Events);

App.AppView = Backbone.View.extend({
  players: null,
  clickCount: 0,
  swapPieces: [],
  turns: 0,

  initialize: function() {
    var dinoPlayer  = new App.Player({slot: 0, name: 'Dino'});
    var birdPlayer  = new App.Player({slot: 1, name: 'Bird'});
    var pieces      = new App.Pieces();
    var boardWidth  = 8;
    var boardHeight = 8;

    this.setupPlayers([dinoPlayer, birdPlayer]);

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

    // start the game
    $('.turnIndicator').show();
  },

  setupPlayers: function (players) {
      var currentPlayer;

      this.players = new App.Players();
      for (var i = 0; i < players.length; i++) {
          // add player to the collection
          this.players.add(players[i]);

          // set player view with the model
          var playerView = new App.PlayerView({
              model: this.players.at(i)
          });
      }
      // set the first players turn
      // this.playerViews[0].model.set('turn', 1);
      this.players.at(0).set('turn', 1);
  },

  nextTurn: function () {
    var currentIndex = this.turns % 2,
        currentPlayer = this.players.at(currentIndex),
        nextIndex = (this.turns + 1) % 2,
        nextPlayer = this.players.at(nextIndex)

    this.turns++;

    // update the current player's score
    currentPlayer.set('score', currentPlayer.get('score') + 1);

    // begin next player's turn
    nextPlayer.set('turn', nextPlayer.get('turn') + 1);

    // TODO disable clicks if it's not the local player's turn
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
        this.nextTurn();
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

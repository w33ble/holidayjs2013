App.Vent = _.extend({}, Backbone.Events);

App.AppView = Backbone.View.extend({
  players: null,
  playerViews: [],
  clickCount: 0,
  swapPieces: [],
  turns: 0,

  initialize: function() {
    var dinoPlayer  = new App.Player({name: 'Dino'});
    var birdPlayer  = new App.Player({name: 'Bird'});
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
          currentPlayer = players[i]; // cache

          // set default fields on the player models
          currentPlayer.set('slot', i);
          currentPlayer.set('score', 0);

          // set player view with the model
          var playerView = new App.PlayerView({
              model: currentPlayer
          });

          this.playerViews.push(playerView);

          // add player to the collection
          this.players.add(currentPlayer);
      }
      // set the first players turn
      this.playerViews[0].updateTurn();
  },

  nextTurn: function () {
    var currentIndex,
        currentPlayer,
        nextIndex;

    // update the current player's score
    currentIndex = this.turns % 2;
    currentPlayer = this.playerViews[currentIndex].model;
    currentPlayer.set('score', currentPlayer.get('score') + 1); // is there an easier way to increment the fake score?
    this.playerViews[currentIndex].updateScore();

    // begin next player's turn
    this.turns++;
    nextIndex = this.turns % 2;
    this.playerViews[nextIndex].updateTurn();

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

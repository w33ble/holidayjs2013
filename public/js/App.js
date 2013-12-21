App.Game = Backbone.Model.extend({});
;App.Piece = Backbone.Model.extend({
  pieceTypes: [
    {
      name: 'blue',
      img: 'img/gift-icon1.png'
    },
    {
      name: 'red',
      img: 'img/gift-icon2.png'
    },
    {
      name: 'yellow',
      img: 'img/gift-icon3.png'
    },
    {
      name: 'snowman',
      img: 'img/gift-icon4.png'
    }
  ],

  initialize: function() {
    // new model, choose random piece
    if (! this.id) {
      var pack = this.pieceTypes[Math.floor(Math.random() * this.pieceTypes.length)];
      this.set('name', pack.name);
      this.set('img', pack.img);
    }
  },
});
;App.Player = Backbone.Model.extend({
  defaults: {
    score: 0,
    isMyTurn: false
  }
});
;App.Games = Backbone.Firebase.Collection.extend({
  model: App.Game,
  initialize: function() {
    this.firebase = App.firebaseUrl;
    this.activeGame = false;
    this.listenTo(this, 'sync', _.bind(this._triggerActiveGame, this));
  },

  _triggerActiveGame: function(games) {
    if (games.length === 0) {
      this.createGame();
      this.activeGame = this.at(this.length-1);
    } else {
      games.each(function(game) {
        var players = game.get('players');
        if (players == null || players.length < 2) {
          activeGame = game;
          this.activeGame = game;
        }
      }, this);

      if (! this.activeGame) {
        this.createGame();
        this.activeGame = this.at(this.length-1);
      }
    }

    this.trigger('game:ready', this.activeGame);
  },

  createGame: function() {
    this.push({});
  }
});;App.Pieces = Backbone.Firebase.Collection.extend({
  model: App.Piece,
  initialize: function() {
    this.firebase = App.firebaseUrl + App.gameInstance + 'pieces/';
  }
});;App.Players = Backbone.Firebase.Collection.extend({
  model: App.Player,
  initialize: function() {
    this.firebase = App.firebaseUrl + App.gameInstance + 'players/';
  }
});
;App.PieceView = Backbone.View.extend({
  className: 'piece',

  events: {
    'click': 'swapHandler'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.movePiece);
  },

  setClasses: function() {
    for(var i=0; i<this.model.get('maxWidth'); i++) {
      this.$el.removeClass('row'+i);
    }
    for(var i=0; i<this.model.get('maxHeight'); i++) {
      this.$el.removeClass('col'+i);
    }
    this.$el.addClass('row' + this.model.get('lat'));
    this.$el.addClass('col' + this.model.get('lon'));
  },

  render: function() {
    this.setClasses();
    var image = this.model.get('img');
    this.$el.css('background-image', 'url('+image+')');
    return this;
  },

  swapHandler: function() {
    App.Vent.trigger('piece:click', this);
  },

  activate: function() {
    this.$el.addClass('active');
  },

  deactivate: function() {
    this.$el.removeClass('active');
  },

  movePiece: function(model) {
    this.setClasses();
    this.deactivate();
  }

});
;App.PlayerView = Backbone.View.extend({
  el: null,
  $scoreContainer: null,

  initialize: function () {
    // set ui element attributes
    this.$el = $('#player' + this.model.get('slot'));
    this.$scoreContainer = this.$el.find('.score .scoreNumber');

    // attach listeners
    this.listenTo(this.model, 'change:score', this.updateScore);
    this.listenTo(this.model, 'change:isMyTurn', this.updateTurn);
  },

  updateScore: function (model) {
    this.$scoreContainer.html(model.get('score'));
  },

  updateTurn: function (model) {
    // change border
    this.$el.toggleClass('active', model.get('isMyTurn'));
  }
});
;App.PlayersView = Backbone.View.extend({
  el: '.turnIndicator',
  turns: 0,

  defaults: {
    playerNames: ['Dino', 'Bird']
  },

  initialize: function() {
    // create player models and add to collection
    // _.each(this.defaults.playerNames, function (playerName, index) {
    //   var player = new App.Player({slot: index, name: playerName});
    //   this.collection.add(player);
    // }, this);

    // initialize player views
    this.collection.each(function (player) {
      var playerView = new App.PlayerView({
        model: player
      });
    });

    this.listenTo(App.Vent, 'turns:change', this.nextTurn);

    // start the game
    this.$el.find('.name').html(this.collection.at(0).get('name')); // set player1 name
    this.collection.at(0).set('isMyTurn', true); // start player1 turn
    this.$el.show(); // show the turn indicator
  },

  nextTurn: function () {
    var currentIndex = this.turns % 2,
      currentPlayer = this.collection.at(currentIndex),
      nextIndex = (this.turns + 1) % 2,
      nextPlayer = this.collection.at(nextIndex);

    this.turns++;

    // end current player's turn
    currentPlayer.set('isMyTurn', false);
    currentPlayer.set('score', currentPlayer.get('score') + 1); // TODO: this is mock scorekeeping

    // begin next player's turn
    nextPlayer.set('isMyTurn', true);
    this.$el.find('.name').html(nextPlayer.get('name'));

    // TODO disable clicks if it's not the local player's turn
  }
});

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
});;App.PieceView = Backbone.View.extend({
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

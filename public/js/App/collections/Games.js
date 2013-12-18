App.Games = Backbone.Firebase.Collection.extend({
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
});
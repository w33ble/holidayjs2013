App.PlayersView = Backbone.View.extend({
  el: '.turnIndicator',
  turns: 0,

  defaults: {
    playerNames: ['Dino', 'Bird']
  },

  initialize: function() {
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
    // TODO: this is mock scorekeeping
    currentPlayer.set('score', currentPlayer.get('score') + 1);

    // begin next player's turn
    nextPlayer.set('isMyTurn', true);
    this.$el.find('.name').html(nextPlayer.get('name'));

    // TODO disable clicks if it's not the local player's turn
  }
});

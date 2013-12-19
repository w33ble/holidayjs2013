App.PlayersView = Backbone.View.extend({
    turns: 0,

    nextTurn: function () {
      var currentIndex = this.turns % 2,
          currentPlayer = this.collection.at(currentIndex),
          nextIndex = (this.turns + 1) % 2,
          nextPlayer = this.collection.at(nextIndex)

      this.turns++;

      // update the current player's score
      currentPlayer.set('score', currentPlayer.get('score') + 1);

      // begin next player's turn
      nextPlayer.set('turn', nextPlayer.get('turn') + 1);

      // TODO disable clicks if it's not the local player's turn
    },

    initialize: function() {
        var dinoPlayer = new App.Player({slot: 0, name: 'Dino'}); // not sure if this should be more abstract
        var birdPlayer = new App.Player({slot: 1, name: 'Bird'});

        // track a collection of players
        this.collection = new App.Players();
        this.collection.add(dinoPlayer);
        this.collection.add(birdPlayer);

        // initialize player views
        this.collection.each(function (player) {
            var playerView = new App.PlayerView({
                model: player
            });
        });

        this.listenTo(App.Vent, 'turns:change', this.nextTurn);

        // start the game
        this.collection.at(0).set('turn', 1);
        $('.turnIndicator').show();
    }
});

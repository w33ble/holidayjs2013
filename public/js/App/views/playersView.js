App.PlayersView = Backbone.View.extend({
    el: '.turnIndicator',
    turns: 0,

    defaults: {
        playerNames: ['Dino', 'Bird']
    },

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

        // update name of who's turn it is
        this.$el.find('.name').html(nextPlayer.get('name'));

      // TODO disable clicks if it's not the local player's turn
    },

    initialize: function() {
        this.collection = new App.Players();

        // create player models and add to collection
        _.each(this.defaults.playerNames, function (playerName, index) {
            var player = new App.Player({slot: index, name: playerName})
            this.collection.add(player);
        }, this);

        // initialize player views
        this.collection.each(function (player) {
            var playerView = new App.PlayerView({
                model: player
            });
        });

        this.listenTo(App.Vent, 'turns:change', this.nextTurn);

        // start the game
        this.$el.find('.name').html(this.collection.at(0).get('name')); // set player1 name
        this.collection.at(0).set('turn', 1); // add turn to player1
        this.$el.show(); // show the turn indicator
    }
});

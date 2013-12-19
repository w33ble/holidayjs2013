App.PlayersView = Backbone.View.extend({
    initialize: function() {
        // initialize player views
        this.collection.each(function (player) {
            var playerView = new App.PlayerView({
                model: player
            });
        });

        this.collection.at(0).set('turn', 1);
    }
});

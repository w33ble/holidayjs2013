App.PlayerView = Backbone.View.extend({
    el: null,
    $scoreContainer: null,
    $nameContainer: $('.turnIndicator .name'),

    updateScore: function () {
        this.$scoreContainer.html(this.model.get('score'));
    },

    updateTurn: function () {
        // set name
        this.$nameContainer.html(this.model.get('name'));

        // change border
        $('.playerPic').removeClass('active');
        this.$el.addClass('active');
    },

    initialize: function () {
        this.$el = $('#player' + this.model.get('slot'));
        this.$scoreContainer = this.$el.find('.score .scoreNumber');
    }
});

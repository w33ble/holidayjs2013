App.PlayerView = Backbone.View.extend({
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

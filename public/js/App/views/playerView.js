App.PlayerView = Backbone.View.extend({
  el: null,
  $scoreContainer: null,

  updateScore: function () {
    this.$scoreContainer.html(this.model.get('score'));
  },

  updateTurn: function () {
    // change border
    this.$el.toggleClass('active', this.model.get('isMyTurn'));
  },

  initialize: function () {
    // set ui element attributes
    this.$el = $('#player' + this.model.get('slot'));
    this.$scoreContainer = this.$el.find('.score .scoreNumber');

    // attach listeners
    this.listenTo(this.model, 'change:score', this.updateScore);
    this.listenTo(this.model, 'change:isMyTurn', this.updateTurn);
  }
});

App.PieceView = Backbone.View.extend({
  initialize: function() {
    console.log(this.model);
    console.log(this.model.get('name'), this.model.get('img'));
  }
});

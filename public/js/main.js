App.AppView = Backbone.View.extend({
  initialize: function() {
    var Pack = new App.Piece();
    var pack = new App.PieceView({model: Pack});
  }
});

var app = new App.AppView;
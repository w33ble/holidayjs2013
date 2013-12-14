App.AppView = Backbone.View.extend({
  initialize: function() {
    var piece = new App.Piece();
    var pieceView = new App.PieceView({model: piece});
  }
});

var app = new App.AppView();
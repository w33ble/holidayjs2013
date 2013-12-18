App.Pieces = Backbone.Firebase.Collection.extend({
  model: App.Piece,
  initialize: function() {
    this.firebase = App.firebaseUrl + App.gameInstance + 'pieces/';
  }
});
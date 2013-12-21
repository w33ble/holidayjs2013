App.Players = Backbone.Firebase.Collection.extend({
  model: App.Player,
  initialize: function() {
    this.firebase = App.firebaseUrl + App.gameInstance + 'players/';
  }
});

App.Pieces = Backbone.Firebase.Collection.extend({
  model: App.Piece,
  // firebase: 'https://holiday-js-hackathon-2013.firebaseio.com/',
  initialize: function() {
    this.firebase = App.firebaseUrl + App.gameInstance + 'pieces/';
  }
});
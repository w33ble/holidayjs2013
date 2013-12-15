App.Pieces = Backbone.Collection.extend({
  model: App.Piece,
  firebase: 'https://holiday-js-hackathon-2013.firebaseio.com/',
  initialize: function() {
    // this.listenTo('add', this, initPiece);
  }
});
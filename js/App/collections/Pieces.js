App.Pieces = Backbone.Firebase.Collection.extend({
  model: App.Piece,
  // firebase: 'https://holiday-js-hackathon-2013.firebaseio.com/',
  initialize: function() {
    var uuid4       = UUIDjs.create();
    this.firebase = 'https://holiday-js-hackathon-2013.firebaseio.com/' + uuid4.toString();
    // this.listenTo('add', this, initPiece);
  }
});
App.Piece = Backbone.Model.extend({
  pieceTypes: [
    {
      name: 'blue',
      img: 'img/gift-icon1.png'
    },
    {
      name: 'red',
      img: 'img/gift-icon2.png'
    },
    {
      name: 'yellow',
      img: 'img/gift-icon3.png'
    },
    {
      name: 'snowman',
      img: 'img/gift-icon4.png'
    }
  ],

  initialize: function() {
    // new model, choose random piece
    if (! this.id) {
      var pack = this.pieceTypes[Math.floor(Math.random() * this.pieceTypes.length)];
      this.set('name', pack.name);
      this.set('img', pack.img);
    }
  },
});

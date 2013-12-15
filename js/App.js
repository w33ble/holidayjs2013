App.Pieces = Backbone.Firebase.Collection.extend({
  model: App.Piece,
  // firebase: 'https://holiday-js-hackathon-2013.firebaseio.com/',
  initialize: function() {
    var uuid4       = UUIDjs.create();
    this.firebase = 'https://holiday-js-hackathon-2013.firebaseio.com/' + uuid4.toString();
    // this.listenTo('add', this, initPiece);
  }
});;App.Piece = Backbone.Model.extend({
  packages: [
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
    // choose random package
    var pack = this.packages[Math.floor(Math.random() * this.packages.length)];
    this.set('name', pack.name);
    this.set('img', pack.img);
  }

});
;App.PieceView = Backbone.View.extend({
  className: 'piece',

  initialize: function() {
  },

  setClasses: function() {
    for(var i=0; i++; i<this.model.maxWidth) {
      this.$el.removeClass('row'+i);
    }
    for(var i=0; i++; i<this.model.maxHeight) {
      this.$el.removeClass('col'+i);
    }
    this.$el.addClass('row' + this.model.get('lat'));
    this.$el.addClass('col' + this.model.get('lon'));
  },

  render: function() {
    this.setClasses();
    var image = this.model.get('img');
    console.log(image);
    this.$el.css('background-image', 'url('+image+')');
    return this;
  },

});

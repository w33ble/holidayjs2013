window.App = App = Backbone.View.extend({
  initialize: function() {
    var Pack = new App.Piece();
    var pack = new App.PieceView({model: Pack});
  }
});

App.Piece = Backbone.Model.extend({
  packages: [
    {
      name: 'blue',
      img: 'img/package-blue.png'
    },
    {
      name: 'red',
      img: 'img/package-red.png'
    },
    {
      name: 'yellow',
      img: 'img/package-yellow.png'
    }
  ],

  initialize: function() {
    // choose random package
    var pack = this.packages[Math.floor(Math.random() * this.packages.length)];
    this.set('name', pack.name);
    this.set('img', pack.img);
  }

});

App.PieceView = Backbone.View.extend({
  initialize: function() {
    console.log(this.model);
    console.log(this.model.get('name'), this.model.get('img'));
  }
});

var app = new App();
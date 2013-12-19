App.Piece = Backbone.Model.extend({
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

  events: {
    'click': 'handleClick'
  },

  initialize: function() {
    // choose random package
    var pack = this.packages[Math.floor(Math.random() * this.packages.length)];
    this.set('name', pack.name);
    this.set('img', pack.img);
  },

  handleClick: function(e) {
    App.Vent.trigger('piece:click', this);
  }

});
;App.Player = Backbone.Model.extend({
    defaults: {
        score: 0,
        turn: 0
    }
});
;App.Pieces = Backbone.Firebase.Collection.extend({
  model: App.Piece,
  // firebase: 'https://holiday-js-hackathon-2013.firebaseio.com/',
  initialize: function() {
    var uuid4       = UUIDjs.create();
    this.firebase = 'https://holiday-js-hackathon-2013.firebaseio.com/' + uuid4.toString();
    // this.listenTo('add', this, initPiece);
  }
});;/* TODO: move UUID code to main.js */
App.Players = Backbone.Firebase.Collection.extend({
  model: App.Player,
  // firebase: 'https://holiday-js-hackathon-2013.firebaseio.com/',
  initialize: function() {
    var uuid4       = UUIDjs.create();
    this.firebase = 'https://holiday-js-hackathon-2013.firebaseio.com/' + uuid4.toString();
    // this.listenTo('add', this, initPlayer);
  }
});
;App.PieceView = Backbone.View.extend({
  className: 'piece',

  events: {
    'click': 'swapHandler'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.movePiece);
  },

  setClasses: function() {
    for(var i=0; i<this.model.get('maxWidth'); i++) {
      this.$el.removeClass('row'+i);
    }
    for(var i=0; i<this.model.get('maxHeight'); i++) {
      this.$el.removeClass('col'+i);
    }
    this.$el.addClass('row' + this.model.get('lat'));
    this.$el.addClass('col' + this.model.get('lon'));
  },

  render: function() {
    this.setClasses();
    var image = this.model.get('img');
    this.$el.css('background-image', 'url('+image+')');
    return this;
  },

  swapHandler: function() {
    App.Vent.trigger('piece:click', this);
  },

  activate: function() {
    this.$el.addClass('active');
  },

  deactivate: function() {
    this.$el.removeClass('active');
  },

  movePiece: function(model) {
    this.setClasses();
    this.deactivate();
  }

});
;App.PlayerView = Backbone.View.extend({
    el: null,
    $scoreContainer: null,
    $nameContainer: $('.turnIndicator .name'),

    updateScore: function () {
        this.$scoreContainer.html(this.model.get('score'));
    },

    updateTurn: function () {
        // set name
        this.$nameContainer.html(this.model.get('name'));

        // change border
        $('.playerPic').removeClass('active');
        this.$el.addClass('active');
    },

    initialize: function () {
        // set ui element attributes
        this.$el = $('#player' + this.model.get('slot'));
        this.$scoreContainer = this.$el.find('.score .scoreNumber');

        // attach listeners
        this.listenTo(this.model, 'change:score', this.updateScore);
        this.listenTo(this.model, 'change:turn', this.updateTurn);
    }
});
;App.PlayersView = Backbone.View.extend({
    initialize: function() {
        // initialize player views
        this.collection.each(function (player) {
            var playerView = new App.PlayerView({
                model: player
            });
        });

        this.collection.at(0).set('turn', 1);
    }
});

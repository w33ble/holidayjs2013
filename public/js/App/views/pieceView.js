App.PieceView = Backbone.View.extend({
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

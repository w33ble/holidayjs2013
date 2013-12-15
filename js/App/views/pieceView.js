App.PieceView = Backbone.View.extend({
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

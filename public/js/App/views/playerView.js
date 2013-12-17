App.PlayerView = Backbone.View.extend({
    el: '.turnIndicator .name',

    render: function () {
        // set name
        this.$el.html(this.model.get('name'));

        // change border
        $('.playerPic').removeClass('active');
        $('#player' + this.model.get('slot')).addClass('active');

        return this;
    },

    initialize: function () {}
});

App.PlayerView = Backbone.View.extend({
    el: '.turnIndicator .name',

    render: function () {
        // set name
        this.$el.html(this.model.name); // should this be this.model.get('name') - because that doesn't work

        // change border
        $('.playerPic').removeClass('active');
        $('#player' + this.model.slot).addClass('active'); // this.model.get('slot') ?

        return this;
    },

    initialize: function () {}
});

App.Player = Backbone.Model.extend({
	slot: null,
	name: null,
	score: null,

	initialize: function(slot, name) {
		this.slot = slot;
		this.name = name;
		this.score = 0;
	}
});

/**
 * Created by kotato on 2017/02/17.
 */
$(function(){

    var input = Backbone.Model.extend({
        defaults:{text:"init"}
    })

    let inputView = Backbone.View.extend({
        el: $("#inputDiv"),
        events: {
            "click #oreoreSubmit" : "submit",
            "click #oreoreFilter" : "filter",
            "click #oreoreClear" : "clear",
            "click #oreoreShow" : "show"
        },
        template: _.template($('#inputTemplate').html()),
        initialize: function (options) {
            // インスタンスの生成時に呼ばれる
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
        },

        submit: function (e) {
            window.tableField.add($("#inputField").val())
        },

        filter: function (e) {
            window.tableField.filter($("#inputField").val())
        },

        clear: function (e) {
            window.tableField.allClear()
        },

        show: function (e) {
            window.tableField.show()
        },
    })


    let inputField = new inputView({model:new input()})
    let row = Backbone.Model.extend({
        defaults: {text:"", visible:true}
    });

    let rows = Backbone.Collection.extend({
        model: row
    })


    let tableRowView = Backbone.View.extend({
        template: _.template($('#rowTemplate').html()),

        events: {
            "click .oreoreItemDelete" : "remove",
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.hide)
        },

        render: function () {

            return $(this.el).html(this.template(this.model.toJSON()))
        },

        remove: function () {
            this.model.destroy()
            // this.collection.remove(this.model)
            $(this.el).remove()
        },

        hide: function () {
            if(!this.model.attributes.visible){
                $(this.el).css("display","none")
            }
            else{
                $(this.el).css("display","")
            }
        },

    })

    let tableView = Backbone.View.extend({
        el: $("#mainTable"),
        childView: tableRowView,
        initialize: function () {
            this.listenTo(this.collection, 'add', this.append);
            this.listenTo(this.collection, 'destroy', this.del);
            this.listenTo(this.collection, 'reset', this.clear);
        },
        add: function (text) {
            this.collection.add(new row({text:text}))
        },

        filter: function (text) {
            console.log("filter", this.collection.length)
            _.filter(this.collection.models,
                function(ele, i){
                    return ele.attributes.text.indexOf(text) == -1
                }
            ).map((model)=>{
                model.set("visible",false)
            })
        },

        append: function (model) {
            var view = new this.childView({model: model, el:$("<div>"), collection:this})
            $(this.el).append(view.render())
        },


        del: function (model) {
            console.log("destroy",model)
        },

        allClear: function () {
            this.collection.reset()
        },

        clear: function () {
            $(this.el).find("div").remove()
        },

        show: function () {
            console.log(this.collection.models)
            _.each(this.collection.models,
                (model)=>{
                    // console.log("before",model.attributes.visible)
                    model.set("visible",true)
                    // console.log("after",model.attributes.visible)
                }
            )
        }

    })

    window.tableField = new tableView({collection:new rows()})


})

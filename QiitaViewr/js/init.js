/**
 * Created by kotato on 2017/03/03.
 */

$(function () {
    "use strict";
    console.log("start")
    $.ajax({
        url: "https://qiita.com/api/v2/items",
        success: function (res) {
            console.log("success",res)
            return res.map((record)=>{

                let user = record
                let id = user.id
                let profileImageUrl = user.profile_image_url
                console.log(record.tags)
                return {user: record.user, body: record.body, tags:record.tags, url:record.url, title:record.title, date:record.updated_at}
            })
        },

        error: function (err) {
            console.log("error",err)
        }
    }).then((results)=>{
        var elements = results.map((result)=>{
            let imgArea = $("<img>")
                .addClass("image")
                .attr("src", result.user.profile_image_url)

            let idArea = $("<div>")
                .addClass("userId")
                .addClass("overFlowText")
                .text(result.user.id)

            let profileArea = $("<div>")
                .addClass("profile")
                .append([imgArea, idArea])

            let title = $("<a>")
                .attr("href", result.url)
                .text(result.title)

            let date = $("<div>")
                .css("display"," inline")
                .css("padding-left","4px")
                .text(result.updated_at)

            let titleArea = $("<div>")
                .addClass("title")
                .append([title, date])

            console.log(result.map)
            let badges = result.tags.map((tag)=>{
                return $("<div>")
                    .addClass("badge")
                    .text(tag.name)
            })

            let tagArea = $("<div>")
                .append(badges)

            let body = result.body
            console.log(body.length)
            // if(body.length > 200){
            //     body = body.substring(0,200) + "..."
            // }

            let descriptionArea = $("<div>")
                .addClass("description")
                .addClass("overFlowMultiRowText")
                .text(body)

            let informationArea = $("<div>")
                .addClass("information")
                .append([titleArea,tagArea, descriptionArea])

            let content = $("<div>")
                .addClass("content")
                .append([profileArea, informationArea])

            return content
        })

        $("#mainContentsArea").append(elements)
    })


})

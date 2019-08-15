$("#banana").on("click",function(e){
    e.preventDefault()
    var form = {
        storeId: 1,
    }
    $.ajax({
        type: "POST",
        data: form,
    }).then(function(res){
        $("#stores").empty();
        for(i=0;i<res.length;i++){
            var productsbyid = "<div class='col s12 m6 l4 xl3' ><div class='card'><div class='card-image'><img  src="+res[i].image_url+" alt='banana republic'><span class='card-title' style='color: black'>"+res[i].name+"</span><a href='#' class='btn-floating halfway-fab waves-effect waves-light red addwish' id='addwish' data-id="+res[i].id+"><i class='material-icons'>add</i></a></div><div class='card-content'><p>gender: "+res[i].gender+"</p> <p>price: "+res[i].price+"$</p><p>category: "+res[i].category+"</p><p><a href="+res[i].url+">Visit Website</a></p></div></div></div>";
        $("#stores").append(productsbyid)}
        $(".addwish").on( "click", function(e){
            e.preventDefault(e);
            var form = {
                productId: this.getAttribute("data-id"),
            }
            $.ajax({
                type: "PUT",
                data: form,
            })
        });
    })

})
$("#jcrew").on("click",function(e){
    e.preventDefault()
    console.log("jcrew");
    var form = {
        storeId: 2,
    }
    $.ajax({
        type: "POST",
        data: form,
    }).then(function(res){
        $("#stores").empty();
        for(i=0;i<res.length;i++){
            var productsbyid = "<div class='col s12 m6 l4 xl3' ><div class='card'><div class='card-image'><img  src="+res[i].image_url+" alt='banana republic'><span class='card-title' style='color: black'>"+res[i].name+"</span><a href='#' class='btn-floating halfway-fab waves-effect waves-light red addwish' id='addwish' data-id="+res[i].id+"><i class='material-icons'>add</i></a></div><div class='card-content'><p>gender: "+res[i].gender+"</p> <p>price: "+res[i].price+"$</p><p>category: "+res[i].category+"</p><p><a href="+res[i].url+">Visit Website</a></p></div></div></div>";
        $("#stores").append(productsbyid)}
        $(".addwish").on( "click", function(e){
            e.preventDefault(e);
            var form = {
                productId: this.getAttribute("data-id"),
            }
            $.ajax({
                type: "PUT",
                data: form,
            })
        });
    })
})
$("#cos").on("click",function(e){
    e.preventDefault()
    console.log("cos");
    var form = {
        storeId: 3,
    }
    $.ajax({
        type: "POST",
        data: form,
    }).then(function(res){
        $("#stores").empty();
        for(i=0;i<res.length;i++){
            var productsbyid = "<div class='col s12 m6 l4 xl3' ><div class='card'><div class='card-image'><img  src="+res[i].image_url+" alt='banana republic'><span class='card-title' style='color: black'>"+res[i].name+"</span><a href='#' class='btn-floating halfway-fab waves-effect waves-light red addwish' id='addwish' data-id="+res[i].id+"><i class='material-icons'>add</i></a></div><div class='card-content'><p>gender: "+res[i].gender+"</p> <p>price: "+res[i].price+"$</p><p>category: "+res[i].category+"</p><p><a href="+res[i].url+">Visit Website</a></p></div></div></div>";
        $("#stores").append(productsbyid)}
        $(".addwish").on( "click", function(e){
            e.preventDefault(e);
            var form = {
                productId: this.getAttribute("data-id"),
            }
            $.ajax({
                type: "PUT",
                data: form,
            })
        });
    })
});



// $("#wishlsit").on("click",function(e){
//     e.preventDefault(e)
//     console.log("#wishlsit".attr("data-id"))
// })

// $(".btn-floating.halfway-fab.waves-effect.waves-light.red.addwish").on('click', function(event){
//     event.stopPropagation();
//     event.stopImmediatePropagation();
//     console.log("click")
// });
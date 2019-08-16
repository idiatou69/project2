$(".addwishp").on( "click", function(e){
    e.preventDefault(e);
    var form = {
        productId: this.getAttribute("data-id"),
    }
    $.ajax({
        type: "PUT",
        data: form,
    })
    
});
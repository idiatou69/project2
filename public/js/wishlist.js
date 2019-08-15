
$(".delete").on( "click", function(e){
    e.preventDefault(e);
    var form = {
        productId: this.getAttribute("data-id"),
    }
    $.ajax({
        type: "DELETE",
        data: form,
    })
});
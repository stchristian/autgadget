$("input[type=file]").change(function(event) {
    let fileInput = this;
    let reader = new FileReader();
    $(reader).on("load", function() {
        $(fileInput).parent().append(`
            <img src="${this.result}" class="preview_image" />
            <div class="preview_overlay">
                <i class="icon fa fa-trash"></i> 
            </div>
        `);
    });
    reader.readAsDataURL(this.files[0]);
});

$(".preview_container").on("click", function(e) {
    $(this).children('img').remove();
    $(this).children('.preview_overlay').remove();
    $(this).children('input[type=file]')[0].value = '';
});
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap').hide();

            /*var imgg = new Image();

            imgg.onload = function() {
              $('.image-resize').css('width', this.width);
            }
            // hi bye

            $(imgg).attr('src', e.target.result);*/
            var imggg = new Image();
            imggg.onload = function() {
                var rewidth = this.width;
                var reheight = this.height;
                if (rewidth < 150 || reheight < 150) {
                    alert("가로 150px, 세로 150px 이상인 사진만 사용할 수 있어요. \n현재 크기 : (" + rewidth + "px, " + reheight + "px) \n새로고침 후 다른 사진으로 다시 시도해 주세요.");
                }

                var canvas = document.getElementById('paracanvas');
                document.getElementById('paracanvas').width = screen.width;
                document.getElementById('paracanvas').height = reheight * (canvas.width / rewidth);
                canvas.getContext("2d").drawImage(imggg, 0, 0, document.getElementById('paracanvas').width, document.getElementById('paracanvas').height);


                $('.resize-img').attr('src', document.getElementById('paracanvas').toDataURL("image/jpg"));


                $('#sectionResize').removeClass('hidden');
                $('#tutoimg').removeClass('hidden');
                var newImage = new imageCrop('.resize-img', 150, 150);


                $('#crop').on('click', function() {
                    var results = newImage.crop();
                    $('.file-upload-image').attr('src', results.img.src);
                    $('#sectionResize').addClass('hidden');
                    $('#tutoimg').addClass('hidden');
                    $('#sectionThumbnail').removeClass('hidden');
                    $('.file-upload-content').show();
                    predict();
                });
            }
            $(imggg).attr('src', e.target.result);








        };


        reader.readAsDataURL(input.files[0]);

    }
}

//function removeUpload() {
//$("div").remove(".ic-container");
//$(".image-resize").append('<img class="resize-img" id="fullImage">');
//$('.file-upload-input').replaceWith($('.file-upload-input').clone());
//$('.file-upload-content').hide();
//$('.image-upload-wrap').show();
//}

$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
});

function scrollFooter(scrollY, heightFooter) {
    console.log(scrollY);
    console.log(heightFooter);

    if (scrollY >= heightFooter) {
        $('footer').css({
            'bottom': '0px'
        });
    } else {
        $('footer').css({
            'bottom': '-' + heightFooter + 'px'
        });
    }
}

$(window).load(function() {
    var windowHeight = $(window).height(),
        footerHeight = $('footer').height(),
        heightDocument = (windowHeight) + ($('.content').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height': heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height': windowHeight + 'px',
        'line-height': windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top': windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function() {
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top': '-' + scroll + 'px'
        });

        $('header').css({
            'background-position-y': 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});




function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap').hide();

            $('.resize-img').attr('src', e.target.result);

            /*var imgg = new Image();

            imgg.onload = function() {
              $('.image-resize').css('width', this.width);
            }

            $(imgg).attr('src', e.target.result);*/

            var imggg = new Image();
            imggg.onload = function() {
                var rewidth = this.width;
                var reheight = this.height;
                if (rewidth < 150 || reheight < 150) {
                    alert("가로 150px, 세로 150px 이상인 사진만 사용할 수 있어요. \n현재 크기 : (" + rewidth + "px, " + reheight + "px) \n새로고침 후 다른 사진으로 다시 시도해 주세요.");
                }
            }
            $(imggg).attr('src', e.target.result);



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


        };


        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
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

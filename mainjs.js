const URL_S = "https://teachablemachine.withgoogle.com/models/hHkdWqdF5/";
const URL_N = "https://teachablemachine.withgoogle.com/models/Un7wmU70M/";
const URL_I = "https://teachablemachine.withgoogle.com/models/oz7Ok_57G/";

let model, labelContainer, maxPredictions;

async function predict() {


    document.getElementById("grp").innerHTML = '';



    document.getElementById("loading").innerHTML = '\
        <div class="box">\
            <div class="cat">\
                <div class="cat__body"></div>\
                <div class="cat__body"></div>\
                <div class="cat__tail"></div>\
                <div class="cat__head"></div>\
            </div>\
            <div>분석 중 입니다...</div>\
            <br>\
        </div>\
            ';


    const modelURL_S = URL_S + "model.json";
    const metadataURL_S = URL_S + "metadata.json";

    const modelURL_N = URL_N + "model.json";
    const metadataURL_N = URL_N + "metadata.json";

    const modelURL_I = URL_I + "model.json";
    const metadataURL_I = URL_I + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model_S = await tmImage.load(modelURL_S, metadataURL_S);
    maxPredictions_S = model_S.getTotalClasses();

    model_N = await tmImage.load(modelURL_N, metadataURL_N);
    maxPredictions_N = model_N.getTotalClasses();

    model_I = await tmImage.load(modelURL_I, metadataURL_I);
    maxPredictions_I = model_I.getTotalClasses();

    labelContainer_S = document.getElementById("label-container-s");

    labelContainer_N = document.getElementById("label-container-n");

    labelContainer_I = document.getElementById("label-container-i");

    // predict can take in an image, video or canvas html elemen
    var image_face = document.getElementById("face-image");

    const prediction_S = await model_S.predict(image_face, false);

    const prediction_N = await model_N.predict(image_face, false);

    const prediction_I = await model_I.predict(image_face, false);

    var g_sn = parseInt(prediction_S[0].probability.toFixed(2) * 100);
    var g_sy = parseInt(prediction_S[1].probability.toFixed(2) * 100);

    var g_n0 = parseInt(prediction_N[4].probability.toFixed(2) * 100);
    var g_n1 = parseInt(prediction_N[2].probability.toFixed(2) * 100);
    var g_n2 = parseInt(prediction_N[0].probability.toFixed(2) * 100);
    var g_n3 = parseInt(prediction_N[1].probability.toFixed(2) * 100);
    var g_n4 = parseInt(prediction_N[3].probability.toFixed(2) * 100);

    var g_i0 = parseInt(prediction_I[0].probability.toFixed(2) * 100);
    var g_i1 = parseInt(prediction_I[1].probability.toFixed(2) * 100);
    var g_i2 = parseInt(prediction_I[2].probability.toFixed(2) * 100);
    var g_i3 = parseInt(prediction_I[3].probability.toFixed(2) * 100);

    document.getElementById("loading").innerHTML = '';

    var result_text = "";


    var gi0 = g_i0;
    var gi1 = g_i1;
    var gi2 = g_i2;
    var gi3 = g_i3;
    var chk = 0;
    tmp = Math.max(gi0, gi1, gi2, gi3);
    switch (tmp) { // 인종 1
        case gi0:
            result_text += "당신은 동양인의 부드러운 인상";
            gi0 = 0;
            chk = 0;
            break;
        case gi1:
            result_text += "당신은 흑인의 늠름한 피지컬";
            gi1 = 0;
            chk = 0;
            break;
        case gi2:
            result_text += "당신은 라틴인의 매력적인 구릿빛 피부";
            gi2 = 0;
            chk = 1;
            break;
        case gi3:
            result_text += "당신은 서양인의 뚜렷한 이목구비";
            gi3 = 0;
            chk = 1;
            break;
    }

    var chkk;
    tmp = Math.max(gi0, gi1, gi2, gi3);
    if (tmp >= 25) {
        if (chk) {
            result_text += "와";
        } else {
            result_text += "과";
        }
        switch (tmp) { // 인종 1
            case gi0:
                result_text += " 동양인의 부드러운 인상";
                chkk = 0;
                break;
            case gi1:
                result_text += " 흑인의 늠름한 피지컬";
                chkk = 0;
                break;
            case gi2:
                result_text += " 라틴인의 매력적인 구릿빛 피부";
                chkk = 1;
                break;
            case gi3:
                result_text += " 서양인의 뚜렷한 이목구비";
                chkk = 1;
                break;
        }
        if (chkk) {
            result_text += "을";
        } else {
            result_text += "를";
        }
    } else {
        if (chk) {
            result_text += "을";
        } else {
            result_text += "를";
        }
    }

    result_text += " 가지고 ";


    var tmp = Math.max(g_n0, g_n1, g_n2, g_n3, g_n4);
    switch (tmp) { // 나이
        case g_n0:
            result_text += "8세 이하의 베이비 페이스를 탑재한 ";
            break;
        case g_n1:
            result_text += "8 ~ 15세의 성장기 페이스를 탑재한 ";
            break;
        case g_n2:
            result_text += "15 ~ 27세의 사회 초년생 외모를 탑재한 ";
            break;
        case g_n3:
            result_text += "27 ~ 39세의 성숙한 외모를 탑재한 ";
            break;
        case g_n4:
            result_text += "39세 이상의 연륜이 느껴지는 외모를 탑재한 ";
            break;
    }

    if (g_sn > 80) {
        result_text += "남자입니다.";
    } else if (g_sn <= 80 && g_sn >= 60) {
        result_text += "여성스러운 외모를 가진 남자입니다.";
    } else if (g_sn < 60 && g_sn > 40) {
        if (g_sn > g_sy) {
            result_text += "두 성별의 매력을 모두 가진 남자입니다.";
        } else if (g_sn < g_sy) {
            result_text += "두 성별의 매력을 모두 가진 여자입니다.";
        } else {
            result_text += "성별은 모르겠어요...";
        }
    } else if (g_sn <= 40 && g_sn >= 20) {
        result_text += "남성스러운 외모를 가진 여자입니다.";
    } else if (g_sn < 20) {
        result_text += "여자입니다.";
    }




    document.getElementById("grp").innerHTML = '\
        <div class="wrapper">\
          <h2>인공지능이 보는 당신의 얼굴</h2>\
            <h4>' + result_text + '</h4>\
            <div class="pie-charts">\
                <div class="pieID--micro-skills pie-chart--wrapper">\
                    <h3>성별</h3>\
                    <div class="pie-chart">\
                        <div class="pie-chart__pie"></div>\
                        <ul class="pie-chart__legend">\
                            <li><em>남자</em><span>' + g_sn + '</span></li>\
                            <li><em>여자</em><span>' + g_sy + '</span></li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="pieID--categories pie-chart--wrapper">\
                    <h3>나이</h3>\
                    <div class="pie-chart">\
                        <div class="pie-chart__pie"></div>\
                        <ul class="pie-chart__legend">\
                            <li><em>8세 이하</em><span>' + g_n0 + '</span></li>\
                            <li><em>8 ~ 15세</em><span>' + g_n1 + '</span></li>\
                            <li><em>15 ~ 27세</em><span>' + g_n2 + '</span></li>\
                            <li><em>27 ~ 39세</em><span>' + g_n3 + '</span></li>\
                            <li><em>39세 이상</em><span>' + g_n4 + '</span></li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="pieID--operations pie-chart--wrapper">\
                    <h3>인종</h3>\
                    <div class="pie-chart">\
                        <div class="pie-chart__pie"></div>\
                        <ul class="pie-chart__legend">\
                            <li><em>동양계</em><span>' + g_i0 + '</span></li>\
                            <li><em>아프리카계</em><span>' + g_i1 + '</span></li>\
                            <li><em>라틴계</em><span>' + g_i2 + '</span></li>\
                            <li><em>서양계</em><span>' + g_i3 + '</span></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <br>\
        ';


    function sliceSize(dataNum, dataTotal) {
        return (dataNum / dataTotal) * 360;
    }

    function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
        $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
        var offset = offset - 1;
        var sizeRotation = -179 + sliceSize;

        $(id + " ." + sliceID).css({
            "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
        });

        $(id + " ." + sliceID + " span").css({
            "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
            "background-color": color
        });
    }

    function iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
        var
            maxSize = 179,
            sliceID = "s" + dataCount + "-" + sliceCount;

        if (sliceSize <= maxSize) {
            addSlice(id, sliceSize, pieElement, offset, sliceID, color);
        } else {
            addSlice(id, maxSize, pieElement, offset, sliceID, color);
            iterateSlices(id, sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
        }
    }

    var iii = 0;

    function createPie(id) {
        var
            listData = [],
            listTotal = 0,
            offset = 0,
            i = 0,
            pieElement = id + " .pie-chart__pie"
        dataElement = id + " .pie-chart__legend"

        color = [
            "#5561D6",
            "#F0497E",
            "#EBAAA7",
            "#6A9995",
            "#53744E",
            "#F5BA67",
            "#E6806C",
            "#FF7745",
            "#36C785",
            "#7942C5",
            "#FFED45"
        ];


        $(dataElement + " span").each(function() {
            listData.push(Number($(this).html()));
        });

        for (i = 0; i < listData.length; i++) {
            listTotal += listData[i];
        }

        for (i = 0; i < listData.length; i++) {
            var size = sliceSize(listData[i], listTotal);
            iterateSlices(id, size, pieElement, offset, i, 0, color[iii]);
            $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[iii]);
            offset += size;
            iii++;
        }
    }

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }

        return a;
    }

    function createPieCharts() {
        createPie('.pieID--micro-skills');
        createPie('.pieID--categories');
        createPie('.pieID--operations');
    }

    createPieCharts();




}

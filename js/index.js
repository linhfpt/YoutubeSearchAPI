const KEY1 = 'AIzaSyAIA3AAqtK1IuZ7x4FJtX_AavAzXREguhM';
const KEY2 = 'AIzaSyAiVq8q1v8_Dw2O2jKrzQo9CXTOkoT8Cgk';
var pageTokenParam = "";
var numbLoaded = 9;
function showModal(videoID, itemTitle, itemDes) {
    $('#video-frame').attr("src", `https://www.youtube.com/embed/${videoID}`);
    $('#title').html(itemTitle);
    $('#des').html(itemDes);
    $('#myModal').modal("show");
};
function youtubeSearchApi(keyword,pageTokenParam){
    $.ajax({
        method: "GET",
        url: `https://content.googleapis.com/youtube/v3/search?q=${keyword}&type=video&maxResults=${numbLoaded}&part=snippet&key=${KEY1}&PageToken=${pageTokenParam}`,
        success: function (data) {
            console.log(data);
            var pageTokenParam = data.nextPageToken;
            var content = "";
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                content += `<div class="card col-4" onclick="showModal('${item.id.videoId}','${item.snippet.title}','${item.snippet.description}')">
                                <img class="card-img-top" src="${item.snippet.thumbnails.high.url}" alt="...">
                                <div class="card-body">
                                    <h3 class="card-text ellipsis">${item.snippet.title} </h3>
                                    <p class="card-text ellipsis">${item.snippet.description}</p>
                                </div>
                            </div>`;
                console.log('success');
            }
            $('#result').append(content);
            // console.log(content);
            // console.log('success');
        },
        error: function () {
            alert("Có lỗi xảy ra");
        }
    });
};
$("#btn-search").click(function () {
    var keyword = $("input[name='keyword']").val();
    console.log(keyword);
    youtubeSearchApi(keyword,pageTokenParam);
});
$(window).scroll(function () {
    if ($(this).scrollTop() + 1 >= $('body').height() - $(window).height()) {
        var keyword = $("input[name='keyword']").val();
        var numbLoaded = 9;
        console.log(keyword);
        youtubeSearchApi(keyword,pageTokenParam);
    }
});


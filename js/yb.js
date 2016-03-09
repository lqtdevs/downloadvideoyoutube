var $keyword="";
var $urldownload="";
var $apikey="";

$(function(){

$.get("https://8d917513da5216d20e69e73f5801a2b1d357d74c.googledrive.com/host/0B6XCpb6gYskpcmhwcVNrRm5MNFE",function(dt){
	((dt.danhsach.items[0].url))?($urldownload=(dt.danhsach.items[0].url)):null;
	((dt.danhsach.items[0].apikey))?($apikey=(dt.danhsach.items[0].apikey)):null;
}).error(function(){
	$("#content").html("<div id='content-box-error'><button onclick='loadlai();'>Tải lại</button>"+
	    	"<h1><span id='error-load'>Bạn hãy kiểm tra xem đã kết nối internet chưa!</span></h1></div>");
});

$("form").on("submit",function(e){
		$keyword=$("#keyword").val().trim();
		if($keyword=="")return false;
		if($urldownload=="" && $api==""){
			$("#content").html("<div id='content-box-error'><button onclick='loadlai();'>Tải lại</button>"+
	    	"<h1><span id='error-load'>Bạn hãy kiểm tra xem đã kết nối internet chưa!</span></h1></div>");
		}
		var $urllink="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+$keyword+"&type=video&key="+$apikey+"&maxResults=10";
		searchvideoyoutube($urllink);
		return false;

	});
	
	$("#content").on("click","a.nextvideo",function(e){
		var nextprevpage=$(this).attr("href");
		nextprevpage=nextprevpage.substring(1,nextprevpage.length);
		var $urllink="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+$keyword+"&type=video&key="+$apikey+"&maxResults=10&pageToken="+nextprevpage;
		searchvideoyoutube($urllink);
		return false;

	});

	$("#content").on("click","img",function(e){
		$(".box-download").html("");
		var $id = $(this).attr("rel").trim();
		var $taiday=$(this);
		$.post($urldownload,{id:$id},function(dt){
			//console.log($.parseJSON(dt));
			var data=$.parseJSON(dt);
			$taiday.next().append("<br><span id='pseudo-download'><a download href='"+data[5].url+"&title="+data[5].titleclear+"' target='_self'>Tải video</a></span>");
		});
		return false;

	});


});

function searchvideoyoutube ($url) {
	if($url==undefined || $url==''){
			return false;
		}else{
			$.get($url,function(data){
				console.log(data);
				var $strcontent="<div id='video-content'><ul id='ul-video-items'>";
				var $nextPageToken="";
				var $prevPageToken="";
				for(var i = 0; i <data.items.length; i++) {
					var $snippet=(data.items[i].snippet);
					var videoid=(data.items[i].id.videoId);
					$strcontent+="<li class='li-item'>";
					$strcontent+="<h1>"+$snippet.title+"</h1>";
					$strcontent+="<img border='0' rel='"+videoid+"' src='http://i2.ytimg.com/vi/"+videoid+"/0.jpg' height='150px' width='150px'/><span class='box-download'></span>";
					$strcontent+="</li>";
				};
				((data.nextPageToken))?($nextPageToken=(data.nextPageToken)):null;
				((data.prevPageToken))?($prevPageToken=(data.prevPageToken)):null;
				$strcontent+="<li class='next-prev-item'>";
				if($nextPageToken!=""){
					$strcontent+="<a class='nextvideo' href='#"+$nextPageToken+"'>Trang Tiếp</a>";
				}
				if($prevPageToken!=""){
					$strcontent+="<a class='nextvideo' href='#"+$prevPageToken+"'>Trang Trước</a>";
				}
				$strcontent+="</li>";
				$strcontent+="</ul></div>";
				$("#content").html($strcontent);
			}).error(function(){
	$("#content").html("<div id='content-box-error'><button onclick='loadlai();'>Tải lại</button>"+
	    	"<h1><span id='error-load'>API Youtube Error:Chúng tôi sẽ khác phục sớm nhất!</span></h1></div>");
});
		}//end If
}

function loadlai(){
		window.location.href='';
		//alert("đã load lại");
	}
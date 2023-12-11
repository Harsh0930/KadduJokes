// Hersh API Key : AIzaSyDQ2tUWaxbq1BHa3oPySAQ62DgxyWGlUZs
// Keshav API Key : AIzaSyAeRQotjXR0sFjHyejnjPX_p4mZz778k-E
// Harsh New API KEY : AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM

const Api_Key = " AIzaSyDmfzTHpIxSzmy1dvzKQLRxgq8uY07i4jM";
const Youtube_ID = "UCa_O4LhZxDH1MMPUCLqNC9w";

const subscriber_count = document.querySelector("#subscriber_count")
const video_count = document.querySelector("#video_count")
const title = document.querySelector("#channel_name")
const description = document.querySelector("#description")
const views = document.querySelector("#views")

//Create an object to store fetched data
const FetchedVideosData = {
    videosArray: []
};

//Function to format a numbers in K and M.
function formatNumber(number) {
    if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + 'K';
    } else {
        return number.toString();
    }
}

// Function for found search videos
const searchVideos = () => {
    try {
        //console.log("Search button clicked");
        const videoName = document.getElementById('searchInput').value.toLowerCase();
        //console.log("Search term:", videoName);
        const matchingVideos = FetchedVideosData.videosArray.filter(video => video.videoTitle.toLowerCase().includes(videoName.toLowerCase()));
        //console.log("Matching videos:", matchingVideos);

        //Clear previous search results
        document.querySelector(".not_found").innerHTML = "";
        document.querySelector(".Search_Cointainer").innerHTML = "";

        if (videoName == "" || !videoName || matchingVideos.length == 0) {
            //console.log("No videos found.");
            document.querySelector(".not_found").innerHTML = `<iframe class="d-flex justify-content-center" src="https://lottie.host/embed/a4c3efd3-6ed4-47d3-8c1c-aafec349987e/I5nustqYHy.json"></iframe>`
        } else {
            document.querySelector(".Search_Cointainer").innerHTML += `<section class="search_videos_container row my-3 m-0 px-3 container-fluid">
        <section class="search_video_heading col-lg-12 col-md-12 col-sm-12">
          <h3 class="search_video">Search Videos</h3>
        </section>
        <section class="search_video_cards_container my-3 p-0">
          <div class="slider">
            <button id="prev_search" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256" fill="none" id="my-svg">
              <defs>
                <linearGradient id="gradient1">
                  <stop class="stop1" offset="0%" stop-color="#8f66ff"></stop>
                  <stop class="stop2" offset="100%" stop-color="#3d12ff"></stop>
                </linearGradient>
              </defs>
              <rect id="backgr" width="256" height="256" fill="none" rx="60"></rect>
              <g id="group" transform="translate(0,0) scale(1)">
                <path d="M128.000 74.667L85.333 128.000L128.000 181.333" stroke="#fcfcfc" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="primary"></path>
                <path d="M170.667 74.667L128.000 128.000L170.667 181.333" stroke="#feaa28" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="secondary"></path>
              </g>
            </svg>
          </button>
            <div class="search-cards-content d-flex"></div>
          <button id="next_search" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256" fill="none" id="my-svg">
              <defs>
                <linearGradient id="gradient1">
                  <stop class="stop1" offset="0%" stop-color="#8f66ff"></stop>
                  <stop class="stop2" offset="100%" stop-color="#3d12ff"></stop>
                </linearGradient>
              </defs>
              <rect id="backgr" width="256" height="256" fill="none" rx="60"></rect>
              <g id="group" transform="translate(0,0) scale(1)">
                <path d="m128 74.667 42.667 53.333 -42.667 53.333" stroke="#fcfcfc" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="primary"></path>
                <path d="m85.333 74.667 42.667 53.333 -42.667 53.333" stroke="#feaa28" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" id="secondary"></path>
              </g>
            </svg>
          </button>
          </div>
        </section>
        </section>`
            matchingVideos.forEach(video => {
                //console.log(`Title: ${video.videoTitle}, URL: ${video.videoUrl}, Thumbnail: ${video.videoThumnnail}`);
                document.querySelector(".search-cards-content").innerHTML +=
                    `<div class="card mx-2 my-2">
            <a href="${video.videoUrl}" class="search_video_title_link text-decoration-none" target="_blank">
            <div class="embed-responsive embed-responsive-16by9">  
            <img src="${video.videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
            </div>
            <div class="card-body p-0 py-3 px-2">
                <p class="card-title search_video_title">${video.videoTitle}</p>
            </div>
            </a>
        </div>`
            });
            sliderSearch();
        }
    } catch (error) {
        console.error("Error fetching search video data:", error);
    }
};

// Function to fatching subscribers , views and videos.
const getYoutubeSubscribers = async () => {
    try {
        const getSubData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Youtube_ID}&key=${Api_Key}`)
        console.log(getSubData);

        const youtube_subscribers = getSubData.data.items[0].statistics.subscriberCount;
        const youtube_videos = getSubData.data.items[0].statistics.videoCount;
        const youtube_views = getSubData.data.items[0].statistics.viewCount;

        subscriber_count.innerHTML = formatNumber(parseInt(youtube_subscribers));
        video_count.innerHTML = formatNumber(parseInt(youtube_videos));
        views.innerHTML = formatNumber(parseInt(youtube_views));
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};

// Function to fatching channel name and description.
const getYoutubeTitle = async () => {
    try {
        const getTitleData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${Youtube_ID}&key=${Api_Key}`)
        console.log(getTitleData);

        const channel_name = getTitleData.data.items[0].brandingSettings.channel.title;
        // const channel_description = getTitleData.data.items[0].brandingSettings.channel.description;

        title.innerHTML = channel_name;
        // description.innerHTML = channel_description;
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
};

//Function to fetch latest video details and display in a card && its for kddu joks sated api link
const getYoutubeVideoDetails = async () => {
    try {
        const getVideoData = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=UUa_O4LhZxDH1MMPUCLqNC9w&key=${Api_Key}`);
        console.log(getVideoData);

        const videos = getVideoData.data.items;
        videos.forEach(video => {
            const videoUrl = 'https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId;
            const videoTitle = video.snippet.title;
            const videoThumnnail = video.snippet.thumbnails.medium.url;

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".cards-content").innerHTML +=
                `<div class="card mx-2 my-2">
                <a href="${videoUrl}" class="latest_video_title_link text-decoration-none" target="_blank">
                <div class="embed-responsive embed-responsive-16by9">  
                <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
                </div>
                <div class="card-body p-0 py-3 px-2">
                    <p class="card-title latest_video_title">${videoTitle}</p>
                </div>
                </a>
            </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }

};

// Function for Most Popular videos 
const getMostPopularVideos = async () => {
    try {
        const getpopularVideo = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${Youtube_ID}&maxResults=30&order=viewCount&regionCode=IN&key=${Api_Key}`);
        console.log(getpopularVideo);

        const videos = getpopularVideo.data.items;
        videos.forEach(video => {
            const videoId = video.id.videoId;
            const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
            const videoTitle = video.snippet.title;
            const videoThumnnail = video.snippet.thumbnails.medium.url;

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".mostPopular-cards-content").innerHTML +=
                `<div class="card mx-2 my-2">
        <a href="${videoUrl}" class="mostpopular_video_title_link text-decoration-none" target="_blank">
        <div class="embed-responsive embed-responsive-16by9">  
        <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
        </div>
        <div class="card-body p-0 py-3 px-2">
            <p class="card-title mostpopular_video_title">${videoTitle}</p>
        </div>
        </a>
    </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

// Function for Comedy Movies videos 
const getComedyMoviesVideos = async () => {
    try {
        const playlistId ="PLQlbrD8-eMGVf6LK-zz5pgTbl6AYocaeR"
        const getMoviesVideo = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${Api_Key}`);
        console.log(getMoviesVideo);

        videos = getMoviesVideo.data.items;
        videos.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
            const videoTitle = video.snippet.title;
            const videoThumnnail = video.snippet.thumbnails.medium.url;

            // Store data in the object
            FetchedVideosData.videosArray.push({
                videoUrl,
                videoTitle,
                videoThumnnail
            });

            document.querySelector(".movies-cards-content").innerHTML +=
                `<div class="card mx-2 my-2">
        <a href="${videoUrl}" class="movies_video_title_link text-decoration-none" target="_blank">
        <div class="embed-responsive embed-responsive-16by9">  
        <img src="${videoThumnnail}" alt="thumbnails" class="card-img-top img-fluid">
        </div>
        <div class="card-body p-0 py-3 px-2">
            <p class="card-title movies_video_title">${videoTitle}</p>
        </div>
        </a>
    </div>`
        });
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}

getYoutubeSubscribers();
getYoutubeTitle();
getYoutubeVideoDetails();
getMostPopularVideos();
getComedyMoviesVideos();
//console.log(FetchedVideosData)


//Slider Code for Latest Videos
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')

function handleScrollNext(direction) {
    const cards = document.querySelector('.cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev(direction) {
    const cards = document.querySelector('.cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next.addEventListener('click', handleScrollNext)
prev.addEventListener('click', handleScrollPrev)




//Slider Code for Popular Videos
const next_mostPopular = document.querySelector('#next_mostPopular')
const prev_mostPopular = document.querySelector('#prev_mostPopular')

function handleScrollNext_mostPopular(direction) {
    const cards = document.querySelector('.mostPopular-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_mostPopular(direction) {
    const cards = document.querySelector('.mostPopular-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_mostPopular.addEventListener('click', handleScrollNext_mostPopular)
prev_mostPopular.addEventListener('click', handleScrollPrev_mostPopular)


//Slider Code for Movies Videos
const next_movies = document.querySelector('#next_movies')
const prev_movies = document.querySelector('#prev_movies')

function handleScrollNext_movies(direction) {
    const cards = document.querySelector('.mostPoupler-cards-content')
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
function handleScrollPrev_movies(direction) {
    const cards = document.querySelector('.mostPoupler-cards-content')
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
}
next_movies.addEventListener('click', handleScrollNext_movies)
prev_movies.addEventListener('click', handleScrollPrev_movies)



//Slider Function Code for Search Videos
const sliderSearch = () => {
    const next_search = document.querySelector('#next_search')
    const prev_search = document.querySelector('#prev_search')

    function handleScrollNext_search(direction) {
        const cards = document.querySelector('.search-cards-content')
        cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
    }
    function handleScrollPrev_search(direction) {
        const cards = document.querySelector('.search-cards-content')
        cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100
    }
    next_search.addEventListener('click', handleScrollNext_search)
    prev_search.addEventListener('click', handleScrollPrev_search)
}







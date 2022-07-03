
const genreFunc = (genre_id) => {
  const  imageUrl = 'https://image.tmdb.org/t/p/';
  const  apiBaseURL = 'https://api.themoviedb.org/3/';
  const  apiKey = 'af6b563ec687bcd938b75f366399aa4c'
  const  actionUrl = `${apiBaseURL}genre/${genre_id}/movies?api_key=${apiKey}` 
  

  //function that fetch genre details
  const fetchGenre = async() => {
    const response = await fetch(actionUrl);
    const result = await response.json();
    return result;
  }

  //function that fetch each key(for youtube) from each genre
  const fetchKey = async(movieId) => {
    const   thisMovieUrl = `${apiBaseURL}movie/${movieId}/videos?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=`;
    const response = await (fetch(thisMovieUrl));
    const data = await response.json();
    const key = data.results[0]?.key;
    return key;
  }


  const movieGrid = document.getElementById("movie-grid");
  let  loader =`<div class="loading"></div>`
  movieGrid.innerHTML = loader;
  fetchGenre()
  .then(data => {
    const genreData = data.results;
    //console.log(genreData)
    genreData.forEach(result => {
      fetchKey(result.id)
      .then(key => {
        //console.log(key)
        //console.log(result.poster_path)
        movieGrid.innerHTML += movieContentHTML(result, key)
        inner();
      })
    })  
  })
  .catch(error => {
    console.log(error)
  })
  

 

 
  function movieContentHTML(data, youtubeKey) {
    const {poster_path, original_title, release_date, overview, vote_average } = data;
    		
    const result = ` 
    <div class="eachMovie">
      <button type="button" id = "btn" class="btnModal"><img  class="image"src=${imageUrl}w200${poster_path}></button>	
      <div class="modal fade" id="exampleModal"role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class= "modal-box">
          <p class="close">&times</p>
          <div class = "modal-content">
            <div class="moviePosterInModal">
              <a href="#"><img id="modalImage"src=${imageUrl}w200${poster_path}></a>
            </div><br>
            <div class="movieDetails">
              <div class="movieName">${original_title}</div><br>
              <div class="linkToTrailer"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</div><br>

              <iframe loading= "lazy" id="videoPlayer" height="345" width="720" src="https://www.youtube.com/embed/${youtubeKey}?autoplay=1&controls=0&iv_load_policy=3&loop=1&modestbranding=1&rel=0" frameborder = "0" allow="autoplay" allowfullscreen>
              </iframe>

              <div class="release">Release Date: ${release_date}</div><br>
              <div class="overview">${overview}</div><br>
              <div class="rating">Rating: ${vote_average}/10
            </div><br>
            <div class="grid-wrapper">
              <div class="btn-primary">8:30 AM</div>
              <div class="btn-primary">10:00 AM</div>
              <div class="btn-primary">12:30 PM</div>
              <div class="btn-primary">3:00 PM</div>
              <div class="btn-primary">4:10 PM</div>
              <div class="btn-primary">5:30 PM</div>
              <div class="btn-primary">8:00 PM</div>
              <div class="btn-primary">10:30 PM</div>
            </div>
          </div>
        </div> 
      </div>
    </div>  `
      return result    
    }

    function inner() {
      const movieTitleLabel = document.getElementById("movieTitleLabel");
      let loading = document.querySelector('.loading')
      loading.style.display = "none"
   
   function titleFunc(){
     const helper = {
       28: 'ACTION',
       16: 'ANIMATION',
       35: 'COMEDY',
       80: 'CRIME',
       18: 'DRAMA',
       10402: 'MUSIC',
       10749: 'ROMANCE'
     }
     const genre = helper[genre_id] || 'Random'
     return genre
   }

   let movieTitle = titleFunc()
   movieTitleLabel.innerHTML = movieTitle;
   
    
   const modal = document.querySelectorAll(".modal");
   const movieButton =  document.querySelectorAll(".btnModal");
   const closeButton = document.querySelectorAll(".close");
   const overlay = document.querySelector(".overlay")
   const trailer = document.querySelectorAll(".linkToTrailer")
   const videoPlayer = document.querySelectorAll("#videoPlayer")
   const contentModal = document.querySelectorAll('#content-modal')
   
 
   for( let i=0; i < movieButton.length;  i++) {
     movieButton[i].addEventListener ("click", (e) => {
       modal[i].style.display = "flex";
       overlay.style.display = "block";
     })
 
     const closeModal = (event) =>{
      for(let i = 0; i < modal.length; i++){
          if(event.target == modal[i]){
           videoPlayer[i].src = '';
           modal[i].style.display = 'none'  
           overlay.style.display = "none";
          }
      }
      }

      window.onclick = (event) => {
      closeModal(event);
      }
    
    trailer[i].addEventListener ("click", (e) => {
        videoPlayer[i].style.display = "block"
    })

    closeButton[i].addEventListener ("click", () => {
      videoPlayer[i].src = '';
      modal[i].style.display = "none";
      overlay.style.display = "none";
      console.log('cancel')
    })
   }
 

    } 
  
}

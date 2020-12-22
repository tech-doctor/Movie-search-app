
const genre = document.querySelector('.desktop-view .genre')
const genreList = document.querySelector('.desktop-view .genre-lists')
const mobileGenre = document.querySelector('.mobile-view .genre')
const mobileGenreList = document.querySelector('.mobile-genrelists')

genre.addEventListener('mousemove', (e) => {
	genreList.style.display = "block" 

})
window.onclick = function(e){
	if (e.target !== genreList){
			genreList.style.display = "none" 
	}     
}

window.onresize = function(event){
	genreList.style.display = "none" 
}

const genreIcon = document.querySelector('#genre-icon')
mobileGenre.addEventListener('click', (e) =>{
	mobileGenreList.classList.toggle('toggle')
	genreIcon.classList.toggle('transform')
})

const mobileView = document.querySelector('.mobile-view')
const barIcon = document.querySelector('.barIcon')

barIcon.addEventListener('click', (e) => {
	mobileView.classList.toggle('toggle')
})



const search = document.getElementById("search-button");
//const ul = document.getElementById("content");
const searchInput =  document.getElementById("search-box");
const movieGrid =document.getElementById("movie-grid");
const movieTitleLabel = document.getElementById("movieTitleLabel");
const paragraphText = document.querySelector('.paragraphText');



let imageUrl = 'https://image.tmdb.org/t/p/';
let searchResult = '';
 
 
search.addEventListener("click",  (event) => {
  event.preventDefault()
  paragraphText.style.display = "none"
  let searchResult = searchInput.value;
  console.log(searchResult);
  searchMovie();
 // movieGrid.innerHTML += movieContentHTML()
  searchInput.value = '';
})



function searchMovie()  {
let searchResult = searchInput.value
let searchMovieUrl = "http://api.themoviedb.org/3/search/movie?api_key=af6b563ec687bcd938b75f366399aa4c&language=en-US&page=1&include_adult=false&query=" + searchResult;
  
let  loader =`<div class="loading"></div>`
  movieGrid.innerHTML = loader;
fetch(searchMovieUrl)
.then(resp => {
  if(resp.status == 422){
   movieGrid.innerHTML = "Please enter a movie name... "
  }
  
  return resp;
})
.then (resp => resp.json())
.then(data => {
  console.log(data);
  let dataResult = data.results;
   dataResult.forEach(dataResult => {
    let mid = dataResult.id

  //To get  detailed data of each movies
	let  thisMovieUrl = 'https://api.themoviedb.org/3/movie/'+mid+'/videos?api_key=af6b563ec687bcd938b75f366399aa4c&language=en-US&page=1&include_adult=false&query=';
	
  fetch(thisMovieUrl)
.then (resp => resp.json())
.then(movieKey => {
  console.log(movieKey);

  let poster = imageUrl+'w200'+dataResult.poster_path;
  let title = dataResult.original_title;
  let releaseDate = dataResult.release_date;
  let overview = dataResult.overview;
  let voteAverage = dataResult.vote_average;		
  let youtubeKey = movieKey.results[0].key;


  let youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
  

const movieContentHTML = () => {
  const result = ` 
  <div class="eachMovie">
    <button type="button" id = "btn" class="btnModal"><img  class="image"src="${poster}"></button>	
    <div class="modal fade" id="exampleModal"role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class= "modal-box">
        <p class="close">&times</p>
        <div class = "modal-content">
          <div class="moviePosterInModal">
            <a href="${youtubeLink}"><img id="modalImage"src="${poster}"></a>
          </div><br>
          <div class="movieDetails">
            <div class="movieName">${title}</div><br>
            <div class="linkToTrailer"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</div><br>
            <iframe id="videoPlayer" height="345" width="720" src="https://www.youtube.com/embed/${youtubeKey}" frameborder = "0" allowfullscreen>
            </iframe>
            <div class="release">Release Date: ${releaseDate}</div><br>
            <div class="overview">${overview}</div><br>
            <div class="rating">Rating: ${voteAverage}/10
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
  
    movieGrid.innerHTML += movieContentHTML()
   
   
   let loading = document.querySelector('.loading')
  loading.style.display = "none"
	

  let movieTitle = searchResult.toUpperCase()
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
})
	})
	
})
.catch(error => {
   console.log(error)
})	

}


	   




	
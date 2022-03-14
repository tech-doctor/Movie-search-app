async function fetchHTMLtext() {
  const response = await fetch('/Component/header.html');
  const result = await response.text();
  return result;
}

fetchHTMLtext()
.then(html => {
  const header = document.querySelector('.header')
  header.innerHTML = html
  navbar()
});

function uploadData(){
  const movieBody = document.querySelectorAll('.div-area .body');
  /// Url variables from the API
  const imageUrl = 'https://image.tmdb.org/t/p/';
  const apiBaseURL = 'https://api.themoviedb.org/3/';
  const apiKey = 'af6b563ec687bcd938b75f366399aa4c'
  const nowPlayingUrl = `${apiBaseURL}movie/now_playing?api_key=${apiKey}`
  const topRatedUrl = `${apiBaseURL}movie/top_rated?api_key=${apiKey}`
  
  //fetch data from the API
   const fetchAll = async() => {
      const [nowPlayingResponse, topRatedResponse] = await Promise.all([
        fetch(nowPlayingUrl),
        fetch(topRatedUrl)
      ]);
      const nowPlaying = await nowPlayingResponse.json();
      const topRated = await topRatedResponse.json();
      return [nowPlaying, topRated]
    }
    
    const spinner = document.querySelectorAll('.spinner')
    movieBody.innerHTML = `<div class="spinner"></div>`
    fetchAll()
   .then(([nowPlaying,topRated]) => {
     const nowPlayingData = shuffle(nowPlaying.results).slice(4,10)
     const topRatedData = shuffle(topRated.results).slice(4,10)
      //console.log(nowPlaying)
      nowPlayingData.forEach(element => {
        fetchKey(element.id)
        .then(key => {
          render(element, key, 0)
         })
      });
      topRatedData.forEach(element => {
        fetchKey(element.id)
        .then(key => {
          render(element, key, 1)
         }) 
      }) 
      spinner.forEach(spinner => {
        spinner.style.display = "none"
       })
      
    })
  
    
    .catch(error => {
      console.log(error)
    })
  
    //fetch each key from the API
    const fetchKey = async(movieId) => {
      const   thisMovieUrl = `${apiBaseURL}movie/${movieId}+/videos?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=`;
        const response = await (fetch(thisMovieUrl));
        const data = await response.json();
        const key = data.results[0]?.key;
        return key;
    }
  
    ///Each card on the list
  const eachCard = (data, youtubeLink) => {
     const {title, release_date,poster_path } = data;
     const result = 
     `<div class="card">
       <div class="play-icon"><a  href= ${youtubeLink} ><i class=" fas fa-play"></i></a></div>
       <div class="image">
         <img alt = "" src=${imageUrl}w200${poster_path}>
       </div>
       <div class="details">
          <p class="title">${title}</p>
         <p class="date">${release_date}</p>
       </div>
     </div>`
     return result
   }
  
    //functions that render datas needed to the DOM
  const render = (data, key, index) => {
    const fetchedLink = `https://www.youtube.com/watch?v=${key}`
      //display each data on the DOM
      movieBody[index].innerHTML += eachCard(data, fetchedLink);
      //set the card and play icon from the DOM in variable
      const movieCard = document.querySelectorAll('.div-area .body .card');
      const playIcon = document.querySelectorAll('.div-area .body .play-icon i'); 
      for(let i = 0; i  < movieCard.length; i++){
      movieCard[i].addEventListener('mousemove', (e) => {
        playIcon[i].style.display = "block"
        //movieCard[i].style.transform = scale(1.1); 
      })
      movieCard[i].addEventListener('mouseleave', (e) => {
        playIcon[i].style.display = "none" 
      })
      
    }
  }
}

//uploadData()
const body = document.querySelectorAll('.div-area .body')
 console.log(body)


const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      console.log(entry)
      if(!entry.isIntersecting){
        return;
      }else{
        uploadData()
        body.forEach(body => {
          body.classList.toggle('move-up')
        })  
      }
      if(entry.isIntersecting) observer.unobserve(entry.target)
    })
    console.log(entries)
    
  }, {
    threshold: 0.5,
    rootMargin: '100px',
  }
)



 const extraDiv = document.querySelector('.extra-div');


  observer.observe(extraDiv);











  // let  angle = document.querySelectorAll('.angle')
  // let  angleLeft = document.querySelector('.angle_left');
  // let  angleRight = document.querySelector('.angle_right');
  // let  movieCard = document.querySelectorAll(' .card')
  // let  movie_page = Math.ceil(movieCard.length/4);
  // let  l = 0;
  // let  movePer = 25.34;
  // let  maxMove = 203;
  
  
  
  // let mobile_view = window.matchMedia("(max-width: 760px)");
  
  //  if(mobile_view.matches){
  //    movePer = 50.36;
  //    maxMove = 504;
  //  }
  
  // let right_mover = () => {
  //   l = l + movePer;
  //   if(movieCard == 1) {
  //     console.log('true')
  //     l = 0
  //   }
  //   for(const i of movieCard){
  //     if( l > maxMove) {
  //       l = l - movePer;
  //     }
  //     i.style.left = '-' + l + '%';
  //   }
  // }
  
  // let left_mover = () => {
  //   l = l -movePer;
  //   if( l <= 0){
  //     l = 0;
  //   }
  //   for(const i of movieCard ){
  //     if(movie_page > 1) 
  //      i.style.left = '-' + l + '%'
  //   }
  // }
  
  //  angle[0].addEventListener('click', () => {
  //    console.log('left')
  //    left_mover();
  
  //  })
  
  //  angle[1].addEventListener('click', () => {
  //   console.log('right')
  //   right_mover();
  // })







const angleUpButton = document.querySelector('.body .scroll_up');
window.addEventListener('scroll', scrollFunction)
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    angleUpButton.style.display = "block";
  } else {
    angleUpButton.style.display = "none";
  }
}
angleUpButton.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  console.log('up')
})




// function that shuffls the array data;
  function  shuffle(arr){
    let arrLength = arr.length;
    let temp;
    let index;	
    while (arrLength > 0) {
      index = Math.floor(Math.random() * arrLength);
      arrLength--;
      temp = arr[arrLength];
      arr[arrLength] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }


//   var slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }





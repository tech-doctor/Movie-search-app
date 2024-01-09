const copyRight = document.getElementById('copyright')
const currentYear = new Date().getFullYear();
copyRight.textContent = `All reserved © ${currentYear}`;


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
      console.log(nowPlaying)
      return [nowPlaying, topRated]
    }
    
    const spinner = document.querySelectorAll('.home-loader ')
    movieBody.innerHTML = `<div class="home-loader"></div>`
    fetchAll()
   .then(([nowPlaying,topRated]) => {
     //console.log(nowPlaying.results, topRated.results)
     const nowPlayingData = nowPlaying.results
     const topRatedData = topRated.results
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
     const minimalTitle = TextAbstract(title, 30);
     const result = 
     `<div class="card">
       <div class="play-icon"><a  href= ${youtubeLink} ><i class=" fas fa-play"></i></a></div>
       <div class="image">
         <img loading ="lazy" alt = ${title} src=${imageUrl}w300${poster_path}>
       </div>
       <div class="details">
          <p class="title">${minimalTitle}</p>
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
// console.log(body)


const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
     // console.log(entry)
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
   // console.log(entries)
    
  }, {
    threshold: 0.5,
    rootMargin: '100px',
  }
)



 const extraDiv = document.querySelector('.extra-div');
  observer.observe(extraDiv);


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



  const clickFunctionRight = (getSlider) => {
    let slider =  document.querySelector(`.${getSlider}`)
    //console.log(slider)
    slider.scrollLeft = slider.scrollLeft + 500
}

const clickFunctionLeft = (getSlider) => {
    let slider =  document.querySelector(`.${getSlider}`)
    slider.scrollLeft = slider.scrollLeft - 500
}



function TextAbstract(text, length) {
  if (text == null) {
    return "";
  }
  if (text.length <= length) {
      return text;
  }
  text = text.substring(0, length);
  last = text.lastIndexOf(" ");
  text = text.substring(0, last);
  return text + " ...";
}



const genre = document.querySelector('.desktop-view .genre')
const genreList = document.querySelector('.desktop-view .genre-lists')
const mobileGenre = document.querySelector('.mobile-view .genre')
const mobileGenreList = document.querySelector('.mobile-genrelists')

const mobileView = document.querySelector('.mobile-view')
const barIcon = document.querySelector('.barIcon')

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



barIcon.addEventListener('click', (e) => {
	mobileView.classList.toggle('toggle')
})
 





// fix problems :
/*
main_part:
1.Showing Image by API=ok
2.Enter trigger on image search Button=ok
3.negative time problem=ok
4.slider showing=ok
5.select unselect=ok;

for bonus marks:
1.Enter trigger features on duration button
2.loading spinner
3.if search input is empty then show an alert
4.catch the API error
*/




const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const searchInput = document.getElementById("search");

// selected image 
let sliders = [];


//my API key=17475640-f7b4730b8a058e6d7688ea10f
const KEY = '17475640-f7b4730b8a058e6d7688ea10f';
const getImages = (query) => {

        if (query === '') {
            alert("Enter a Valid Value for get image");

        } else {
            // call spinner:
            toggleSpinner(true);
            // API collect and Showing Image problem fix
            fetch("https://pixabay.com/api/?key=" + KEY + "&q=" + encodeURIComponent(query))
                .then(response => response.json())
                .then(data => {
                    showImages(data.hits);
                    console.log(data.hits);
                })
                .catch(err => {
                    // If API is missing :
                    alert("API is unavailable or API key is wrong" + "\n" + err);

                });
        }

    }
    // show images 
const showImages = (images) => {
    imagesArea.style.display = 'block';
    gallery.innerHTML = '';

    // show gallery title
    galleryHeader.style.display = 'flex';

    images.forEach(image => {
        let div = document.createElement('div');
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
        div.innerHTML = `<img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
        gallery.appendChild(div);
        // after load data toggle spinner is called of vanish loading;
        toggleSpinner(false);
    })


}


// select item for create slider
let slideIndex = 0;
const selectItem = (event, img) => {
    let element = event.target;
    element.classList.toggle('added');



    let item = sliders.indexOf(img);
    if (item === -1) {
        sliders.push(img);

    } else {
        sliders.splice(item, 1);

    }


}


// slider created
var timer
const createSlider = () => {
    // check slider image length
    if (sliders.length < 2) {
        alert('Select at least 2 image.')
        return;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext);

    document.querySelector('.main').style.display = 'block';

    // hide image aria
    imagesArea.style.display = 'none';
    const duration = document.getElementById('duration').value || 1000;

    sliders.forEach(slide => {
        let item = document.createElement('div')
        item.className = "slider-item";
        item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
        sliderContainer.appendChild(item)
    })
    changeSlide(0);

    // solve the negative timing issue

    timer = setInterval(function() {

        slideIndex++;
        changeSlide(slideIndex);
    }, Math.abs(duration));

    // if (duration >= 0) {
    // timer = setInterval(function() {

    //     slideIndex++;
    //     changeSlide(slideIndex);
    // }, Math.abs(duration));
    // } else {
    //     timer = setInterval(function() {

    //         slideIndex++;
    //         changeSlide(slideIndex);
    //     }, duration);
    // }

}

// change slider index 
const changeItem = index => {
    changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

    const items = document.querySelectorAll('.slider-item');
    if (index < 0) {
        slideIndex = items.length - 1
        index = slideIndex;
    };

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }

    items.forEach(item => {
        item.style.display = "none"
    })

    items[index].style.display = "block"
}


//Keyboards Enter features:

searchInput.addEventListener("keypress", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
        toggleSpinner();
        document.getElementById("search-btn").click();
        document.querySelector('.main').style.display = 'none';
        clearInterval(timer);
        const search = document.getElementById('search');
        getImages(search.value)
        sliders.length = 0;

    }

});


// search button;
searchBtn.addEventListener('click', function() {
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;

})

sliderBtn.addEventListener('click', function() {
    createSlider();
})






//  Extra features for this Assignment: added spinner :
const toggleSpinner = (show) => {
    const spinner = document.getElementById("spinnerId");
    if (show) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
}



// keyboard enter trigger features added in take duration from user:
var durationInput = document.getElementById("duration");
durationInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        document.getElementById("create-slider").click();
        createSlider();
    }
});
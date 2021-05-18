let photoArray = [];
let ready = false;
let totalImages = 0;
let loadedImages = 0;
const loader = document.getElementById('loader');
const alertBox = document.getElementById('alertBox');
const imgContainer = document.getElementById('img-container');
const apikey = 'gbc8LnHwYqSPjFn1K7Brff2iyYqwNGjSlAt0A9rcMlU';
const imgcount = 10;
const fetchUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${imgcount}`;

function setAtt(elem,att){
    for(key in att){
        elem.setAttribute(key,att[key]);
    }
}

function imageLoaded(){
    loadedImages++;
    console.log(`Fetching ${loadedImages} of ${totalImages}`);
    alertBox.textContent = `Fetching ${loadedImages} of ${totalImages}`;
    if(loadedImages == totalImages){
        loadedImages=0;
        ready = true;
        alertBox.setAttribute('hidden',true);
    }
}


function generatePhoto(){
    photoArray.forEach(function(item){
        const link = document.createElement('a');
        setAtt(link, {
            href : item.links.html,
            target : '_blank'
        })
        const photo = document.createElement('img');
        setAtt(photo, {
            src : item.urls.regular,
            alt : item.alt_description,
            title : item.alt_description
        })
        totalImages=photoArray.length;
        photo.addEventListener('load',imageLoaded)
        link.appendChild(photo);
        imgContainer.appendChild(link);
        loader.setAttribute('hidden',true)

    });
}
async function getPhoto(){
    try{
    const photoResponse = await fetch(fetchUrl);
    photoArray = await photoResponse.json();
    console.log(photoArray);
    generatePhoto();
    }
    catch(err){
        console.log(`Error code : ${err}`)
    }
}

getPhoto();
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        loadedImages=0;
        console.log('loading');
        ready = false;
        alertBox.removeAttribute('hidden');
        getPhoto();
       
    }
})
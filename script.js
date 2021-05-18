let photoArray = []
const loader = document.getElementById('loader');
const imgContainer = document.getElementById('img-container');
const apikey = 'gbc8LnHwYqSPjFn1K7Brff2iyYqwNGjSlAt0A9rcMlU';
const imgcount = 10;
const fetchUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${imgcount}`;

function setAtt(elem,att){
    for(key in att){
        elem.setAttribute(key,att[key]);
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
        link.appendChild(photo);
        imgContainer.appendChild(link);

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
        console.log(err)
    }
}

getPhoto();
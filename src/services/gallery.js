if (typeof window != 'undefined' && document.querySelector('.gallery-item')) {
    const Gallery = require('@marcom/ac-gallery').Gallery;
    const carousel = document.querySelector(".gallery");
  
    // Video gallery control functionality
    if (document.querySelector('.video-gallery')) {
      // Promise based video loading function
      const videos = [];
      document.querySelectorAll('video').forEach(video => videos.push(video.firstElementChild.src));
      const loadVideos = async (videoUrlArray) => {
          const promiseArray = [];
          const videoArray = [];
  
          for (let videoUrl of videoUrlArray) {
              promiseArray.push(new Promise(resolve => {
                  const video = document.createElement("video");
                  video.onloadedmetadata = resolve;
                  video.onloadedmetadata = function() {
                      resolve();
                  };
  
                  video.setAttribute("src", videoUrl);
                  videoArray.push(video);
              }));
          }
  
          await Promise.all(promiseArray);
          return videoArray;
      }
  
      loadVideos(videos).then(() => {
        //Get elements for video control
        const video = document.getElementsByClassName("gallery-video");
        const controls = document.getElementsByClassName("gallery-controls");
        const icon = document.getElementsByClassName("gallery-icon");
      
        //Get cta button
        const ctaArray = document.querySelectorAll('div.gallery-copy-block > div.copy-block > div.cta > button.button');
        //Get gallery items
        const galleryItems = document.querySelector('.video-gallery .gallery .gallery-items');
        //Get gallery item
        const galleryItemHeight = document.querySelector('.gallery-item');
        
        for (let i = 0; i < video.length; i++) {
          //Set position for control
          if (document.body.clientWidth <= 450) {
            controls[i].style.top = `${video[i].offsetHeight - (.28 * video[i].offsetHeight)}px`;
            controls[i].style.left = `${video[i].offsetWidth - (.14 * video[i].offsetWidth)}px`;
          } else {
            controls[i].style.top = `${video[i].offsetHeight - (.14 * video[i].offsetHeight)}px`;
            controls[i].style.left = `${video[i].offsetWidth - (.07 * video[i].offsetWidth)}px`;
          }
  
          //Video control logic
          controls[i].addEventListener("click", function() {
            if (video[i].paused === true) {
              // Play the video
              video[i].play();
              icon[i].className = "icon gallery-icon light icon-pausecircle"
            } else {
              // Pause the video
              video[i].pause();
              icon[i].className = "icon gallery-icon light icon-playcircle"
            }
          });
        }
      
        //Function to toggle cta style
        const toggleButtonStyle = () => {
          if (document.body.clientWidth <= 734) {
            ctaArray.forEach(cta => {
              cta.classList.remove('button-clear-white');
              cta.classList.add('button-clear-color');
            });
          } else {
            ctaArray.forEach(cta => {
              cta.classList.remove('button-clear-color');
              cta.classList.add('button-clear-white');
            });
          }
        }
      
        //Set initial height of gallery items wrapper to height of children
        galleryItems.style.height = `${galleryItemHeight.offsetHeight}px`;
        //Set initial cta styling
        toggleButtonStyle();
      
        window.addEventListener('resize', () => {
          for (let i = 0; i < video.length; i++) {
            if (document.body.clientWidth <= 450) {
              controls[i].style.top = `${video[i].offsetHeight - (.28 * video[i].offsetHeight)}px`;
              controls[i].style.left = `${video[i].offsetWidth - (.14 * video[i].offsetWidth)}px`;
            } else {
              controls[i].style.top = `${video[i].offsetHeight - (.14 * video[i].offsetHeight)}px`;
              controls[i].style.left = `${video[i].offsetWidth - (.07 * video[i].offsetWidth)}px`;
            }
          }
          //Adjust height of gallery items wrapper to height of children
          galleryItems.style.height = `${galleryItemHeight.offsetHeight}px`;
          toggleButtonStyle();
        });
      });
    }
  
    //News article page gallery
    if (document.querySelector('.newsArticle')) {
      // Promise based image loading function
      const images = [];
      document.querySelectorAll('.tile-media img').forEach(image => {
          images.push(image.src);
      });
      async function loadImages(imageUrlArray) {
          const promiseArray = []; // create an array for promises
          const imageArray = []; // array for the images
      
          for (let imageUrl of imageUrlArray) {
              promiseArray.push(new Promise(resolve => {
                  const img = new Image();
                  img.onload = resolve; // Replace this with a 'loading' variable while image is loading?
                  img.onload = function() {
                      // do stuff with the image if necessary
                      // resolve the promise, indicating that the image has been loaded
                      resolve();
                  };
      
                  img.src = imageUrl;
                  imageArray.push(img);
              }));
          }
      
          await Promise.all(promiseArray); // wait for all the images to be loaded
          return imageArray;
      }
  
      loadImages(images).then(() => {
        //Get gallery items
        const galleryItems = document.querySelector('.gallery > .gallery-items')
        //Get gallery item
        const galleryItem = document.querySelectorAll('.gallery-item');
        //Get tile
        const tile = document.querySelector('.tile');
  
        //Set initial height of gallery items wrapper to height of children
        galleryItems.style.height = `${tile.offsetHeight}px`;
        galleryItem.forEach(item => {
          item.style.height = `${tile.offsetHeight}px`;
        });
       
        window.addEventListener('resize', () => { 
          //Adjust height of gallery items wrapper to height of children
          galleryItems.style.height = `${tile.offsetHeight}px`;
          galleryItem.forEach(item => {
            item.style.height = `${tile.offsetHeight}px`;
          });
        });
      });
    }
  
    // ----- JS for gallery -----
    let galleryItem = document.querySelectorAll('.gallery-item');
    let dotnav = document.getElementsByClassName("dotnav-gallery-item");
    if (galleryItem.length > 1 && !document.querySelector('.newsArticle')) {
      Gallery.autoCreate({
        addPaddleNav: true,
        context: carousel,
        wrapAround: true,
        touch: true
      });
    } else if (galleryItem.length > 1 && document.querySelector('.newsArticle')) {
      Gallery.autoCreate({
        addPaddleNav: true,
        context: carousel,
        wrapAround: false,
        touch: true
      });
    } else {
      dotnav[0].style.display = "none";
      Gallery.autoCreate({
        addPaddleNav: false,
        touch: true
      });
    }
  }
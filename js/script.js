/* ================= M O D A L =========*/

var modal = {
    currentCat: null,
    cats: [
        {
            clickCount: 0,
            name: 'tommy',
            imgSrc: 'cat_picture1.jpg'
        },
        {
            clickCount: 0,
            name: 'cutie',
            imgSrc: 'cat_picture2.jpg'
        },
        {
            clickCount: 0,
            name: 'scary',
            imgSrc: 'cat_picture3.jpg'
        },
        {
            clickCount: 0,
            name: 'naughty',
            imgSrc: 'cat_picture4.jpg'
        },
        {
            clickCount: 0,
            name: 'Sleepy',
            imgSrc: 'cat_picture5.jpg'
        }
    ]
};

/* =========== Octopus ============ */

var octopus = {

    init: function() {
      //to initialize i.e to set current cat to first one
      modal.currentCat = modal.cats[0];

      // tell the views to initialize the cat view and the cat list
      catListView.init();
      catView.init();
    },

    getCurrentCat: function() {
      return modal.currentCat;
    },

    getCats: function() {
      return modal.cats;
    },

    //set the current selected cat to current cat
    setCurrentCat: function(cat){
      modal.currentCat = cat;
    },

    //increment the count of the current selected cat
    incrementCounter: function(){
      modal.currentCat.clickCount++;
      catView.render();   //to update the count in the view
    }
};

/* ========== View ==========*/
 var catView = {

    init: function(){
      // stores pointers to the DOM elements
      this.catElem = document.getElementById('cat');
      this.catNameElem = document.getElementById('cat-name');
      this.catImageElem = document.getElementById('cat-img');
      this.countElem = document.getElementById('cat-count');

      // on click listener to increment countElem
      this.catImageElem.addEventListener('click', function() {
          octopus.incrementCounter();
      });

     //render this view
     this.render();
   },

   render: function(){
     //update the DOM element
     var currentCat = octopus.getCurrentCat();
     this.countElem.textContent = currentCat.clickCount;
     this.catNameElem.textContent = currentCat.name;
     this.catImageElem.src = currentCat.imgSrc;
   }
 };

 var catListView = {

    init: function() {
      //create the calt List in DOM
      this.catListElem = document.getElementById('cat-list');

      // render the cat-list view t ot he DOM
      this.render();
    },

    render: function(){
      var cat, elem, i;
      // get the cats we'll be rendering from the octopus
      var cats = octopus.getCats();

      // empty the cat list
      this.catListElem.innerHTML = '';

      // loop over the cats
      for (i = 0; i < cats.length; i++) {
          // this is the cat we're currently looping over
          cat = cats[i];

          // make a new cat list item and set its text
          elem = document.createElement('li');
          elem.textContent = cat.name;

          // on click, setCurrentCat and render the catView
          // (this uses our closure-in-a-loop trick to connect the value
          //  of the cat variable to the click event function)
          elem.addEventListener('click', (function(catCopy) {
              return function() {
                  octopus.setCurrentCat(catCopy);
                  catView.render();
              };
          })(cat));

          // finally, add the element to the list
          this.catListElem.appendChild(elem);
      }
    }
 };


// run it
octopus.init();

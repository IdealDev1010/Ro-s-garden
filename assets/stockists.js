 
jQuery( document ).ready(function() {
  var total=0;
 const places = document.querySelectorAll('[data-place]');
    const stores = document.querySelectorAll('[data-parent]');
    const details = document.querySelectorAll('details');

    details.forEach(d => d.addEventListener('click', toggleMainPlace));

    

    var lastClicked = null;

    
    
    // First place as default.
    clickPlace(places[0], stores);

    places.forEach(place => {
        place.addEventListener('click', e => clickPlace(e.target, stores));
    });

      function clickPlace(place, stores) {
        const current = place.dataset.place;
        place.parentElement.classList.remove('underline');
        // place.parent.classList.remove('underline');
        // Select current
        places.forEach(p => p.classList.remove('active'));
        place.classList.add('active');
        // Show in right side
        stores.forEach(store => {
            if (store.dataset.parent === current) {
                store.classList.add('visible');
            } else {
                store.classList.remove('visible');
            }
        });
         altoMayor();
     }


     
   
});




function closeOthers(e) {
        var details = document.querySelectorAll('details');;
        details.forEach(d => {
            if (e.currentTarget !== d) {
                d.open = false;
                d.classList.remove('underline');
            } else {
                if (!d.querySelector('div.active')) {
                    d.classList.add('underline');
                }
            }
        });
    }



function toggleMainPlace(e){
    var places = document.querySelectorAll('[data-place]');
    var stores = document.querySelectorAll('[data-parent]');
        closeOthers(e);
        e.preventDefault();

        // Apply only to Categories.
        if (e.target.classList.contains('place')) {
            return;
        }

        
        lastClicked = e.currentTarget.dataset.title;
        if (e.currentTarget.open && lastClicked !== e.currentTarget.dataset.title) {
            console.log('[Nox] was open, and was not the last clicked. CLOSING!', { lastClicked, title: e.currentTarget.dataset.title});
            e.currentTarget.open = false;
        } else {
            console.log('[Nox] OPENING!');
            e.currentTarget.open = true;
        }
        
        console.log('[Nox]', e.currentTarget);

        const currentCategory = e.currentTarget.dataset.title;

        console.log(`[Nox] Searching for ${currentCategory} stores.`);
        const storesForCategory = document.querySelectorAll(`[data-category="${currentCategory}"]`);
        console.log(`[Nox] Found ${storesForCategory.length} stores.`, { storesForCategory });

        // Underline category
        e.currentTarget.classList.add('underline');

        // Remove underline in all others.
        places.forEach(p => p.classList.remove('active'));

        // // Show all stores.
        // stores.forEach(store => {
        //     if (store.dataset.category === currentCategory) {
        //         store.classList.add('visible');
        //     } else {
        //         store.classList.remove('visible');
        //     }
        // });

       altoMayor();
    }

function altoMayor(){
  var h =0;
   $(".store-right .store.visible").each(function(){
     h=h+$(".store-right .store.visible").height()
  });

  var j =0;
  $(".place").each(function(){
     j=j+$(".place").height()
  });

  if (h>j){$(".stockists__main-container").css("height",h+"px");}else {$(".stockists__main-container").css("height",j+"px");}
        
        
}
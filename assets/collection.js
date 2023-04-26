const accordionBtns = document.querySelectorAll(".sf__accordion-button");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    //console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      //console.log(content.style.maxHeight);
    }
  };
});


// variable for the button
const mytogglebutton = document.querySelector('#my-toggle-button');

// variable for the target element that I will show and hide
const mytargetelement = document.querySelector('#my-hidden-element');

// event listener (onclick) with a function to toggle the class on the target element to show and hide it
mytogglebutton.addEventListener("click", function(e){
  // function actions/statements go here
  mytargetelement.classList.toggle('hidden');
   console.log(mytogglebutton);
   console.log(mytargetelement);
};
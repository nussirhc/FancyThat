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

$('.sf__sidebar-open').click(function() {
    $('#sf__sidebar').toggle('slow');
   console.log("sideba open");
});



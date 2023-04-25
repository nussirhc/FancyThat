const accordionBtns = document.querySelectorAll(".sf__accordion-button");
const filterBtns = document.querySelectorAll(".sf__sidebar-open");

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

filterBtns.forEach((filter) => {
  filter.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the filter is open
      content.style.maxHeight = null;
    } else {
      //if the filter is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});




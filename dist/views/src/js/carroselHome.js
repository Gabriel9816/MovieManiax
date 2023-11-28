const slider = document.querySelector(".carousel");

const handleLeftCLick = (e) => {
  console.log(slider);
  console.log(slider.offsetWidth);
  slider.scrollLeft -= slider.offsetWidth;
};
const handleRightCLick = (e) => {
  console.log(slider);
  console.log(slider.offsetWidth);
  slider.scrollLeft += slider.offsetWidth;
};

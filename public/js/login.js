


/* Update Header every second */
window.setInterval(function () {
  let title = document.querySelector("#cs_clicker_title")
  if(headerState) {
    title.innerHTML = "$CS-Clicker "
    headerState = false;
  } else {
    title.innerHTML = "$CS-Clicker_"
    headerState = true;
  }
}, 500)
var $ = require('jquery');

export default function filterCampgrounds (campgrounds, searchText) {
  let foundCampgrounds = campgrounds;

   foundCampgrounds = campgrounds.filter(function(campground) {
     let name = campground.name.toLowerCase();

     return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1;
 });
  return foundCampgrounds;
}

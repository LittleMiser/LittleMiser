function selectStudent(){
  $("#student").show();
  $("#stu").addClass("active");
  $("#stu").removeClass("disable");
  $("#cow").addClass("disable");
  $("#cow").removeClass("active");
}
function selectCow(){
  $("#student").hide();
  $("#stu").addClass("disable");
  $("#stu").removeClass("active");
  $("#cow").addClass("active");
  $("#cow").removeClass("disable");
}
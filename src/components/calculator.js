$(".val").click(function(e) {
  // prevent the link from acting like a link
  e.preventDefault();

  //grab this link's href value
  var a = $(this).attr("href");

  // append said value to the screen
  var screenVal;
  if (((a == "*-1") || (a == "%") || (a == "*") || (a == "/") || (a == "-") || (a == "+")) && ($(".outcome").val() == "")) return;
  else if (a == "*") screenVal = "×";
  else if (a == "/") screenVal = "÷";
  else if (a == "-") screenVal = "−";
  else screenVal = a;
  $(".screen").append(screenVal);

  // append same value to a hidden input
  $(".outcome").val($(".outcome").val() + a);
});

$(".equal").click(function() {
  // solve equation and put in hidden field
  $(".outcome").val(eval($(".outcome").val()));

  // take hidden field's value & put it on screen
  $(".screen").html(eval($(".outcome").val()));
});

$(".clear").click(function() {
  $(".outcome").val("");
  $(".screen").html("");
});
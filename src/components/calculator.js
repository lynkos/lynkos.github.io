$(".val").click(function(e) {
  e.preventDefault();

  var a = $(this).attr("href");
  var screenVal;

  if ((a == ".") && ($(".outcome").val().includes("."))) return;
  else if ((a == "*") && ($(".outcome").val()[$(".outcome").val().length - 1] == "*")) return;
  else if ((a == "/") && ($(".outcome").val()[$(".outcome").val().length - 1] == "/")) return;
  else if ((a == "+") && ($(".outcome").val()[$(".outcome").val().length - 1] == "+")) return;
  else if ((a == "-") && ($(".outcome").val()[$(".outcome").val().length - 1] == "-")) return;
  else if ((a == "%") && ($(".outcome").val()[$(".outcome").val().length - 1] == "%")) return;
  else if ((a == ".") && ($(".outcome").val().includes("."))) return;
  else if (((a == "*-1") || (a == "%") || (a == "*") || (a == "/") || (a == "-") || (a == "+")) && ($(".outcome").val() == "")) return;
  else if (a == "*") screenVal = "×";
  else if (a == "/") screenVal = "÷";
  else if (a == "-") screenVal = "−";
  else screenVal = a;

  $(".screen").append(screenVal);
  $(".outcome").val($(".outcome").val() + a);
});

$(".equal").click(function() {
  $(".outcome").val(eval($(".outcome").val()));
  $(".screen").html(eval($(".outcome").val()));
});

$(".clear").click(function() {
  $(".outcome").val("");
  $(".screen").html("");
});
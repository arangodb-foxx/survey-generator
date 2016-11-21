(function() {
  'use strict';

  var loadProduct = function (id) {
    $.get("showProduct/" + id, function (data) {
      var data = data[0];
      $("#question").hide();
      $("#product").show();
      $("#productHeader").text(data.title);
      $("#productDescription").text(data.description);
    });
  };


  var loadQuery = function(id) {
    $.get("showQuestion/" + id, function (data) {
      data = data[0];
      $("#questionHeader").text(data.query);
      var list = $("#answers");
      list.empty();
      for (var i = 0; i < data.answers.length; ++i) {
        var btn = $("<button>" + data.answers[i].text + " </button>");
        btn.click(function (next, isFinal) {
          if (isFinal) {
            loadProduct(next);
          } else {
            loadQuery(next);
          }
        }.bind(this, data.answers[i].nextId, data.answers[i].isFinal));
        var li = $("<li></li>");
        li.append(btn);
        list.append(li);
      }
    });
  };
  loadQuery("0");
}());

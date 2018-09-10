

$(document).ready(function() {

var clicked = false;

$(".row-column").on('change', function() {
    gridGenerator()
});

$("body").on('click', '.grid', function() {
        if($(".error-wrapper").length ==0 && $('.grid.shown').length == 0 && !$(this).hasClass("shown-first") && !$(this).hasClass("shown-second") && !$(this).hasClass("success-grid")) {
            var totalClicks = parseInt($(".total-clicks span").text())+1;
            console.log($(".total-clicks span").text())
            $(".total-clicks span").text(totalClicks)
            clicked = !clicked;
             if(clicked) {
            $(this).addClass('shown-first');
        } else {
            $(this).addClass('shown-second');
            if(parseInt($(this).find('span').text()) == parseInt($(".shown-first").find('span').text())) {
                $(".shown-first, .shown-second").addClass("success-grid");
                $(".grid").removeClass("shown-first");
                $(".grid").removeClass("shown-second");
                var totalCompleted = parseInt($(".total-completed span").text()) + 2;
                $(".total-completed span").text(totalCompleted);
                if($(".grid").length === $(".success-grid").length) {
                    $(".accuracy-rate").addClass("shown");
                    $(".accuracy-rate").find('span').text(Math.ceil((totalCompleted/totalClicks)*100) + '%');
                }
            } else {
                $(".game-wrapper").addClass("error-wrapper");
                setTimeout(function() {
                    $(".grid").removeClass("shown-first");
                    $(".grid").removeClass("shown-second");
                    $(".game-wrapper").removeClass("error-wrapper");
                }, 500);
            }
        }
        } else {
            alert("Select the grid after the numbers get hidden");
        }
       
});




function gridGenerator() {
    var rowItem = parseInt($("#row-select").val());
    var columnItem = parseInt($('#column-select').val())
    var rowHTML = '';
    var gridWrapper = $(".game-grid-wrapper");
    var gridValues = valueGenerator(rowItem, columnItem);
    $(".accuracy-rate").removeClass("shown")
    for(let row =1; row <= (rowItem*columnItem); row++) {
        if(gridValues.length >= row) {
         rowHTML +=`<div class="grid shown" style="width: ${100/columnItem}%"><span>${gridValues[row-1]}</span></div>`;
        }
    }
    gridWrapper.html(rowHTML);
    setTimeout(function() {
        $(".grid").removeClass("shown")    
    }, 1000)
}





function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  var inital= array;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}







function valueGenerator(rowItem, columnItem) {
    var arr = [];
    while(arr.length < ((rowItem*columnItem)/2)){
        var randomnumber = Math.floor(Math.random()*100) + 1;
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    var array1 = arr.concat(shuffle(arr))
    console.log(array1)
    return array1;
}











gridGenerator();
});

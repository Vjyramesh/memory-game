var clickCount=0, clickCount1=0;correctCount=0;
var click, clickModule = {
    settings:{
        grid : '.grid'
    },
    init: function(option){
        click = $.extend(this.settings, option);
        $('body').on('click', click.grid,this.gridActive);
        $('.row-count, .column-count').on('change', this.displayGrid)
    },
    displayGrid: function(){
        var rowCount = $(".row-count").val();
        var columnCount = $(".column-count").val();
        var html=""
        for(var i=1; i<= rowCount;i++){
            html+=`<div class="row">`
            for(var j=1; j<=columnCount;j++){
                var value = Math.floor(Math.random()*rowCount*columnCount);
                html+=`<div class="grid" data-id="${value}"></div>`;
            }
            html+=`</div>`
        }
        $(".game").html(html)
    },
    gridActive: function(){
        clickCount1++;
        if(!$(this).hasClass('correct') && !$(this).hasClass('active')){
            var _that = $(this);
        _that.text(_that.attr('data-id'))
        ++clickCount;
        $('.active').each(function(){
            if($(this).attr('data-id')==_that.attr('data-id')){
                $(this).addClass('correct').removeClass('active');
                _that.addClass('correct').removeClass('active');
                correctCount++;
                correctValue=1;
            }
        })
        if(clickCount!=2) {
            _that.addClass('active');
            clickCount=1;
        } else {
            setTimeout(function(){
                $('.active').text("");
                if(!_that.hasClass('correct')){

                    _that.text("")
                }
            $('.grid').removeClass('active');
            }, 2000)
            clickCount = 0;
        }
        }
        else {
            
            clickCount-1;
        }
        $(".correct-count").text(correctCount);
             $('.total-click').text(clickCount1)
    }
}
clickModule.init()
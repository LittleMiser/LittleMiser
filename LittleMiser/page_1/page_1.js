var app = new Vue({ 
    el: '#myheader',
    data: {
        name: 'Little Miser'
    }
});


function switch_button() {

    $('.ui.sidebar').sidebar({
        context: 'body',
        dimPage : false,
        onVisible: function() {
            $('body').click(function(e){
                this.unbind(e);
            });
        },
        onShow: function() {
            $('.ui.sidebar').css("z-index",999);
        },
        onHide: function() {
            $('.ui.sidebar').css("z-index",1);
        }
    }).sidebar('toggle');
}
function createWJ() {
    window.location.href='../createWJ/createWJ.html'
}

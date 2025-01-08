$(function() {
    $(".select-wrap").click(() => {
        $('.sel-options').toggleClass("active");
    });

    $('.sel-options p').each((index, item) => {
        $(item).click(() => {
            const selectTeam = $('.select-one')
            selectTeam.text($(item).text());
            selectTeam.css('color', 'black')
        })
    })
})
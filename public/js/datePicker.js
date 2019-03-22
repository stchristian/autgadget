function beforeShowDay(date) {
    for (let i = 0; i < disabledDateIntervals.length; i++) {
        const foglalas = disabledDateIntervals[i];
        let kezdete = new Date(foglalas.kezdete);
        let vege = new Date(foglalas.vege);
        if( date >= kezdete && date <= vege ) {
            return [false];
        }
    }
    return [true];
}

$(function() {
    console.log(disabledDateIntervals);

    $.datepicker.regional['hu'] = {
        closeText: 'bezárás',
        prevText: '&laquo;&nbsp;vissza',
        nextText: 'előre&nbsp;&raquo;',
        currentText: 'ma',
        monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
        'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún',
        'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
        dayNames: ['Vasárnap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
        dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
        dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
        weekHeader: 'Hé',
        // dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['hu']);
    $("#fromDate").datepicker({
        beforeShowDay: beforeShowDay,
        minDate: 0,
    });
    $("#toDate").datepicker({
        beforeShowDay: beforeShowDay,
        minDate: 0,
    });
});
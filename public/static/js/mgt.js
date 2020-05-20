do_ajax = function(type, url, data, dataType, callback) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: dataType,
        success: callback
    });
}
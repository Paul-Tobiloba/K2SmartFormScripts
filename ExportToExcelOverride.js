function exportListToExcel(n) {
    n = checkExists(n) ? n : {};
    var f = {
        viewHtml: n.viewHtml,
        rowsGridObjs: n.rowsGridObjs
    }
      , q = generateDataForExcel(f)
      , t = document.getElementById("FileURL").value;
    if (checkExists(q) && checkExistsNotEmpty(t)) {
        var r = constructExcelFileName(n.viewXml);
        t = FormatFileDownloadPathForAnonAccess(t, !0);
        t = SourceCode.Forms.XSRFHelper.appendAntiXSRFQueryStringParameter(t);
        var e = /(iPhone|iPad|iPod)/i.test(navigator.userAgent)
          , o = navigator.userAgent.indexOf("Mobilies") >= 0;
        if (e || o) {
            var u = setFrameVariable("_listxlsxdata", JSON.stringify(q));
            u += setFrameVariable("_xlsxfilename", constructExcelFileName(n.viewXml));
            framePosting("HiddenFileFrame", t, u, !1)
        } else {
            var u = {
                _listxlsxdata: JSON.stringify(q),
                _xlsxfilename: r
            };
            _runtimeAjaxCall("POST", t, null, u, "blob").done(function(n) {
                if (typeof navigator.msSaveBlob == "function")
                    navigator.msSaveBlob(n, r);
                else {
                    var q = window.URL.createObjectURL(n);
                    console.log(q);
                    fetch(q)
                        .then(response => response.blob())
                        .then(blob => {
                            return $.ajax({
                            context: this,
                            type: 'POST',
                            url: '/Runtime/Utilities/FileHandler.ashx?fn='+ r+'&' + (new Date()).getTime(),
                            cache: false,
                            data: blob,                 
                            contentType: false,         
                            processData: false,
                            async: false
                            });
                        })
                        .then(filePath => {
                            console.log('Upload completed', filePath);
                            console.log('File Name:', r);
                            var filePathXML = ("<collection><object><fields><field name='FileName'><value>"  + r +"</value></field><field name='FilePath'><value>" + filePath.split("|")[0]  + "</value></field><field name='FileRequestData'><value></value></field><field name='FileDataURL'><value></value></field></fields></object></collection>");
                            console.log('FilePath:', filePathXML);
                            $("[name='dlFile']").SFCLabel('option', 'text', filePathXML);
                            console.log("done");
                        })
                        .catch(err => {
                            console.error('Error uploading blob:', err);
                        });
                }
            })
        }
    }
    handleEvent(n.viewId, "View", "ListExportExcel", null, n.instanceId, null, null, null, null, null, null, n.loopContextId)
}


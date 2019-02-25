/**
 * @module TableManager
 * @license MIT
 * @author dongwon Jang
 * @copyright 2019
 * @version 1.0.0
 * Javascript Language : ES6, ES7
 */


/**
 * This is table manage module object
 * 
 * @type {object}
 * @class TableManager
 * @namespace TableManager
 */

const TableManager = (() => {
    /**
     * TableManager object ID
     */
    let ID = "";

    return {
        /**
         * Initialize the table.
         * @date 2019. 02. 23.
         * @memberOf TableManager
         * @param {object} options - option object
         * @param {string} options.id - ID of the DIV object to render the table
         * @param {object} options.ajax - Asynchronous communication for data renewal
         * @param {Int} options.columns - Column count
         */
        initialize: (options) => {
            try {
                if (!options) {
                    options = {};
                }

                if (!options.id) {
                    throw "Table id is not defined.";
                }
                ID = options.id;

                if (options.ajax) {
                    if (typeof options.ajax.url === 'undefined') {
                        throw "ajax url is not defined";
                    }
                    if (typeof options.ajax.dataSrc === 'undefined') {
                        options.ajax.dataSrc = null;
                    }
                    if (typeof options.ajax.param === 'undefined') {
                        options.ajax.param = null;
                    } else {
                        options.ajax.param = JSON.stringify(options.ajax.param);
                    }
                    if (typeof options.ajax.type === 'undefined') {
                        options.ajax.type = "POST";
                    }
                    if (typeof options.ajax.async === 'undefined') {
                        options.ajax.async = false;
                    }
                } else {
                    throw "Table ajax is not defined.";
                }

                $.ajax({
                    type: options.ajax.type,
                    contentType: "application/json; charset=utf-8",
                    url: options.ajax.url,
                    data: options.ajax.param,
                    cache: false,
                    async: options.ajax.async,
                    dataType: "JSON",
                    success: function (data) {
                        //console.log("success : " + data);

                        const body = document.getElementById(options.id).getElementsByTagName('tbody');
                        let cnt = 1;
                        if (!options.columns) { options.columns = data.d.columns; }
                       
                        data.d.list.forEach((data) => {
                            let bodyRow = body[0].insertRow();
                            let bodyCell = new Object();
                            bodyRow.setAttribute('data-idx', cnt++);
                            for (var i = 0; i < options.columns; i++) {
                                bodyCell[i] = bodyRow.insertCell(i);
                            }

                            bodyCell[0].innerHTML = "<input data-id='new_l_businessunit' type='hidden' value='" + data.new_l_businessunit + "'/><span data-id='new_l_businessunitName'>" + data.new_l_businessunitName + "</span>";
                            bodyCell[1].innerHTML = "<input data-id='new_l_team' type='hidden' value='" + data.new_l_team + "'/><span data-id='new_l_teamName'>" + data.new_l_teamName + "</span>";
                            bodyCell[2].innerHTML = "<input data-id='new_displayId' type='hidden' value='" + data.new_displayId + "'/><span data-id='new_displayName'>" + data.new_displayName + "</span>";
                            bodyCell[3].innerHTML = "<input data-id='displayCount' type='hidden' value='" + data.displayCount + "'/>" + data.displayCount + "";
                            bodyCell[4].innerHTML = "<input data-id='new_onegate_accountId' type='hidden' value='" + data.new_onegate_accountId + "'/><span data-id='new_onegate_accountName'>" + data.new_onegate_accountName + "</span>";
                            bodyCell[5].innerHTML = "<input data-id='new_txt_accountnumber' type='hidden' value='" + data.new_txt_accountnumber + "'/>" + data.new_txt_accountnumber + "";
                            bodyCell[6].innerHTML = "<input data-id='new_txt_ceo' type='hidden' value='" + data.new_txt_ceo + "'/>" + data.new_txt_ceo + "";
                            bodyCell[7].innerHTML = "<input data-id='new_txt_personname' type='hidden' value='" + data.new_txt_personname + "'/>" + data.new_txt_personname + "";
                            bodyCell[8].innerHTML = "<input data-id='new_txt_personmobile' type='hidden' value='" + data.new_txt_personmobile + "'/>" + data.new_txt_personmobile + "";
                            bodyCell[9].innerHTML = "<input data-id='new_txt_personemail' type='hidden' value='" + data.new_txt_personemail + "'/>" + data.new_txt_personemail + "";
                            bodyCell[10].innerHTML = "<input data-id='new_chk_ceo_sex' type='hidden' value='" + data.new_chk_ceo_sex + "'/><span data-id='new_chk_ceo_sexName'>" + data.new_chk_ceo_sexName + "</span>";
                            bodyCell[11].innerHTML = "<input data-id='new_chk_a_venture' type='hidden' value='" + data.new_chk_a_venture + "'/>" + (data.new_chk_a_venture ? "O" : "X") + "";
                            bodyCell[12].innerHTML = "<input data-id='new_chk_a_woman' type='hidden' value='" + data.new_chk_a_woman + "'/>" + (data.new_chk_a_woman ? "O" : "X") + "";
                            bodyCell[13].innerHTML = "<input data-id='new_chk_a_presocial' type='hidden' value='" + data.new_chk_a_presocial + "'/>" + (data.new_chk_a_presocial ? "O" : "X") + "";
                            bodyCell[14].innerHTML = "<input data-id='new_chk_a_qualified' type='hidden' value='" + data.new_chk_a_qualified + "'/>" + (data.new_chk_a_qualified ? "O" : "X") + "";
                            bodyCell[15].innerHTML = "<input data-id='new_chk_a_ninnobiz' type='hidden' value='" + data.new_chk_a_ninnobiz + "'/>" + (data.new_chk_a_ninnobiz ? "O" : "X") + "";
                            bodyCell[16].innerHTML = "<input data-id='new_chk_a_disable' type='hidden' value='" + data.new_chk_a_disable + "'/>" + (data.new_chk_a_disable ? "O" : "X") + "";
                            bodyCell[17].innerHTML = "<input data-id='TotalScore' type='hidden' value='" + data.TotalScore + "'/>" + data.TotalScore + "";
                        });
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        throw "An unknown error occurred while generating the table.";
                    }
                });

            } catch (e) {
                console.log("TableManager.initialize: " + e);
            }
        },
        /**
         * Initialize the table.
         * @date 2019. 02. 23.
         * @memberOf TableManager
         * @param {object} options - option object
         * @param {string} options.id - ID of the DIV object to render the table
         * @param {Array} options.lengthMenu - Range Selection Menu
         */
        length: (options) => {
            try {

                if (!options) {
                    options = {};
                }

                if (!options.id) {
                    throw "Table id is not defined.";
                }
                ID = options.id;

                if (!options.lengthMenu && options.lengthMenu.length != 2 && options.lengthMenu[0].length != options.lengthMenu[1].length) {
                    throw "Selection menu is not defined.";
                }

                let div = document.createElement("div");
                div.classList.add("dataTables_length");
                div.id = ID + "_length";

                let label = document.createElement("label");

                let select = document.createElement("select");
                select.name = ID + "_length"
                select.setAttribute('aria-controls', ID);
                select.classList.add("custom-select");
                select.classList.add("custom-select-sm");
                select.classList.add("form-control");
                select.classList.add("form-control-sm");

                options.lengthMenu[0].forEach((val, idx) => {
                    let option = document.createElement('option');
                    option.value = val;
                    if (val > 0) {
                        option.text = val;
                    } else {
                        option.text = "All";
                    }

                    select.appendChild(option);
                });

                label.innerHTML += "Show"
                label.appendChild(select);
                label.innerHTML += "entries"

                div.appendChild(label);

                console.log(div);

            } catch (e) {
                console.log("TableManager.length: " + e);
            }
            
        }
    };
})();

 /******************** START FORM VALIDATION STUFF **************/
    function fieldKeyUp() {
        var t = $(this);
        var typeFromLightning = t.attr("data-type");
        if ((typeFromLightning == 'dob' || typeFromLightning == 'date' || typeFromLightning == 'future') && t.is('input')) {
            var tx = this;
                        var fun = function() {
                                var input = tx.value;
                                // if type == date, then the browser is already dealing with the date syntax - no need to custom reformat it
                                if (tx.type != 'date') {
                                    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 1);
                                    var values = input.split('/').map(function(v) {
                                        return v.replace(/\D/g, '')
                                    });
                                    if (values.length > 1) values[0] = values[0].padStart(2, '0');
                                    if (values.length > 2) values[1] = values[1].padStart(2, '0');
                                    var output = values.map(function(v, i) {
                                        return v.length == 2 && i < 2 ? v + '/' : v;
                                    });
                                    tx.value = output.join('').substr(0, 14);
                                }
                            // if this is part of a select, then set the select options as well
                            var sels = $('select', t.closest('.cJanssenUI_DatePicker2'));
                            sels.val('');
                            if (tx.value.length == 10) {
                                var vx = tx.value;
                                var txa;
                                if (vx.indexOf('-') >= 0) {
                                    // yyyy-mm-dd
                                    txa = vx.split('-');
                                    txa.push(txa.shift());
                                } else {
                                    // mm/dd/yyyy
                                    txa = vx.split('/');
                                }
                                $('option[data-num="' + txa[0] + '"]', $(sels[0])).prop('selected',true);
                                $('option[data-num="' + txa[1] + '"]', $(sels[1])).prop('selected',true);
                                $('option[data-num="' + txa[2] + '"]', $(sels[2])).prop('selected',true);
                            }
                            
            };
            fun();
            window.setTimeout(fun, 100);
        } else if (typeFromLightning == 'phone') {
            // so it happens after the keystroke
            var tx = this;
            var fun = function() {
                // reformat as a phone number if 10 characters entered
                if (tx.value.length == 10 && !isNaN(parseFloat(tx.value)) && isFinite(tx.value)) {
                    tx.value = '(' + tx.value.substring(0, 3) + ') ' + tx.value.substring(3, 6) + '-' + tx.value.substring(6, 10);
                }
            };
            fun();
            window.setTimeout(fun, 100);
        }
    }
    function resetForm(frm) {
        frm = $(frm);
        $(':input:not(select):not([type=hidden]):not(:radio):not(:checkbox):not(:button):not(:submit)', frm).val('');
        $('select', frm).each(function() {
            var t = $(this);
            t.val($('option:first', t).val());
        });
        $('input[type=radio],input[type=checkbox]', frm).removeAttr('checked');
        $('.janssen-error-red-border', frm).removeClass('janssen-error-red-border');
        $('.slds-form-element__help.janssen-error-red', frm).remove();
    }
    function validateForm(frm, skipFocus) {
        frm = $(frm);
        $('select[data-type="future"],select[data-type="dob"],select[data-type="date"]', frm).not('[required="required"]').each(function() {
            var tx = $(this);
            if (!tx.is(':visible') || tx.attr('disabled')) return;

            // if all 3 fields are blank, remove the error message
            var txas = $('select', $(tx).closest('fieldset'));
            var txa1 = getInputValue(txas[0]);
            var txa2 = getInputValue(txas[1]);
            var txa3 = getInputValue(txas[2]);
            var txw = $($('select', tx.closest('fieldset'))[0]).closest('.slds-form-element');
            if (txa1 || txa2 || txa3) {
                var dd = getDateFromSelectFields(tx);
                var dateError = false;
                if (isNaN(dd) || dd == null) {
                    $(':input', txw).addClass('janssen-error-red-border');
                    if ($('.slds-form-element__help', txw).length == 0) {
                        txw.append(getError(['Invalid date']));
                    }
                }
            } else {
                $(':input', txw).removeClass('janssen-error-red-border');
                $('.slds-form-element__help', txw).remove();
            }
        });

        $(":input[required='required']", frm).each(function() {
            var tx = $(this);
            if (!tx.is(':visible') || tx.attr('disabled')) return;

            var tm = tx.closest('.slds-form-element');
            var reqText = tm.data('requirederrormessage');
            if (!reqText) reqText = 'This is a required field.';
            
            // just make sure the reqiured fields are filled out - other validation happens as you type
            if (tx.is(':checkbox')) {
                $('.slds-checkbox--faux', tm).each(function() {
                    var xta = $(this);
                    if (xta.closest('.slds-form-element')[0] == tm[0] && !xta.hasClass('janssen-error-red-border')) {
                                                var chkLen = 0;
                        $('input[type=checkbox]:checked', tm).each(function() {
                            var xta2 = $(this);
                            if (xta2.closest('.slds-form-element')[0] == tm[0]) chkLen++;
                                                });
                        if (chkLen == 0) {
                            $('.slds-checkbox--faux', tm).each(function() {
                                var xta2 = $(this);
                                if (xta2.closest('.slds-form-element')[0] == tm[0]) xta2.addClass('janssen-error-red-border');
                            });
                            var hasElementHelp = false;
                            $('.slds-form-element__help', tm).each(function() {
                                var xta2 = $(this);
                                if (xta2.closest('.slds-form-element')[0] == tm[0]) hasElementHelp = true;
                            });
                            if (!hasElementHelp) {
                                tm.append(getError([reqText]));
                            }
                        }
                    }
                });
            } else if (tx.is(':radio')) {
                $('.slds-radio--faux', tm).each(function() {
                    var xta = $(this);
                    if (xta.closest('.slds-form-element')[0] == tm[0] && !xta.hasClass('janssen-error-red-border')) {
                                                var chkLen = 0;
                        $('input[type=radio]:checked', tm).each(function() {
                            var xta2 = $(this);
                            if (xta2.closest('.slds-form-element')[0] == tm[0]) chkLen++;
                                                });
                                                if (chkLen == 0) {
                            $('.slds-radio--faux', tm).each(function() {
                                var xta2 = $(this);
                                if (xta2.closest('.slds-form-element')[0] == tm[0]) xta2.addClass('janssen-error-red-border');
                            });
                            var hasElementHelp = false;
                            $('.slds-form-element__help', tm).each(function() {
                                var xta2 = $(this);
                                if (xta2.closest('.slds-form-element')[0] == tm[0]) hasElementHelp = true;
                            });
                            if (!hasElementHelp) {
                                tm.append(getError([reqText]));
                            }
                        }
                    }
                });
            } else if (tx.is('select')) {
                if (!$('option:selected', tx).attr('value')) {
                    tx.addClass('janssen-error-red-border');
                    if ($('.slds-form-element__help', tm).length == 0) {
                        tm.append(getError([reqText]));
                    }
                }
            } else if (!tx.val()) {
                tx.addClass('janssen-error-red-border');
                if ($('.slds-form-element__help', tm).length == 0) {
                    tm.append(getError([reqText]));
                }
            }
        });
        
        var tr = $('.slds-form-element__help', frm);
        for (var i = 0; i < tr.length; i++) {
            if ($(tr[i]).is(':visible')) {
                if (!skipFocus) $(':input:first', $(tr[i]).closest('.slds-form-element')).focus();
                return false;
            }
        }
        return true;
    }
    
    function getInputValue(t) {
        // done this way because if a select has an option with no value defined, jquery will get the label instead of an undefined/blank value, so we grab it from the selected option instead ourselves
        t = $(t);
        var ret = '';
        if (t.is('select')) ret = $('option:selected', t).attr('value');
        else ret = t.val();
        return ret === undefined ? '' : ret;
    }

    function getDateFromSelectFields(tx) {
        var txas = $('option:selected', $('select', $(tx).closest('fieldset')));
        var txa1 = $(txas[0]).attr('value');
        var txa2 = $(txas[1]).attr('value');
        var txa3 = $(txas[2]).attr('value');
        if (txa1 || txa2 || txa3) {
            if (txa1 && txa2 && txa3) {
                txa1 = txa1.toLowerCase();
                var months = {'jan': '1','feb': '2', 'mar': '3', 'apr': '4', 'may': '5', 'jun': '6', 'jul': '7', 'aug': '8', 'sep': '9', 'oct': '10', 'nov': '11', 'dec': '12'};
                                txa1 = months[txa1] || txa1;
                var dd = new Date(txa1 + '/' + txa2 + '/' + txa3);
                if (isNaN(dd) || dd.getDate() != parseInt(txa2, 10)) {
                    return NaN;
                }
                return dd;
            } else {
                return NaN;
            }
        }
        return null;
    }
    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    function focusField() {
        var t = $(this);
        var typeFromLightning = t.attr("data-type");
        if (typeFromLightning == 'date' || typeFromLightning == 'future' || typeFromLightning == 'dob') {
            var tx = t.closest('.slds-form-element');
            var sel = $('select', tx.closest('fieldset'))[0];
            if (sel != this) { // don't remove error if we're on the first field
                // remove any errors on focus - if none of the selects have anything, then on blur we'll get the errors
                var txw = $(sel).closest('.slds-form-element');
                $(':input', txw).removeClass('janssen-error-red-border');
                $('.slds-form-element__help', txw).remove();
            }
        }
    }
    function changeField() {
        validateField.apply(this, ['change']);
    }
    function blurField() {
        validateField.apply(this, ['blur']);
    }
    function validateField(eventType) {
        var internationalPhoneNumberRegexp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        var janrainEmailRegexp = new RegExp("^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|care|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$", "i");
        var medicareNumberRegEx = /^[1-9]+[AC-HJKMNPQRT-Y]+[AC-HJKMNPQRT-Y0-9]+[0-9]+[-]+[AC-HJKMNPQRT-Y]+[AC-HJKMNPQRT-Y0-9]+[0-9]+[-]+[AC-HJKMNPQRT-Y]+[AC-HJKMNPQRT-Y]+[0-9]+[0-9]/;
        
        var t = $(this);
        
        var tx = t.closest('.slds-form-element');
        $('.janssen-error-red-border', tx).each(function() {
            var xta = $(this);
            if (xta.closest('.slds-form-element')[0] == tx[0]) xta.removeClass('janssen-error-red-border');
        });
        $('.slds-form-element__help.janssen-error-red', tx).each(function() {
            var xta = $(this);
            if (xta.closest('.slds-form-element')[0] == tx[0]) xta.remove();
        });
        
        if (t.is(':checkbox') || t.is(':radio')) return;
        
        var typeFromElement = t.attr("type");
        var typeFromLightning = t.attr("data-type");
        var validationFunc = t.attr("data-validationfunc");
        var maxlength = t.attr("maxlength");
        var minlength = t.attr("minlength");
        var constraints = {};        
        var tconstraints = t.attr("data-constraint");
        if (tconstraints) {
            tconstraints = tconstraints.split(',');
            for (var i = 0; i < tconstraints.length; i++) {
                constraints[tconstraints[i]] = 1;
            }
        }

        var errorMsg = [];
        var value = getInputValue(t);

        if(this.required && typeFromLightning === "password") {
            !value && ( errorMsg.push("Your password is a required field.") );
        } else if (this.required) {
            !value && (errorMsg.push('This is a required field.'));
        }
        
        if(!!maxlength && typeof value === "string") {
            (value.length > maxlength) && (errorMsg.push("Cannot enter more than " + maxlength + " characters."));
        }
        if (!!minlength && typeof value === "string") {
            value.length && (value.length < minlength) && (errorMsg.push("Must contain at least " + minlength + " characters."));
        }
        if(typeFromLightning && (value || typeFromLightning == 'dob' || typeFromLightning == 'date' || typeFromLightning == 'future')) {
            switch(typeFromLightning) {
                case "dob": case "date": case "future":
                    if (t.is('input')) {
                        if (value.length > 0) {
                            if (value.indexOf('-') >= 0) {
                                // convert yyyy-MM-dd to MM/dd/yyyy due to timezone issues
                                var xv = value.split('-');
                                if (xv.length == 3) {
                                    value = xv[1] + '/' + xv[2] + '/' + xv[0];
                                }
                            } else if (value.indexOf('/') >= 0) {
                                // make sure month and day are 2 chars each
                                var xv = value.split('/');
                                if (xv.length == 3) {
                                    value = xv[0].padStart(2, '0') + '/' + xv[1].padStart(2, '0') + '/' + xv[2];
                                }
                            }
                            var dd = new Date(value);
                            var ydd = new Date();
                            ydd.setHours(0, 0, 0, 0);

                            var vyr = parseInt(value.indexOf('-') >= 0 ? value.split('-')[0] : value.split('/')[2], 10);
                            var vmo = parseInt(value.indexOf('-') >= 0 ? value.split('-')[1] : value.split('/')[0], 10);
                            if (value.length != 10 || isNaN(dd) || parseInt(dd.getFullYear(), 10) != vyr || dd.getFullYear() < 1900 || parseInt(dd.getMonth() + 1, 10) != vmo) {
                                        errorMsg.push("Invalid date")
                                } else if (typeFromLightning == 'dob' && dd && dd.getTime() > ydd.getTime()) {
                                    errorMsg.push('Date cannot be in the future');
                            } else if (typeFromLightning == 'future' && dd && dd.getTime() < ydd.getTime()) {
                                    errorMsg.push('Date cannot be in the past');
                                }
                        }
                    } else {
                        var fs = $(tx).closest('fieldset');
                        var txas = $('select', fs);
                        var txaMonth = getInputValue(txas[0]).toUpperCase();
                        if (txaMonth.indexOf('0') == 0) txaMonth = txaMonth.substring(1);
                        var numDays = (!txaMonth || txaMonth.indexOf('JAN') == 0 || txaMonth.indexOf('MAR') == 0 || txaMonth.indexOf('MAY') == 0 || txaMonth.indexOf('JUL') == 0 || txaMonth.indexOf('AUG') == 0 || txaMonth.indexOf('OCT') == 0 || txaMonth.indexOf('DEC') == 0 || txaMonth == 1 || txaMonth == 3 || txaMonth == 5 || txaMonth == 7 || txaMonth == 8 || txaMonth == 10 || txaMonth == 12) ? 31 :
                            ((txaMonth.indexOf('FEB') == 0 || txaMonth == 2) ? 29 : 30);
                        if (numDays == 29) {
                            // see if this is a leap year
                            var txaYear = getInputValue(txas[2]);
                            if (txaYear) {
                                if (((txaYear % 4 == 0) && (txaYear % 100 != 0)) || (txaYear % 400 == 0)) {
                                    // leap year
                                } else {
                                    numDays = 28;
                                }
                            }
                        }
    
                        // make sure the date drop down has numDays in the drop down list
                        var daySel = $(txas[1]);
                        var dayOpts = $('option', daySel).length;
                        var numDaysInDayOpts = dayOpts - 1;
                        for (var i = numDaysInDayOpts + 1; i <= numDays; i++) {
                            daySel.append($('<option />').text(i).val(i).attr('label',i).data('num', ('0' + i).right(2)));
                        }
                        while (numDaysInDayOpts > numDays) {
                            numDaysInDayOpts--;
                            $('option:last-child', daySel).remove();
                        }
    
                        // if all 3 fields filled out, make sure it's a valid date
                        if (eventType == 'blur') {
                            var dd = getDateFromSelectFields(tx);
                            var ydd = new Date();
                            ydd.setHours(0, 0, 0, 0);
                            var dateError = false;
                            var txw = $($('select', fs)[0]).closest('.slds-form-element');
                            if (isNaN(dd)) {
                                dateError = 'Invalid date';
                            } else if (typeFromLightning == 'dob' && dd && dd.getTime() > ydd.getTime()) {
                                dateError = 'Date cannot be in the future';
                            } else if (typeFromLightning == 'future' && dd && dd.getTime() < ydd.getTime()) {
                                dateError = 'Date cannot be in the past';
                            } else if (dd) {
                                $(':input', txw).removeClass('janssen-error-red-border');
                                $('.slds-form-element__help', txw).remove();
                            }
                            if (dateError) {
                                // make sure none of the year fields have any errors on them
                                if (errorMsg.length == 0 && $('.slds-form-element__help', fs).length == 0) {
                                    $(':input', txw).addClass('janssen-error-red-border');
                                    if ($('.slds-form-element__help', txw).length == 0) {
                                        txw.append(getError([dateError]));
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "email":
                    !janrainEmailRegexp.test(value) && (errorMsg.push("Enter a valid email."));
                    break;
                case "text":
                    if(constraints['alphaNumeric']) {
                        !is.alphaNumeric(value) && (errorMsg.push("Enter only letters and numbers."));
                    }
                    if(constraints['capitalized']) {
                        !is.capitalized(value) && (errorMsg.push("Please capitalize."));
                    }
                    if(constraints['uppercase']) {
                        !is.upperCase(value) && (errorMsg.push("All letters must be uppercase."));
                    }
                    if(constraints['lowercase']) {
                        !is.lowerCase(value) && (errorMsg.push("All letters must be lowercase."));
                    }
                    break;
                case "tin":
                    value.length != 9 && errorMsg.push("Tax ID is must be exactly 9 digits long.");
                    value.length == 9 && !is.integer(Number(value)) && errorMsg.push("Tax ID is restricted to only numbers.");
                    break;
                case "firstName":
                    !/[a-z]/i.test(value) && errorMsg.push("First name must include at least one character and and cannot be longer than 40 characters.");
                    /[0-9]/.test(value) && errorMsg.push("First name cannot contain any numbers.");
                    break;
                case "middleName":
                    /[0-9]/.test(value) && errorMsg.push("Middle name cannot contain any numbers.");
                    break;
                case "lastName":
                    !/[a-z]/i.test(value) && errorMsg.push("Last name must include at least one character and cannot be longer than 80 characters.");
                    /[0-9]/.test(value) && errorMsg.push("Last name cannot contain any numbers.");
                    break;
                case "practiceName":
                    !/[a-z]/i.test(value) && errorMsg.push("You must enter a Practice Name that contains at least one character and cannot be longer than 100 characters.");
                    break;
                case "address":
                    (!/[a-z]/i.test(value) || !/\d/i.test(value)) && (errorMsg.push("You must enter an address that contains at least one character and one number."));
                    break;
                case "city":
                    // make sure no numbers
                    /[0-9]/.test(value) && errorMsg.push("City cannot contain any numbers.");
                    break;
                case "npi":
                    value.length != 10 && errorMsg.push("NPI must be 10 digits long.");
                    value.length == 10 && (!is.integer(Number(value)) || !is.positive(Number(value))) && errorMsg.push("NPI must be a non-negative number.");
                    break;
                case "number":
                    if(!is.number(Number(value)) || value.trim() != value || value.endsWith('.')){
                        errorMsg.push("Enter a number")
                    } else {
                        if(constraints['even']){
                            !is.even(Number(value)) && (errorMsg.push("Please enter an even number."));
                        }
                        if(constraints['odd']){
                            !is.odd(Number(value)) && (errorMsg.push("Please enter an odd number."));
                        }
                        if (constraints['positive']){
                            !is.positive(Number(value)) && (errorMsg.push("Please enter a positive number."));
                        }
                        if (constraints['negative']){
                            !is.negative(Number(value)) && (errorMsg.push("Please enter a negative number."));
                        }
                        if(constraints['integerOnly']){
                            !is.integer(Number(value)) && (errorMsg.push("Please enter an integer."));
                        }
                        if(constraints['decimalOnly']){
                            !is.decimal(Number(value)) && (errorMsg.push("Please enter a decimal."));
                        }
                        if (constraints['nonNegative']) {
                            is.negative(Number(value)) && (errorMsg.push("Please enter a number greater than or equal to 0."));
                        }
                        if (constraints['maxDecimal']) {
                            var maxD = parseInt(t.attr("data-numdecimals"), 10);
                            var vd = value.split('.');
                            if (vd.length > 1 && vd[1].length > maxD) errorMsg.push("Please enter no more than " + maxD + " decimals");
                        }
                    }
                    break;
                case "nanpPhone": case "phone":
                    !(/(^\(\d{3}\)\s\d{3}-\d{4}$)/.test(value) || /(^\(\d{3}\)\d{3}-\d{4}$)/.test(value) || /(^\d{10}$)/.test(value)) && (errorMsg.push("Requires digits in (XXX) XXX-XXXX format."));
                    break;
                case "eppPhone":
                    !is.eppPhone(value) && (errorMsg.push("Enter a valid Extensible Provisioning Protocol phone number."));
                    break;
                case "url":
                    !is.url(value) && (errorMsg.push("Enter a valid URL."));
                    break;
                case "usZip": case "zip":
                    !is.usZipCode(value) && errorMsg.push("Enter a valid US zip code.");
                    break;
                case "caZip":
                    !is.caPostalCode(value) && (errorMsg.push("Enter a valid Canadian postal code."));
                    break;
                case "ukZip": 
                    !is.ukPostCode(value) && (errorMsg.push("Enter a valid UK postal code."));
                    break;
                case "creditCard":
                    !is.creditCard(value) && (errorMsg.push("Enter a valid credit card number."));
                    break;
                case "time":
                    !is.timeString(value) && (errorMsg.push("Enter a valid time."));
                    break;
                case "date":
                    !is.dateString(value) && (errorMsg.push("Enter a valid date."));
                    break;
                case "datetime":
                    break;
                case "datetime-local":
                    break;
                case "SSN":
                    !is.socialSecurityNumber(value) && (errorMsg.push("Enter a valid Social Security number."));
                    break;
                case "ip4": case "ip":
                    !is.ipv4(value) && (errorMsg.push("Enter a valid IPv4 address."));
                    break;
                case "ip6":
                    !is.ipv6(value) && (errorMsg.push("Enter a valid IPv6 address."));
                    break;
                case "medicareNumber":
                    !medicareNumberRegEx.test(value) && errorMsg.push("Please reenter the Medicare Number in the correct format.");
                    break;
            }
        }
        if (validationFunc && value) {
            window[validationFunc](value, errorMsg);
        }
        if (errorMsg.length) {
            $(':input', tx).each(function() {
                var xta = $(this);
                if (xta.closest('.slds-form-element')[0] == tx[0]) xta.addClass('janssen-error-red-border');
            });
            var hasElementHelp = false;
            $('.slds-form-element__help', tx).each(function() {
                var xta = $(this);
                if (xta.closest('.slds-form-element')[0] == tx[0]) hasElementHelp = true;
                        });
            if (!hasElementHelp) {
                tx.append(getError(errorMsg)).removeClass('validationPass');
            }
        } else {
            tx.addClass('validationPass');
        }
    }
    function getError(msgs) {
        var tra = $('<div class="slds-form-element__help karbon-font janssen-error-red ng-binding ng-scope"><ul></ul></div>');
        var ul = $('ul', tra);
        for (var i = 0; i < msgs.length; i++) {
            if (msgs[i]) {
                ul.append($('<li />').text(msgs[i]));
            }
        }
        return tra;
    }
    /******************** END FORM VALIDATOIN STUFF ****************/
    (function ($) {
        //var oldAppend = $.fn.append;
        $.fn.janssenAppend = function() {
            if (arguments[0]) {
                arguments[0] = $(arguments[0]);
                // remove the init class since most likely these are cloned things we are appending
                $('.newElemInitted', arguments[0]).removeClass('newElemInitted');

                initNewElem(arguments[0]);
            }
            $.fn.append.apply(this, arguments);
        };
    })(jQuery);
    
    function initNewElem(par) {
        $(':input', par).not('.newElemInitted').focus(focusField).change(fieldKeyUp).change(changeField).blur(blurField).keypress(fieldKeyUp);

        // fix selects since value is undefined on the first/default one
        $('option:first-child', $('select', par).not('.newElemInitted')).each(function() {
            if ($(this).attr('value') === undefined) this.value = '';
        });

        $('option[data-selected=selected]', $('select', par).not('.newElemInitted')).prop('selected',true);

        $(':input[data-required=true]', par).not('.newElemInitted').prop('required', true);

        // sets the default value if populated
        $(':input[data-value][data-value!=""]', par).not('.newElemInitted').each(function() {
            var t = $(this);
            // if this is a select, then make sure the change took before calling the change event
            var v = t.attr('data-value');
            t.val(v);
            if (!t.is('select') || getInputValue(t) == v) t.change();
        });
        $('input[type=checkbox][data-checked=true]', par).not('.newElemInitted').click();
        $('input[type=radio][data-checked=true]', par).not('.newElemInitted').click();

        // do disabled at the end so clicks go through if something is clicked + disabled
        $(':input[data-disabled=true]', par).not('.newElemInitted').prop('disabled', true);

        // do this at the end after all other input stuff is taken care of
        $(':input', par).not('.newElemInitted').addClass('newElemInitted');

        $('div.dropdown', par).not('.newElemInitted').addClass('newElemInitted').click(function() {
            var t = $(this);
            if (t.hasClass('open')) {
                $('>button.dropdown-toggle', t.removeClass('open')).attr('aria-expanded', 'false');
            } else {
                $('>button.dropdown-toggle', t.addClass('open')).attr('aria-expanded', 'true');
            }
        });

        $('span.cJanssenUI_Icon > a.icon-link', par).not('.newElemInitted').addClass('newElemInitted').click(function() {
            $(this).closest('span.cJanssenUI_Icon').toggleClass('active');
        });
        $('span.cJanssenUI_Icon div.tooltip-area a.close-btn', par).not('.newElemInitted').addClass('newElemInitted').click(function() {
            $(this).closest('span.cJanssenUI_Icon').toggleClass('active');
        });

        $('a.sortColumn', $('div.sortTable', par)).not('.newElemInitted').addClass('newElemInitted').click(function() {
            var t = $(this);

            var rows = $('div.sortRow', t.closest('div.sortTable'));
            if (rows.length <= 1) return;
            var bodyContainer = $(rows.parent().get(0));
            rows.remove();
            
            var th = this;
            var sortMultiplier = 0;
            var sortType = '';
            $('a.sortColumn', t.closest('div.sortHeader')).each(function() {
                var txa = $(this);
                var fx = $('.sortable', txa);
                if (this == th) {
                    // pick asc or desc
                    if (fx.hasClass('asc')) {
                        fx.removeClass('asc').addClass('desc');
                        sortMultiplier = -1;
                        sortType = txa.data('sorttype');
                    } else {
                        fx.removeClass('desc').addClass('asc').removeClass('both');
                        sortMultiplier = 1;
                        sortType = txa.data('sorttype');
                    }
                } else {
                    fx.removeClass('asc').removeClass('desc').addClass('both');
                }
            });
            
            var colIndex = t.parent().index();
            rows.sort(function(a, b) {
                var ax = $($(a).children().get(colIndex)).text();
                var bx = $($(b).children().get(colIndex)).text();
                if (sortType == 'num') { ax = parseFloat(ax.replace(',','')); bx = parseFloat(bx.replace(',','')); }
                if (sortType == 'date') { ax = Date.parse(ax); bx = Date.parse(bx); }
                
                if (ax < bx) return sortMultiplier * -1;
                if (ax > bx) return sortMultiplier * 1;
                return 0;
            });
            bodyContainer.append(rows);
        });
    }
    function regenerateProgressbarSub(div, currentStep, totSteps) {
        div = $(div).empty();
        div.append('<div class="cJanssenUI_ProgressBarSub"><div class="row bs-wizard" style="border-bottom:0;"></div></div>');
        div = $('.bs-wizard', div);
        var perc = 100.0 / totSteps;
        for (var i = 1; i <= totSteps; i++) {
            var dd = $('<div class="col-md-1 bs-wizard-step ' + (i < currentStep ? 'complete' : '') + '" style="width: ' + perc + '%"><div class="progress" style="left: 0px"><div class="progress-bar"></div></div><a href="javascript:void(0)" class="bs-wizard-dot" style="left: 0%"></a></div>');
            div.append(dd);
            dd = $('a', dd);
            if (currentStep == i) dd.append('<b style="text-align: center; padding: 0px">' + i + '</b>');
            else if (i < currentStep) dd.append('<i class="fa fa-check" aria-hidden="true"></i>');
			else dd.append('<span style="text-align: center; padding: 0px">' + i + '</span>');
        }
	}
   $(function() {
        initNewElem($('body'));
	});
    function preparePhoneNumber(num) {
        return preparePhoneNumberHtml($('<div />').text(num).html());
    }
 function preparePhoneNumberHtml(xa) {
    //    <apex:variable value="{!1}" var="junk" rendered="{!$User.UITheme == 'Theme4t'}">
        var m = /\d{3}-\d{3}-\d{4}/.exec(xa);
        if (m && m.index >= 0) {
            var num = xa.substring(m.index, m.index + 12);
            xa = xa.substring(0, m.index) + '<a href="tel:' + num.replace(/-/g,'') + '">' + num + '</a>' + xa.substring(m.index + 12);
        }
      //  </apex:variable>
        return xa;
    }

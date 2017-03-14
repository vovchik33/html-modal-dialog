"use strict"
var ApplicationContainer = function(){
    var DOMElements = null;
    function sayHello() {
        console.log("Hello, console!!!");
    }
    function registerComponents(form) {
        DOMElements = form;
        initListeners();
    }
    function initListeners() {
        DOMElements.btnSaveData.addEventListener("click", clickSaveData);
        //DOMElements.btnShowDialog.addEventListener("click", clickShowDialog);
        $('#primary-dialog').on('show.bs.modal', function (event) {
            var modal = $(this);
            modal.find('.modal-title').text('Create your own message:');
            modal.find('#recipient-name').val("Unknown");
            modal.find('#message-text').val("Empty message");
        });
        $('#primary-dialog').on('hide.bs.modal', function (event) {
            console.log("Dialog window is closed!");
        })
    }
    function handleDialogData(data) {
        console.log(data);
        DOMElements.resultMessageContent.innerHTML=`
            From: <b>${data.messageRecipient}</b> Message: <b>${data.messageText}</b>
        `;
    }
    /* LISTENERS */
    function clickSaveData(event) {
        console.log("Button SaveMessage is clicked!");
        var modal = $('#primary-dialog');
        var messageRecipient = modal.find('#recipient-name');
        var messageText = modal.find('#message-text');
        handleDialogData({
            messageRecipient: messageRecipient.val(),
            messageText: messageText.val(),
        });
        $("#primary-dialog").modal('hide');
    }
    function clickShowDialog(event) {
        console.log("Button ShowDialog is clicked!");
        $("#primary-dialog").modal({
            keyboard: false
        })
    }

    return {
        sayHello: sayHello,
        registerComponents: registerComponents
    }
};

var applicationContainer = new ApplicationContainer();
applicationContainer.sayHello();
applicationContainer.registerComponents({
        promptMessageContent: document.querySelector("#prompt-message"),
        resultMessageContent: document.querySelector("#result-message"),
        btnShowDialog: document.querySelector("#button-show-dialog"),
        btnSaveData: document.querySelector("#button-save-data"),
});
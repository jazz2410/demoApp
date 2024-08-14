sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("demoapp.controller.demoApp", {
        onInit: function () {

        },
        onRowSelect: function(oEvent){
            const sPath = oEvent.getSource()._aSelectedPaths[0];
            this.byId('orderDetailsPanel').bindElement(sPath);
            const itemsPath = sPath + '/Order_Details';
            this.byId("orderDetailsTable").setTableBindingPath(itemsPath);
            this.byId("orderDetailsTable").rebindTable(true);
        }
    });
});

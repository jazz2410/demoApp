sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/FilterOperator"
],
    function (Controller, JSONModel,MessageToast,FilterOperator,) {
        "use strict";

        return Controller.extend("demoapp.controller.itemDetails", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("ItemDetails").attachPatternMatched(this._onObjectMatched,this);


            },
            _onObjectMatched: function(oEvent){
                this.getView().byId('itemDetailsForm').unbindElement();
                const parameters = oEvent.getParameter("arguments");
                const ProductID = parameters.ProductID;
                var sPath = `/Products(${ProductID})`;
                this.getView().byId('itemDetailsForm').bindElement(sPath);
            }

        
        });
    });

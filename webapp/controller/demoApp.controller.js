sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("demoapp.controller.demoApp", {
        onInit: function () {

            var editableFields = {
                state : false,
            }

            var changedValues = {
                EmployeeID : undefined,
                ShipName : undefined,
            }

            var editableFieldsModel = new JSONModel(editableFields);
            this.getView().setModel(editableFieldsModel,'editableFieldsModel');
            var changedValuesModel = new JSONModel(changedValues);
            this.getView().setModel(changedValuesModel,'changedValuesModel');

            var filter = this.byId('orderIDFilter');
            var example = {
                high : undefined,
                low : 123,
                operator : 'EQ',
                sign : 'I'
            }
            var SelectOption = new sap.ui.comp.smartfilterbar.SelectOption("OrderIDFilter",example);
            filter.addDefaultFilterValue(SelectOption);
            console.log(SelectOption);
           
        },
        onRowSelect: function(oEvent){
            const sPath = oEvent.getSource()._aSelectedPaths[0]; // returns /Orders(XXX)
            this.byId('orderDetailsPanel').bindElement(sPath);
            const itemsPath = sPath + '/Order_Details'; //returns /Orders(XXX)/Order_Details - Navigation property
            this.byId("orderDetailsTable").setTableBindingPath(itemsPath);
            this.byId("orderDetailsTable").rebindTable(true);

            const columns = this.byId("orderDetailsTable").getTable().getColumns();
            var i = 0;
            for(i = 0; i < columns.length; i++)
            {
                const header = columns[i].getHeader();
                switch (header.mProperties.text)
                {
                    case 'OrderID':
                        header.mProperties.text = 'Order ID';
                        break;
                    case 'ProductID':
                        header.mProperties.text = 'Product ID';
                        break;
                    case 'UnitPrice':
                        header.mProperties.text = 'Unit Price';
                        break;
                }
            }
        },
        onChangeHeader: function(){
            var state = this.getView().getModel('editableFieldsModel').getProperty('/state');
            this.getView().getModel('editableFieldsModel').setProperty('/state',!state);

        },
        onChangedEmployee: function(event){
            var newEmployee = event.getParameter('newValue');
            this.getView().getModel('changedValuesModel').setProperty('/EmployeeID',newEmployee);
        },
        onChangedShipName: function(event){
            var newShip = event.getParameter('newValue');
            this.getView().getModel('changedValuesModel').setProperty('/ShipName',newShip);
        },
        onSaveHeader: function(){
            var newEmployee = this.getView().getModel('changedValuesModel').getProperty('/EmployeeID');
            var newShip = this.getView().getModel('changedValuesModel').getProperty('/ShipName');

        }
    });
});

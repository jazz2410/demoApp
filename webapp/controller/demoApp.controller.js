sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/FilterOperator"
],
    function (Controller, JSONModel,MessageToast,FilterOperator,) {
        "use strict";

        return Controller.extend("demoapp.controller.demoApp", {
            onInit: function () {

                var editableFields = {
                    state: false,
                }

                var changedValues = {
                    EmployeeID: undefined,
                    ShipName: undefined,
                }

                var editableFieldsModel = new JSONModel(editableFields);
                this.getView().setModel(editableFieldsModel, 'editableFieldsModel');
                var changedValuesModel = new JSONModel(changedValues);
                this.getView().setModel(changedValuesModel, 'changedValuesModel');

            },
            onRowSelect: function (oEvent) {

                this._resetChangedModel();
                const sPath = oEvent.getSource()._aSelectedPaths[0]; // returns /Orders(XXX)
                this.byId('orderDetailsPanel').bindElement(sPath);
                const itemsPath = sPath + '/Order_Details'; //returns /Orders(XXX)/Order_Details - Navigation property
                this.byId("orderDetailsTable").setTableBindingPath(itemsPath);
                this.byId("orderDetailsTable").rebindTable(true);

                this._formatTable();

            },
            onChangeHeader: function () {
                var state = this.getView().getModel('editableFieldsModel').getProperty('/state');
                this.getView().getModel('editableFieldsModel').setProperty('/state', !state);

            },
            onChangedEmployee: function (event) {
                var newEmployee = event.getParameter('newValue');
                this.getView().getModel('changedValuesModel').setProperty('/EmployeeID', newEmployee);
            },
            onChangedShipName: function (event) {
                var newShip = event.getParameter('newValue');
                this.getView().getModel('changedValuesModel').setProperty('/ShipName', newShip);
            },
            onSaveHeader: function () {
                var newEmployee = this.getView().getModel('changedValuesModel').getProperty('/EmployeeID');
                var newShip = this.getView().getModel('changedValuesModel').getProperty('/ShipName');

                if (!newEmployee && !newShip) {
                    {
                        MessageToast.show("Noting was changed!");
                        return;
                    }
                }
                var order =  this.byId("orderDetailsPanel").getBindingContext().getProperty('OrderID');
                var sPath = `/Orders('${order}')`;
                var data = {
                    EmployeeID: newEmployee,
                    ShipName: newShip
                };
                this.getView().getModel().update(sPath, data, {
                    success: function (response) {
                        this.getView().getModel('editableFieldsModel').setProperty('/state', false);
                        this._resetChangedModel();
                    }.bind(this),
                    error: function (error) {
                        MessageToast.show("Feature not supported!");
                        this.getView().getModel('editableFieldsModel').setProperty('/state', false);
                        this.getView().getModel().refresh(true);
                        this._resetChangedModel();
                    }.bind(this),
                }
                )
            },
            _resetChangedModel: function(){
                this.getView().getModel('changedValuesModel').setProperty('/EmployeeID', undefined);
                this.getView().getModel('changedValuesModel').setProperty('/ShipName', undefined);
            },
            _formatTable: function(){
                const columns = this.byId("orderDetailsTable").getTable().getColumns();
                var i = 0;
                for (i = 0; i < columns.length; i++) {
                    const header = columns[i].getHeader();
                    switch (header.mProperties.text) {
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
            ////For combo box in SmartFilterbar, the values from combo box need to be passed to binding parameter
            onBeforeRebindTable: function(oEvent){
                var mBindingParams = oEvent.getParameter("bindingParams");
                var selectedItems = this.byId('multiCombo').getSelectedItems();
                
                selectedItems.forEach(function(selectedItem){
                    var Filter = new sap.ui.model.Filter({
                        path: 'CustomerID',
                        operator: FilterOperator.Contains,
                        value1: selectedItem.getText()});

                    mBindingParams.filters.push(Filter);
                })
            },
            onItemPress: function(oEvent){
                var item = oEvent.getSource().getSelectedItems()[0];
                var OrderID = item.getBindingContext().getProperty('OrderID');
                var ProductID = item.getBindingContext().getProperty('ProductID');
                
                this.getView().byId('orderDetailsTab').removeSelections();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("ItemDetails",{
                    OrderID :OrderID,
                    ProductID : ProductID
                });




            }
        
        });
    });

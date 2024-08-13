/*global QUnit*/

sap.ui.define([
	"demoapp/controller/demoApp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("demoApp Controller");

	QUnit.test("I should test the demoApp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function(BaseController) {
    "use strict";

    return BaseController.extend("nidaapplication.nidaworkflow.controller.App", {
      onInit() {


      },
      onAfterRendering: async function (oParameter) {
        debugger

        var extractedNumber = this.oView.mAggregations.content[0].mAggregations.pages[0].mAggregations.content[0].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[0]._oFieldDelegate.oElement.mAggregations.fields[0].mProperties.value;
        var visible1 = this.oView.mAggregations.content[0].mAggregations.pages[0].mAggregations.content[0].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[0]._oFieldDelegate.oElement.mAggregations.fields[0];

        setTimeout(async () => {
          extractedNumber = extractedNumber.getValue();
          visible1 = visible1.setVisible(false);
          var url1 = `https://25820971trial-dev12-department1-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Teacher(ttuuid=${extractedNumber},IsActiveEntity=true)/teatofile`;

          await $.ajax({
            url: url1,
            method: 'GET',
            success: function (oData) {
              debugger
              // Handle the successful response here
              console.log('Success:', oData);
              var oUploadSet = this.byId("UploadSet");

              oData.value.forEach(function (file) {
                var oUploadSetItem = new sap.m.upload.UploadSetItem({
                  fileName: file.fileName,
                  mediaType: file.mediaType,
                  url: "https://25820971trial-dev12-department1-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my" + file.url,
                  visibleEdit: false,
                  visibleRemove: false
                });

                oUploadSetItem.addAttribute(new sap.m.ObjectAttribute({
                  title: "Uploaded By",
                  text: file.createdBy
                }));
                oUploadSetItem.addAttribute(new sap.m.ObjectAttribute({
                  title: "Uploaded on",
                  text: file.createdAt
                }));
                oUploadSetItem.addAttribute(new sap.m.ObjectAttribute({
                  title: "File Size",
                  text: file.size
                }));

                oUploadSet.addItem(oUploadSetItem);

              });
            }.bind(this),

            error: function (xhr, status, error) {
              // Handle errors here
              console.error('Error:', error);
            }
          });
        }, 1000);
      },
    });
  }
);



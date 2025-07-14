import React from "react";

export const DescHtml: React.FunctionComponent<any> = (props) => {

    const obj = {
        "234c2bd0-6c18-4e7a-a39a-e2e1d347001b": "haha",
        "27a0e72a-6dc9-4e47-a527-a2e9a4dc9b9d": "hihi",
    }

    function replaceImageSrc(htmlString: string, keyValue: any) {
        const pattern = /<img[^>]*?src="([^"]*)"[^>]*>/gi;
        // console.log(htmlString)
        return htmlString.replace(pattern, (match, styleValue) => {
            let replacedStyleValue = styleValue;
            return match.replace(replacedStyleValue, keyValue[replacedStyleValue.split("cid:").pop()]);
        });
    }

    // let desc = `<html>
    //   <head>
    //   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    //   <style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>
    //   </head>
    //   <body dir="ltr">
    //   <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
    //   <img id="image_0" size="180736" contenttype="image/png" style="max-width: 860px;" data-outlook-trace="F:1|T:1" src="cid:234c2bd0-6c18-4e7a-a39a-e2e1d347001b"></div>
    //   <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
    //   <img size="194644" contenttype="image/png" style="max-width: 860px;" data-outlook-trace="F:1|T:1" src="cid:27a0e72a-6dc9-4e47-a527-a2e9a4dc9b9d"></div>
    //   </body>
    //   </html>
    //   `;
    let desc = `<html>
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
      <style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>
      </head>
      <body dir="ltr">
      <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);"></div>
      <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);"></div>
      </body>
      </html>
      `;
    // let result = replacePlaceholdersInStyleAttribute(desc, obj);
    // console.log(result);
    return (
        <></>
    )
} 
import React, { useEffect } from "react";

import { parse } from 'node-html-parser';


const Re: React.FunctionComponent = (props) => {


    // function addAttribute(htmlString: string, keyValue: any) {

    //     for (const key of Object.keys(keyValue)) {
    //         const pattern = new RegExp(`<${key}([^>]*)>`, 'gi');
    //         return htmlString.replace(pattern, (match, value) => {
    //             return `<${key}${value} ${keyValue[key]}>`;
    //         });
    //     }
    // }

    // let value = "";
    // // let value = ``;
    // let desc = addAttribute(value, {
    //     a: `target="_blank"`,
    // });
    // console.log(desc)

    // return (<div>{desc}</div>);

    useEffect(() => {
        let description = `<html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>
        </head>
        <body dir="ltr">
        <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
        <br>
        </div>
        </body>
        </html>`;
        // let description = `<html>
        // <head>
        // <meta http-equiv="Content-Type" content="text/html; charset=us-ascii">
        // <style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>
        // </head>
        // <body dir="ltr">
        // <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
        // <br>
        // </div>
        // <div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
        // <br>
        // </div>
        // <div id="Signature">
        // <div style="text-align: left; background-color: rgb(255, 255, 255); margin: 0px; font-size: 12pt;">
        // <span style="font-family: Calibri, Helvetica, sans-serif; color: rgb(32, 33, 36);">Best regards</span><span style="font-family: Calibri, Arial, Helvetica, sans-serif; color: rgb(0, 0, 0);"><br>
        // </span></div>
        // <div style="background-color: rgb(255, 255, 255); margin: 0px;">
        // <div style="text-align: left; background-color: rgb(255, 255, 255); margin: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 9.75pt; color: rgb(32, 33, 36);">
        // <br>
        // </div>
        // <div style="text-align: left; background-color: rgb(255, 255, 255); margin: 0px; font-family: Calibri, Helvetica, sans-serif; color: rgb(32, 33, 36);">
        // Haekal Arif Rozikin</div>
        // <div style="text-align: left; background-color: rgb(255, 255, 255); margin: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 9.75pt; color: rgb(32, 33, 36);">
        // <br>
        // </div>
        // <div style="text-align: left; background-color: rgb(255, 255, 255); margin: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 9.75pt; color: rgb(32, 33, 36);">
        // <a href="http://www.kitameraki.com/" target="_blank" rel="noopener noreferrer" style="margin: 0px;"><img width="200" height="29" style="width: 200px; height: 29px; margin: 0px;" src="https://drive.google.com/uc?id=14iXLNRfBdbA9nRmkPI2SzPCkrBaBvXV2&amp;export=download"></a>&nbsp;</div>
        // <div style="text-align: left; background-color: rgb(255, 255, 255); margin: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 9.75pt;">
        // <span style="color: rgb(68, 68, 68);"><b>Your </b></span><span style="color: red;"><b>Technology</b></span><span style="color: rgb(68, 68, 68);"><b>&nbsp;&amp;</b></span><span style="color: rgb(32, 33, 36);"><b>&nbsp;</b></span><span style="color: red;"><b>Digital Transformation</b></span><span style="color: rgb(68, 68, 68);"><b>&nbsp;partner</b></span><span style="color: rgb(32, 33, 36);"><br>
        // </span></div>
        // <div style="text-align: left; margin-right: 0px; margin-left: 0px; font-family: Arial, Helvetica, sans-serif; font-size: 9.75pt;">
        // <span style="color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);"><b><a href="http://www.kitameraki.com/" target="_blank" rel="noopener noreferrer" style="margin: 0px;">www.</a></b></span><span style="color: red; background-color: rgb(255, 255, 255);"><b><a href="http://www.kitameraki.com/" target="_blank" rel="noopener noreferrer" style="margin: 0px;">kita</a></b></span><span style="color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);"><b><a href="http://www.kitameraki.com/" target="_blank" rel="noopener noreferrer" style="margin: 0px;">meraki.com</a></b></span></div>
        // </div>
        // </div>
        // <div id="appendonsend"></div>
        // <hr style="display:inline-block;width:98%" tabindex="-1">
        // <div id="divRplyFwdMsg" dir="ltr"><font face="Calibri, sans-serif" style="font-size:11pt" color="#000000"><b>From:</b> Microsoft Security &lt;MSSecurity-noreply@microsoft.com&gt;<br>
        // <b>Sent:</b> Saturday, June 8, 2024 5:52 PM<br>
        // <b>To:</b> Haekal Arif Rozikin &lt;Haekal.rozikin@kitameraki.com&gt;<br>
        // <b>Subject:</b> Request for access to Checklist Dev approved</font>
        // <div>&nbsp;</div>
        // </div>
        // <div class="" style="width:100%; min-width:100%; padding:0; box-sizing:border-box; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <style id="x_mediaqueries">
        // <!--
        // -->
        // </style>
        // <div class="x_preheader" style="display:none; visibility:hidden; opacity:0; color:#f4f4f4; height:0; width:0; line-height:1px; font-size:1px; max-height:0; max-width:0; overflow:hidden">
        // Access request approved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        // <table role="presentation" class="x_body" data-made-with-foundation="data-made-with-foundation" style="border-spacing:0; border-collapse:collapse; vertical-align:top; background:#ffffff; height:100%; width:100%; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td class="x_float-center" align="center" valign="top" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; font-size:14px; line-height:20px; margin:0 auto; float:none; text-align:center">
        // <center class="x_main-container" style="width:100%; min-width:640px">
        // <table role="presentation" align="center" class="x_container x_header-container x_section" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; background:#ffffff; width:640px; margin:0 auto; text-align:inherit">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <table role="presentation" class="x_wrapper x_outer-wrapper" align="center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td class="x_wrapper-inner" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-right:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; padding-top:0; padding-bottom:0">
        // <center style="width:100%; min-width:640px">
        // <table role="presentation" align="center" class="x_row x_header-section x_float-center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; padding:0; width:100%; margin:0 auto; float:none; text-align:center; display:table">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_heading-container x_small-12 x_large-12 x_columns x_first x_last" valign="top" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; text-align:left; margin:0 auto; width:616px; line-height:1; margin-bottom:0; color:#6a6a6a; font-size:18px; font-family:Segoe UI Semibold,SegoeUISemibold,Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:600; padding-left:24px; padding-right:24px; padding-top:24px; padding-bottom:24px">
        // <table role="presentation" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <img height="auto" width="188" class="x_small-float-center" alt="kitameraki.com" style="outline:none; text-decoration:none; max-width:100%; clear:both; display:block; width:188px; height:auto" src="https://aadcdn.msauthimages.net/447973e2-argecpkeuxu1c5fcnweutgkvxuvuz1wzaxm35qwrwzm/logintenantbranding/0/bannerlogo?ts=638174902275713689"></th>
        // <th class="x_expander" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; visibility:hidden; width:0; padding:0">
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // <table role="presentation" align="center" class="x_container x_section x_message-bar" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; background:#ffffff; width:640px; margin:0 
        // auto; text-align:inherit">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <table role="presentation" bgcolor="#F3F2F1" class="x_wrapper x_outer-wrapper x_bg-message-bar--info" align="center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%; background-color:#F3F2F1; background:#F3F2F1">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td class="x_wrapper-inner" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-right:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; padding-top:12px; padding-bottom:12px">
        // <center style="width:100%; min-width:640px">
        // <table role="presentation" align="center" class="x_row x_collapse-tb x_float-center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; padding:0; width:100%; margin:0 auto; float:none; text-align:center; display:table">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-12 x_columns x_first x_last" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; text-align:left; font-size:14px; line-height:20px; margin:0 auto; width:616px; padding-left:24px; padding-right:24px; padding-top:0; padding-bottom:0">
        // <table role="presentation" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <table role="presentation" class="x_message-bar--content x_bg-message-bar--info" bgcolor="#F3F2F1" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; background-color:#F3F2F1; background:#F3F2F1; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td align="left" width="24" valign="middle" style=""><img height="16" width="16" class="x_message-bar--icon" alt="Informational" style="outline:none; text-decoration:none; max-width:100%; clear:both; display:block; height:16px; width:16px" src="https://images.ecomm.microsoft.com/cdn/mediahandler/azure-emails-templates/production/shared/images/templates/shared/images/icons/status-info-gray.png"></td>
        // <td align="left" valign="middle" style="word-wrap:break-word; border-collapse:collapse; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-right:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; padding-top:0; padding-bottom:0; margin-top:0; margin-bottom:0; color:#11100f; vertical-align:middle">
        // <span style="margin-top:0; margin-bottom:0; padding-top:3px; display:block; font-size:12px; line-height:1">Azure Active Directory is now Microsoft Entra ID.
        // <a href="https://aka.ms/aadrebrandFAQ" style="color:#0078d4; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding:0; text-align:left; line-height:20px; text-decoration:none">
        // Learn More.</a></span></td>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // <th class="x_expander" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; visibility:hidden; width:0; padding:0">
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </center>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </center>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // <table role="presentation" align="center" class="x_container x_template-container x_section" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; background:#ffffff; width:640px; margin:0 
        // auto; text-align:inherit">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <table role="presentation" class="x_wrapper x_outer-wrapper" align="center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td class="x_wrapper-inner" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-right:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; padding-bottom:12px; padding-top:6px">
        // <center style="width:100%; min-width:640px">
        // <table role="presentation" align="center" class="x_row x_float-center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; padding:0; width:100%; margin:0 auto; float:none; text-align:center; display:table">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-12 x_columns x_first x_last" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; text-align:left; font-size:14px; line-height:20px; margin:0 auto; width:616px; padding-bottom:12px; padding-left:24px; padding-right:24px; padding-top:6px">
        // <table role="presentation" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <h1 style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; color:inherit; margin-bottom:16px; letter-spacing:-.01em; font-family:Segoe UI Semibold,SegoeUISemibold,Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:600; font-size:28px; line-height:36px; word-wrap:normal">
        // Checklist Dev access request approved</h1>
        // <p style="color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; margin-bottom:0">
        // Your request has been approved. Details of your request are below.</p>
        // </th>
        // <th class="x_expander" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; visibility:hidden; width:0; padding:0">
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // <table role="presentation" align="center" class="x_row x_float-center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; padding:0; width:100%; margin:0 auto; float:none; text-align:center; display:table">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-12 x_columns x_first x_last" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; text-align:left; font-size:14px; line-height:20px; margin:0 auto; width:616px; padding-top:12px; padding-bottom:12px; padding-left:24px; padding-right:24px">
        // <table role="presentation" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <table role="presentation" class="x_card-table" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%; border-top:2px solid #c9c9c9; border-bottom:2px solid #c9c9c9">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-4" style="border-collapse:collapse; vertical-align:top; color:#11100f; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:33.33333%; font-family:Segoe UI Semibold,SegoeUISemibold,Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:600">
        // Requested app:</th>
        // <th class="x_small-12 x_large-8" style="border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:66.66667%">
        // Checklist Dev</th>
        // </tr>
        // <tr class="x_border-top" style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-4" style="border-collapse:collapse; vertical-align:top; color:#11100f; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:33.33333%; font-family:Segoe UI Semibold,SegoeUISemibold,Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:600; border-top:1px 
        // solid #dedede">
        // Status:</th>
        // <th class="x_small-12 x_large-8" style="border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:66.66667%; border-top:1px solid #dedede">
        // approved</th>
        // </tr>
        // <tr class="x_border-top" style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-4" style="border-collapse:collapse; vertical-align:top; color:#11100f; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:33.33333%; font-family:Segoe UI Semibold,SegoeUISemibold,Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:600; border-top:1px solid #dedede">
        // Reason:</th>
        // <th class="x_small-12 x_large-8" style="border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:66.66667%; border-top:1px solid #dedede">
        // Admin consent granted.</th>
        // </tr>
        // <tr class="x_border-top" style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-4" style="border-collapse:collapse; vertical-align:top; color:#11100f; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:33.33333%; font-family:Segoe UI Semibold,SegoeUISemibold,Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:600; border-top:1px solid #dedede">
        // Review date:</th>
        // <th class="x_small-12 x_large-8" style="border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; margin:0; text-align:left; font-size:16px; line-height:22px; word-wrap:normal; padding-top:8px; padding-bottom:8px; padding-left:0px; padding-right:0px; width:66.66667%; border-top:1px solid #dedede">
        // June 8, 2024</th>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // <th class="x_expander" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; visibility:hidden; width:0; padding:0">
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </center>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // <table role="presentation" align="center" class="x_container x_footer-template" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; background:#ffffff; width:640px; margin:0 
        // auto; text-align:inherit">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <table role="presentation" class="x_wrapper x_outer-wrapper x_footer-wrapper" align="center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%; background-color:#F0F0F0">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <td class="x_wrapper-inner" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-right:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; padding-top:12px; padding-bottom:12px">
        // <center style="width:100%; min-width:640px">
        // <table role="presentation" align="center" class="x_row x_float-center" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; padding:0; width:100%; margin:0 auto; float:none; text-align:center; display:table">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th class="x_small-12 x_large-12 x_columns x_first x_last" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; text-align:left; font-size:14px; line-height:20px; margin:0 auto; padding-left:24px; padding-right:24px; padding-top:12px; padding-bottom:12px; width:auto">
        // <table role="presentation" style="border-spacing:0; border-collapse:collapse; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left; width:100%">
        // <tbody>
        // <tr style="padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; vertical-align:top; text-align:left">
        // <th style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px">
        // <p class="x_margin-bottom-0" style="font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; word-wrap:normal; margin-bottom:0px; font-size:12px; line-height:16px; color:#484644">
        // <a href="https://go.microsoft.com/fwlink/?LinkId=521839" style="font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding:0; text-align:left; line-height:20px; color:#484644; display:inline-block; text-decoration:underline">Privacy
        //  Statement</a></p>
        // <p class="x_margin-top-8" style="font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; margin-bottom:12px; word-wrap:normal; margin-top:8px; font-size:12px; line-height:16px; color:#484644">
        // Microsoft Corporation, <span class="x_no-wrap" style="display:inline-block; word-break:keep-all">
        // One Microsoft Way, Redmond, WA 98052</span></p>
        // <p class="x_margin-top-8" style="font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; margin-bottom:12px; word-wrap:normal; margin-top:8px; font-size:12px; line-height:16px; color:#484644">
        // Facilitated by</p>
        // <img height="20" width="auto" class="x_logo-microsoft" alt="Microsoft" title="Microsoft" style="outline:none; text-decoration:none; max-width:100%; clear:both; display:block; height:20px; max-height:20px; width:auto" src="https://images.ecomm.microsoft.com/cdn/mediahandler/azure-emails-templates/production/shared/images/templates/shared/images/logos/microsoft-logo-2x.png"></th>
        // <th class="x_expander" style="word-wrap:break-word; border-collapse:collapse; vertical-align:top; color:#11100f; font-family:Segoe UI,SegoeUI,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif; font-weight:400; padding-top:0; padding-right:0; padding-bottom:0; padding-left:0; margin:0; text-align:left; font-size:14px; line-height:20px; visibility:hidden; width:0; padding:0">
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </th>
        // </tr>
        // </tbody>
        // </table>
        // </center>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </center>
        // </td>
        // </tr>
        // </tbody>
        // </table>
        // </div>
        // </body>
        // </html>
        // `;

        // // Extract content inside the <body> tag
        // let bodyContent = description.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        // let content = bodyContent ? bodyContent[1] : "";
        // // Remove HTML tags from the extracted content
        // let res = content
        //     .replace(/<\/?[^>]+(>|$)/g, "")
        //     .substring(0, 62000)
        //     .trim(); // Trim leading and trailing whitespace
        // Extract content inside the <body> tag

        // Remove HTML tags from the extracted content
        // let res = description.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        //     .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        //     .replace(/<\/?[^>]+(>|$)/g, "").substring(0, 62000).trim();

        // console.log(res.length); // Should print 0 if the body content is empty after tag removal
        // console.log(res); // Should print an empty string if the body content is empty after tag removal

        // const root: any = parse('<ul id="list"><li>Hello World</li></ul>');


        // Sample HTML string
        const html = `
<html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <h1 id="header">Hello, World!</h1>
        <p class="text">This is a sample paragraph.</p>
        <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
        </ul>
    </body>
</html>
`;

        // Parse the HTML
        const root = parse(html);

        // Get the content inside the <body> tag
        const bodyContent = root.querySelector('body').innerHTML;

        // Print the content inside the <body> tag
        console.log('Content inside <body> tag:', bodyContent);

        // Remove the <html> tag by creating a new root with only the body content
        const newRoot = parse(bodyContent);

        // Print the new HTML structure without the <html> tag
        console.log('New HTML structure without <html> tag:', newRoot.toString().replace(/<\/?[^>]+(>|$)/g, ""));

    }, []);
    return <></>
}
export default Re;
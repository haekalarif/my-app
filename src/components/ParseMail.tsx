import react, { useEffect } from "react";
import { ICase } from "./TicketWorkflow/Workflow";
import { Buffer } from 'buffer';
import bcrypt from "bcrypt";


interface IAttachmentFiles {
  filename: string,
  data: Buffer,
  type: string,
}

interface IAttachment {
  src: string,
  caption: string,
  createdDateTime: string,
  createdBy: string,
  id: string,
  isImage?: boolean,
  isHyperlink?: boolean,
  filename?: string,
  isArchive?: boolean,
}

interface IBlobMeta {
  id: string;
  name: string;
}


const ParseMail = (props) => {
  const now = new Date();

  const getBlobName = (originalName: string): IBlobMeta => {
    // Use a random number to generate a unique file name,
    // removing "0." from the start of the string.
    const identifier = Math.random().toString().replace(/0\./, "");
    return {
      id: identifier,
      name: `${identifier}-${originalName}`,
    };
  };

  const uploadAttachment = async (attachment: IAttachmentFiles, creator: string): Promise<IAttachment> => {
    const { id: blobId, name: blobName } = getBlobName(encodeURIComponent(attachment.filename));
    // const blockBlobClient: BlockBlobClient = blobContainerClient.getBlockBlobClient(blobName);
    // const blockBlobUploadOption: BlockBlobParallelUploadOptions = {
    //     blobHTTPHeaders: {
    //         blobContentType: attachment.type
    //     }
    // };

    try {
      // Upload the file into the container
      // const uploadResponse: BlobUploadCommonResponse = await blockBlobClient.uploadData(attachment.data, blockBlobUploadOption);
      // context.log('uploadResponse', uploadResponse);
      // const url: string = blockBlobClient.url;
      const url: string = "";
      const createdDateTime: string = now.toISOString();

      // Upload the blob information into the ticket database
      const newAttachment: IAttachment = {
        src: url,
        caption: blobName,
        createdDateTime: createdDateTime,
        createdBy: creator,
        id: blobId,
        isImage: attachment.type.indexOf("image") == 0,
        filename: `${blobId}-${attachment.filename}`
      }
      return (newAttachment);
    } catch (error) {
      console.log("Upload item error with msg: " + error);
    }
  }

  /**
 * This function purpose return html string with content id is used inside that string
 * 
 * @param htmlString 
 * @param keyValue 
 * @returns 
 */
  function replaceImageSrc(htmlString: string, keyValue: any) {
    const pattern = /<img[^>]*?src="([^"]*)"[^>]*>/gi;
    const contentIds = [];
    const modifiedHtmlString = htmlString.replace(pattern, (match, contentId) => {

      let replacedContentId = contentId;
      const cleanContentId = replacedContentId.split("cid:").pop();
      const src = keyValue[cleanContentId];

      if (cleanContentId && src) {
        contentIds.push(cleanContentId)
        return match.replace(replacedContentId, src);
      } else {
        return match;
      }
    });

    return ({
      htmlString: modifiedHtmlString,
      collectionContentIds: contentIds
    });

  }

  async function loadData() {
    const emailFromOutlook = {
      FromName: 'MOD Administrator',
      MessageStream: 'inbound',
      From: 'admin@M365x78560627.onmicrosoft.com',
      FromFull: {
        Email: 'admin@M365x78560627.onmicrosoft.com',
        Name: 'MOD Administrator',
        MailboxHash: ''
      },
      To: '"arifrozikinh@gmail.com" <arifrozikinh@gmail.com>',
      ToFull: [
        {
          Email: 'arifrozikinh@gmail.com',
          Name: 'arifrozikinh@gmail.com',
          MailboxHash: ''
        }
      ],
      Cc: '',
      CcFull: [],
      Bcc: 'support.M365x78560627@testmailticketing.teamswork.app',
      BccFull: [
        {
          Email: 'support.M365x78560627@testmailticketing.teamswork.app',
          Name: '',
          MailboxHash: ''
        }
      ],
      OriginalRecipient: 'support.M365x78560627@testmailticketing.teamswork.app',
      Subject: 'Ticket 48',
      MessageID: '78eb4b07-950d-4e1f-8c51-945eb7d37d62',
      ReplyTo: '',
      MailboxHash: '',
      Date: 'Tue, 31 Dec 2024 04:38:56 +0000',
      TextBody: '\n',
      HtmlBody: '<html>\n' +
        '<head>\n' +
        '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">\n' +
        '<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n' +
        '</head>\n' +
        '<body dir="ltr">\n' +
        '<div style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">\n' +
        '</div>\n' +
        '<div class="elementToProof" style="font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">\n' +
        '<br>\n' +
        '</div>\n' +
        '</body>\n' +
        '</html>\n',
      StrippedTextReply: '',
      Tag: '',
      Headers: [
        {
          Name: 'Return-Path',
          Value: '<admin@M365x78560627.onmicrosoft.com>'
        },
        {
          Name: 'Received',
          Value: 'by p-pm-inboundg03a-aws-useast1a.inbound.postmarkapp.com (Postfix, from userid 996)\tid CB1BC453CA2; Tue, 31 Dec 2024 04:39:08 +0000 (UTC)'
        },
        {
          Name: 'Received-SPF',
          Value: `pass (m365x78560627.onmicrosoft.com: Sender is authorized to use 'admin@M365x78560627.onmicrosoft.com' in 'mfrom' identity (mechanism 'include:spf.protection.outlook.com' matched)) receiver=p-pm-inboundg03a-aws-useast1a; identity=mailfrom; envelope-from="admin@M365x78560627.onmicrosoft.com"; helo=NAM10-MW2-obe.outbound.protection.outlook.com; client-ip=40.107.94.122`
        },
        {
          Name: 'Received',
          Value: 'from NAM10-MW2-obe.outbound.protection.outlook.com (mail-mw2nam10on2122.outbound.protection.outlook.com [40.107.94.122])\t(using TLSv1.2 with cipher ECDHE-RSA-AES256-GCM-SHA384 (256/256 bits))\t(No client certificate requested)\tby p-pm-inboundg03a-aws-useast1a.inbound.postmarkapp.com (Postfix) with ESMTPS id 31C30453CA3\tfor <support.M365x78560627@testmailticketing.teamswork.app>; Tue, 31 Dec 2024 04:39:08 +0000 (UTC)'
        },
        {
          Name: 'ARC-Seal',
          Value: 'i=1; a=rsa-sha256; s=arcselector10001; d=microsoft.com; cv=none; b=eG6P9PU0J9JA7osrVdx646YenUgfELfa8YwnhYnhCoVruJS1A8dJVG97VCLardwnkqQEpQvhjyirLQdmKuF527JCxgHUYiMsik3qBGks3Le6NwNEF/7R7ZrgOfia6BoaukJa1vvtw9oYKTqWG6/XFlUIWVi2BmMf+VUasYYVWPzjNkFRR/vQUN8W95+fMpL975vGkbv4dCrh4Qk8ggiv1V2l+VhwnqmwT6FDzXZB1w/D20J7mUIqSPztpt9Oem39mV8hPRAUl/fDp9ptKzvefFHZxUrGd/GLNDhpQW7z1faJZX54J3m/OcQyK6SPr5XJzlWI/nwn+FZsl2i2+8cAsw=='
        },
        {
          Name: 'ARC-Message-Signature',
          Value: 'i=1; a=rsa-sha256; c=relaxed/relaxed; d=microsoft.com; s=arcselector10001; h=From:Date:Subject:Message-ID:Content-Type:MIME-Version:X-MS-Exchange-AntiSpam-MessageData-ChunkCount:X-MS-Exchange-AntiSpam-MessageData-0:X-MS-Exchange-AntiSpam-MessageData-1; bh=eg+eJb1RzaVvaF1fIKoaEqF1afcWQG8fCq+VuyR1Csk=; b=knmJ0wraZfrE9IDRSs6DeGldLdZIignXdKrTwLElNH1SZMlC/injmValRyKb/OuTlj3eKdvFiDOd6sF1JceViGJbX3tSJsetyKoXVLJfLosREdNEZsMZTIN+uCkfWsDI7VjEMfVYCCfHeICqBT58TaRbPce/hc5rirYS7lkslGGBF5nZKO16Pi2XygcLmNqV5oFi4oR7ZgwYA3bTZLETRA0YjLMUWb6T1zRWT+42y6FDKPo02tciBrFsDj89FCGL96capRO7iaE5y5j0SLTZphhAVp9sY6fPRvLD5yqz59+flr3wkONTIJNT+xYC7ytrhzQ1ZI0epM3yfsWS2Zu4Zw=='
        },
        {
          Name: 'ARC-Authentication-Results',
          Value: 'i=1; mx.microsoft.com 1; spf=pass smtp.mailfrom=m365x78560627.onmicrosoft.com; dmarc=pass action=none header.from=m365x78560627.onmicrosoft.com; dkim=pass header.d=m365x78560627.onmicrosoft.com; arc=none'
        },
        {
          Name: 'Received',
          Value: 'from IA0PR22MB4239.namprd22.prod.outlook.com (2603:10b6:208:482::7) by EA2PR22MB5216.namprd22.prod.outlook.com (2603:10b6:303:255::13) with Microsoft SMTP Server (version=TLS1_2, cipher=TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384) id 15.20.8293.19; Tue, 31 Dec 2024 04:38:56 +0000'
        },
        {
          Name: 'Received',
          Value: 'from IA0PR22MB4239.namprd22.prod.outlook.com ([fe80::c1a4:ab17:522:e9e5]) by IA0PR22MB4239.namprd22.prod.outlook.com ([fe80::c1a4:ab17:522:e9e5%6]) with mapi id 15.20.8293.020; Tue, 31 Dec 2024 04:38:56 +0000'
        },
        { Name: 'Thread-Topic', Value: 'Ticket 48' },
        { Name: 'Thread-Index', Value: 'AQHbWz3VvKC8ocN/bUWcaBGOmb1lag==' },
        {
          Name: 'Message-ID',
          Value: '<IA0PR22MB4239212EBBC4D252908BEAD0AB0A2@IA0PR22MB4239.namprd22.prod.outlook.com>'
        },
        { Name: 'Accept-Language', Value: 'en-US' },
        { Name: 'X-MS-Has-Attach', Value: 'yes' },
        { Name: 'X-MS-TNEF-Correlator', Value: '' },
        {
          Name: 'msip_labels',
          Value: 'MSIP_Label_defa4170-0d19-0005-0004-bc88714345d2_Enabled=True;MSIP_Label_defa4170-0d19-0005-0004-bc88714345d2_SiteId=2d95428a-8548-47e9-b6a0-6063cd3320b3;MSIP_Label_defa4170-0d19-0005-0004-bc88714345d2_SetDate=2024-12-31T04:38:55.815Z;MSIP_Label_defa4170-0d19-0005-0004-bc88714345d2_Name=All Employees (unrestricted);MSIP_Label_defa4170-0d19-0005-0004-bc88714345d2_ContentBits=0;MSIP_Label_defa4170-0d19-0005-0004-bc88714345d2_Method=Standard;'
        },
        {
          Name: 'authentication-results',
          Value: 'dkim=none (message not signed) header.d=none;dmarc=none action=none header.from=M365x78560627.onmicrosoft.com;'
        },
        { Name: 'x-ms-publictraffictype', Value: 'Email' },
        {
          Name: 'x-ms-traffictypediagnostic',
          Value: 'IA0PR22MB4239:EE_|EA2PR22MB5216:EE_'
        },
        {
          Name: 'x-ms-office365-filtering-correlation-id',
          Value: 'a1cdbec1-2d18-434f-8442-08dd295509a7'
        },
        { Name: 'x-ms-exchange-senderadcheck', Value: '1' },
        { Name: 'x-ms-exchange-antispam-relay', Value: '0' },
        {
          Name: 'x-microsoft-antispam',
          Value: 'BCL:0;ARA:13230040|376014|34036016|586017|41320700013|366016|1800799024|10070799003|8096899003|38070700018;'
        },
        {
          Name: 'x-microsoft-antispam-message-info',
          Value: 'S2su47ZlOVJdgawe3+fAPfAifWo96YamGadMkwMN4QMK4ZcalL6pxX37ftcx+cXaxhbnL0kFVLXBXrDrARi6vyZXz87Z/Qr4iDV5p8sJKc+nR1OAUL3l+aHChPcJ8YeEBQMXV0RvmwTWz8BEbgcyTIk1yavMJND3H9OefgfG/Oe95zBm2xTZExjDGzNy/+gTZJAKb5UrwWzjNQXFVzcRfrkXhzl5Gnqb5JXG+lum5dmFhB9GHyl6uxC77yDyiVDPd4rAj7AKfTpfZ1ya4JGy5t6ENCSJsAnSB8z+C5yBSeE7d9WrG+SgMHP49xTB2GfYD7fv1d4XmQPN9mP8a04z6Vo5OiJep26GlfM9XWJ4ECZC2cQ3Ff1L0mYsLb3lY8ZApi4QaoQea/ixuHJNlJB3EwtgBskdsnl2Ypqy90VCBulAMpn4lG76YDODa+VzXUMvLXH3qstXefpKPrzaKFKZpNuhp9c+BHjdC9xFEqNb9bIsiRh1iBvvV0tw7sA8a8PL/79ok4Yky+jEFqGW6MQjldi4so5jFShVeH7HWRMcF9N7BvcFFX23H/tKb+MSvbN8Ea1rG7gmvOTr9/Vr6O1qmHbvKCAWk6oY86Y0Q+3Sew8SIWuAM9eb94zAkD7G5oGX1Z3dVSP/Kuo/h/ehQJR1bDCa0WTv/hcAj9VJp33gP2PwoDm1ZGNdIzdEeQqd9ZIOJoeygHW6Dg02Pj0Bsj97xADUcthZ5mP2BiLaXuvisl3l1V3w4EjS8LDXMZ3mOWoaCFUkg8C4SUt4d7igGvqr4p2dlPWQWbQtNSlQWXERMBFElWPhKUDF9h5lWRK80nedfI/710Yw5HPbOYvLlaP6wPrve819+3HkeAzHOagpIkX4Ca8IiJXSMDs9qkLw/V+c+pR2gY/PHUk0TOLEsJslxArSBqaP/A+OkqN8W55NtsZcxzip8VcK74ru3f8XD5yWAdhrdvOrCf53dAvqRVhOnXUaPpYImmIJJ5F8zLQXUtmb11Cc0jUrme0wHNO/taDwHwSCrT1VmtXIrGypxAZI2Uv172RcYMgjKWue0euc+IbstwfAOoLQ+T6TQz38vn0PENa7iLvl/8j3reS209oaVEQ+VDuIKh6QZ9ixa6HQyJ6eNnkf3hfaY+mEB6Y5GW/z'
        },
        {
          Name: 'x-forefront-antispam-report',
          Value: 'CIP:255.255.255.255;CTRY:;LANG:en;SCL:1;SRV:;IPV:NLI;SFV:NSPM;H:IA0PR22MB4239.namprd22.prod.outlook.com;PTR:;CAT:NONE;SFS:(13230040)(376014)(34036016)(586017)(41320700013)(366016)(1800799024)(10070799003)(8096899003)(38070700018);DIR:OUT;SFP:1102;'
        },
        {
          Name: 'x-ms-exchange-antispam-messagedata-chunkcount',
          Value: '1'
        },
        {
          Name: 'x-ms-exchange-antispam-messagedata-0',
          Value: '9XbBT9a3EOHlA33XbwMPFsKO79jylDZZnJb0BA9M6YZRIc8/iArBawkwcW1jZaMaVaF3FJYA89dbg880oHxX3TL08alOyOMo6raknhTa0RalOpSQbF2cKm9rsMUjPn6W1qCm+7dJuW8gUznwZkk3LSy6H687jyHup9FZowZCGy3UF9uqfj6MAVBw4a9HrwR39mV+pekpbsdHxyNEMJJ2Z1O+BbqsRTI8pspiwlS6HbKQfUvdjdWr0uv991DAZa/5bffFBXRFK84jzaGegfniIJdV8LEdQx4MeMF8hTpLoaYSpednD9b3+d7kEmusl0mNzznTN/uGJPPJ6TE3kQwBgI4oyuWMHCsmmyheSKN5KO8OPz++CtXYsZnqt9CaDlTxBoi7/gawSZ82niGWZr8MTuMf6l5xpak5fseORILPRjWF40PpZQJEj8QljdDXHIXnMMQpyOcbpgHBl4YN/D/ilYwRLxtkMFTegjOBtqWqq+fO3eRlNlGh0QHWXZZUtQRjDheWDkJF2S7zR1c/K/82MXzSQC7PF7Z3tlC93N05iA/BdDPCPl7sAY+0YYH+sqBcRql9aP3MuIumpVKBXWKgHuwOjF9JOH9M78ePaYmlj4huvB79u0Mag4Q1Hw18YVy6Yil7vTjyRL8ykqWcUBBoRkiD6f8Focu2LIBuGQ3OgoCPR/NpDcjAmhJtB1LxgREGOCuooZW+SddmQo1QPOJm1lYs/vcS7NsFIkrIWjLK5gvZTXk6EwkEY2PB725ymBniTpVOmcyHOFwQPFQs4wnS69ga5VwK0JHx/lfjHVweliVpm6Ppt2P6/gtByRNJzIKKehehLSHmkTOmYiW5RPUclv0sly2RaDEiUNacDUyg6rKIwJLwStdMsjuWhPWRIB/OWyOI/nyxpY4Bs+s/N8mYu1N0NCBtbql/MJnizWYpI3C/PNAM7ZpmKXBJUOVVXQ1XeqS+zXsbgOt0RxJxwenZMVOt10JjKeIVak3gsApaQ633deXeCDyhULulmW6XmN0LQFTqSsTf1soRT5aDvN7BYD2nr+j6tsOpc91Y/6Py/KUVrK/zfqLWOscjjm0FeHbcX6W9NyirHK7YvneLBIMPki2biH6sJD2o4VG5HVBWIOk435e3eEnvS4Dsq+yfeFm8amPOXmtNSrO0NuPRLD+I7BFjGgIButiQzx6MLCBOLlSy9fAP2hkmAdk91wRHFNZmi3yGwbqgMovLY1P1WBOWCTHv7kArraGyRypEx6nb8MwHUxe59fIFugwq06/HXgZGUjYVcynUBvmHPLiijuJ2kYnhVzQSBzZeewKL1RsfDVa/vP7pmOCKdVCQhjI6E3vIsfWlHJ2+T7DYYogcjmFG3gTRFoW9I3pFWIuyK6FIk39Zm+vWvNKP0D4E5bCGpFiPPkh4eoHfaV1C+JWGCqbIgm9rq9CDVnvVIb6bEjfgvp9AflBmWNXIgwaDPYIGD9UEqS00zCT7DXElGNi5D4AS0ugkDPegwugBsBc9MOgm1iB1lklxeidQi1EhitxtYCFFx0M/YjEGSXrScO6mhaFfl5J2mz1zRIJMo7/wAq+SmHRK5Z3ZpzA2OiX9ZOYW0tOsb1Ya1LdlYfELHa6nhfmSAlAsIt+/4LOx6/v6yln/hsWDSQfU7gcT9E2c50cu0v03SVDE4EWrUlYZuxx2Tz8CTg=='
        },
        { Name: 'MIME-Version', Value: '1.0' },
        { Name: 'X-OriginatorOrg', Value: 'M365x78560627.onmicrosoft.com' },
        { Name: 'X-MS-Exchange-CrossTenant-AuthAs', Value: 'Internal' },
        {
          Name: 'X-MS-Exchange-CrossTenant-AuthSource',
          Value: 'IA0PR22MB4239.namprd22.prod.outlook.com'
        },
        {
          Name: 'X-MS-Exchange-CrossTenant-Network-Message-Id',
          Value: 'a1cdbec1-2d18-434f-8442-08dd295509a7'
        },
        {
          Name: 'X-MS-Exchange-CrossTenant-originalarrivaltime',
          Value: '31 Dec 2024 04:38:56.7116 (UTC)'
        },
        {
          Name: 'X-MS-Exchange-CrossTenant-fromentityheader',
          Value: 'Hosted'
        },
        {
          Name: 'X-MS-Exchange-CrossTenant-id',
          Value: '2d95428a-8548-47e9-b6a0-6063cd3320b3'
        },
        { Name: 'X-MS-Exchange-CrossTenant-mailboxtype', Value: 'HOSTED' },
        {
          Name: 'X-MS-Exchange-CrossTenant-userprincipalname',
          Value: 'ZjCRCNihsITbYkbm/qRhSGW28p1OCAH6mr5Emmqo89jOjxAo29taqBiSN0zye/oGGxxq7vp6Xo6FmfsmGRtQBm/Uw/uYrAxHjje96Y78PmmXwmspS2HFSPkmxoQaTfvR'
        },
        {
          Name: 'X-MS-Exchange-Transport-CrossTenantHeadersStamped',
          Value: 'EA2PR22MB5216'
        }
      ],
      Attachments: [
        {
          Content: 'PCEtLSBDb21wbGV4IFhNTCBFeGFtcGxlIHdpdGggQXR0cmlidXRlcyAtLT4KPGNvbXBhbnk+CiAgICA8ZW1wbG95ZWUgaWQ9IjEiPgogICAgICAgIDxuYW1lPkFsaWNlIEpvaG5zb248L25hbWU+CiAgICAgICAgPHBvc2l0aW9uPlNvZnR3YXJlIEVuZ2luZWVyPC9wb3NpdGlvbj4KICAgICAgICA8ZGVwYXJ0bWVudD5FbmdpbmVlcmluZzwvZGVwYXJ0bWVudD4KICAgICAgICA8c2FsYXJ5IGN1cnJlbmN5PSJVU0QiPjc1MDAwPC9zYWxhcnk+CiAgICA8L2VtcGxveWVlPgogICAgPGVtcGxveWVlIGlkPSIyIj4KICAgICAgICA8bmFtZT5Cb2IgU21pdGg8L25hbWU+CiAgICAgICAgPHBvc2l0aW9uPk1hcmtldGluZyBTcGVjaWFsaXN0PC9wb3NpdGlvbj4KICAgICAgICA8ZGVwYXJ0bWVudD5NYXJrZXRpbmc8L2RlcGFydG1lbnQ+CiAgICAgICAgPHNhbGFyeSBjdXJyZW5jeT0iRVVSIj42MDAwMDwvc2FsYXJ5PgogICAgPC9lbXBsb3llZT4KICAgIDxlbXBsb3llZSBpZD0iMyI+CiAgICAgICAgPG5hbWU+Q2hhcmxpZSBCcm93bjwvbmFtZT4KICAgICAgICA8cG9zaXRpb24+UHJvamVjdCBNYW5hZ2VyPC9wb3NpdGlvbj4KICAgICAgICA8ZGVwYXJ0bWVudD5NYW5hZ2VtZW50PC9kZXBhcnRtZW50PgogICAgICAgIDxzYWxhcnkgY3VycmVuY3k9IkdCUCI+ODAwMDA8L3NhbGFyeT4KICAgIDwvZW1wbG95ZWU+CjwvY29tcGFueT4K',
          ContentLength: 693,
          Name: 'SF-IPDM943WHG-420200731AAWR244927840.xml',
          ContentType: 'text/xml',
          ContentID: ''
        },
        {
          Content: 'JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvTGFuZyhpZC1JRCkgL1N0cnVjdFRyZWVSb290IDMxMCAwIFIvTWFya0luZm88PC9NYXJrZWQgdHJ1ZT4+L01ldGFkYXRhIDI2MjUgMCBSL1ZpZXdlclByZWZlcmVuY2VzIDI2MjYgMCBSPj4NCmVuZG9iag0KMiAwIG9iag0KPDwvVHlwZS9QYWdlcy9Db3VudCA1MS9LaWRzWyAzIDAgUiAxMiAwIFIgMTggMCBSIDE5IDAgUiAyMCAwIFIgMjQgMCBSIDI2IDAgUiAzMSAwIFIgMzMgMCBSIDM2IDAgUiAzOSAwIFIgNDIgMCBSIDQ0IDAgUiA0NSAwIFIgNTEgMCBSIDU1IDAgUiA1OSAwIFIgNjQgMCBSIDY5IDAgUiA3NCAwIFIgNzggMCBSIDgxIDAgUiA4NCAwIFIgODkgMCBSIDkwIDAgUiA5MSAwIFIgOTQgMCBSIDk2IDAgUiAxMDEgMCBSIDEwNSAwIFIgMTA4IDAgUiAxMTEgMCBSIDExMiAwIFIgMTE0IDAgUiAxMTYgMCBSIDExOCAwIFIgMTIwIDAgUiAxMjIgMCBSIDEyNCAwIFIgMTI2IDAgUiAxMjggMCBSIDEzMCAwIFIgMTMyIDAgUiAxMzQgMCBSIDEzNiAwIFIgMTM4IDAgUiAxMzkgMCBSIDE0MSAwIFIgMTQyIDAgUiAxNDQgMCBSIDE0NiAwIFJdID4+DQplbmRvYmoNCjMgMCBvYmoNCjw8L1R5cGUvUGFnZS9QYXJlbnQgMiAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDUgMCBSL0YyIDkgMCBSPj4vRXh0R1N0YXRlPDwvR1M3IDcgMCBSL0dTOCA4IDAgUj4+L1hPYmplY3Q8PC9JbWFnZTExIDExIDAgUj4+L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXSA+Pi9NZWRpYUJveFsgMCAwIDU5NS4zMiA4NDEuOTJdIC9Db250ZW50cyA0IDAgUi9Hcm91cDw8L1R5cGUvR3JvdXAvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2aWNlUkdCPj4vVGFicy9TL1N0cnVjdFBhcmVudHMgMD4+DQpl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',
          ContentLength: 577835,
          Name: 'PEDOMAN PENULISAN SKRIPSI 2018.pdf',
          ContentType: 'application/pdf',
          ContentID: ''
        },
        {
          Content: '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',
          ContentLength: 955851,
          Name: 'Presentasi UAS Pemrograman Web 1.pptx',
          ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          ContentID: ''
        }
      ]
    }

    // const email = {
    //     FromName: 'Haekal Arif Rozikin',
    //     MessageStream: 'inbound',
    //     From: 'arifrozikinh@gmail.com',
    //     FromFull: {
    //         Email: 'arifrozikinh@gmail.com',
    //         Name: 'Haekal Arif Rozikin',
    //         MailboxHash: ''
    //     },
    //     To: 'admin@m365x78560627.onmicrosoft.com',
    //     ToFull: [
    //         {
    //             Email: 'admin@m365x78560627.onmicrosoft.com',
    //             Name: '',
    //             MailboxHash: ''
    //         }
    //     ],
    //     Cc: '',
    //     CcFull: [],
    //     Bcc: 'support.M365x78560627@testmailticketing.teamswork.app',
    //     BccFull: [
    //         {
    //             Email: 'support.M365x78560627@testmailticketing.teamswork.app',
    //             Name: '',
    //             MailboxHash: ''
    //         }
    //     ],
    //     OriginalRecipient: 'support.M365x78560627@testmailticketing.teamswork.app',
    //     Subject: 'Ticket 51',
    //     MessageID: '9b03c702-a2fd-4911-8421-b8fd9b897bd3',
    //     ReplyTo: '',
    //     MailboxHash: '',
    //     Date: 'Tue, 31 Dec 2024 11:42:04 +0700',
    //     TextBody: '\n',
    //     HtmlBody: '<div dir="ltr"><br></div>\n',
    //     StrippedTextReply: '',
    //     Tag: '',
    //     Headers: [
    //         { Name: 'Return-Path', Value: '<arifrozikinh@gmail.com>' },
    //         {
    //             Name: 'Received',
    //             Value: 'by p-pm-inboundg01c-aws-useast1c.inbound.postmarkapp.com (Postfix, from userid 996)\tid 2384E404CF7; Tue, 31 Dec 2024 04:42:20 +0000 (UTC)'
    //         },
    //         {
    //             Name: 'Received-SPF',
    //             Value: `pass (gmail.com ... _spf.google.com: Sender is authorized to use 'arifrozikinh@gmail.com' in 'mfrom' identity (mechanism 'include:_netblocks.google.com' matched)) receiver=p-pm-inboundg01c-aws-useast1c; identity=mailfrom; envelope-from="arifrozikinh@gmail.com"; helo=mail-pl1-f170.google.com; client-ip=209.85.214.170`
    //         },
    //         {
    //             Name: 'Received',
    //             Value: 'from mail-pl1-f170.google.com (mail-pl1-f170.google.com [209.85.214.170])\t(using TLSv1.2 with cipher ECDHE-RSA-AES128-GCM-SHA256 (128/128 bits))\t(No client certificate requested)\tby p-pm-inboundg01c-aws-useast1c.inbound.postmarkapp.com (Postfix) with ESMTPS id 89A77453CA2\tfor <support.M365x78560627@testmailticketing.teamswork.app>; Tue, 31 Dec 2024 04:42:19 +0000 (UTC)'
    //         },
    //         {
    //             Name: 'Received',
    //             Value: 'by mail-pl1-f170.google.com with SMTP id d9443c01a7336-215770613dbso93503075ad.2        for <support.M365x78560627@testmailticketing.teamswork.app>; Mon, 30 Dec 2024 20:42:19 -0800 (PST)'
    //         },
    //         {
    //             Name: 'DKIM-Signature',
    //             Value: 'v=1; a=rsa-sha256; c=relaxed/relaxed;        d=gmail.com; s=20230601; t=1735620139; x=1736224939; darn=testmailticketing.teamswork.app;        h=to:subject:message-id:date:from:mime-version:from:to:cc:subject         :date:message-id:reply-to;        bh=05tTouRlLOh1PsSowtHltM3ZeSb054IZ5wJlscdMSiY=;        b=QtsCP+FIUQ0TB1QUqBs60BgHqauoIfUbz+TX5rB3B7NnFR35+FLVXznkhzvYy69iSr         98F8yt24Kon+Uy7VW5xb9mSAhXs29O09OLMkUw/82794VisuQ9AuOjhiIRjMv5q7+6rw         vY+mwVug+bUBYq688uWlTDxP6GO6mC3P3X2jOGmusRA9ZdV6z40xL5FeuA7i8R87dasJ         lmdPn2IcSOWGCWZQLqnfa1UARt9Qk0btLYg1JRv7Qzsg4WAqDG60CuFwsFhcHqrJzU6M         mvJ3TBRnXE5QOGEO1SDnfBACFcuEKJJH5Rbzgta/IQePoH6yEwg322vtUR5ZbwBZjhVC         DCqw=='
    //         },
    //         {
    //             Name: 'X-Google-DKIM-Signature',
    //             Value: 'v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20230601; t=1735620139; x=1736224939;        h=to:subject:message-id:date:from:mime-version:x-gm-message-state         :from:to:cc:subject:date:message-id:reply-to;        bh=05tTouRlLOh1PsSowtHltM3ZeSb054IZ5wJlscdMSiY=;        b=Vf47tCSgaRR9aJvidO/mvegrjB73gd+ZZUs98dS1fbnN5jE//qPYcRtGkP/q5I7zy2         nHIN3zAMnZnOuiKCs95/ZMGvfWO0bLz+6DatOIU83Ls4L6tmkoZjxVPMLoD6tCmaGLTb         TzEoui+c77+axDTKEDAkMSylh2MqyFSsQaN5hLegHTYqAZfiKzpTAv0brEB02dJmKCY/         Oym6HRy7PaxlUraTnBsSCMfH/7WtUQGZr3nGQ91/er/taand+YNjK07McGkJ7XhuVXw+         5+9177K72PqCXPLJh8q8UjN4D1b6oXaJ7NGf2HO4VGSZ58JcywH63Pr5TbjT0y7f6yaz         jV7g=='
    //         },
    //         {
    //             Name: 'X-Forwarded-Encrypted',
    //             Value: 'i=1; AJvYcCWH2SZ9zxviqKhvoXQQtLcJf3rjecOhFGagtpx09e97pILD4VrorzaFJkNWOH/ahS0N6M2zKLcFx3qnJ4zhtGioGAN5oo8=@testmailticketing.teamswork.app'
    //         },
    //         {
    //             Name: 'X-Gm-Message-State',
    //             Value: 'AOJu0Yz2bljPfK5pUo5tJaK4VUNmSQEL1oO/ZXrNmE+SBqnjSDQ19kQ1\tzocWT0RLRBqVoHUs/QwzaidWjyfPpRCebOwjz37/I52qt8lnUogE8oPutcOrtzcbYswbrK/OCfF\tmBCIvfya+ISF6sezElL5z66TSwdc='
    //         },
    //         {
    //             Name: 'X-Gm-Gg',
    //             Value: 'ASbGncuUNlrRD7yAU7KodK0LNW3TLjLtN6rC7CnSPFzGqIc3msZNJLgaCArHmjskXwH\tChIBQ/vwHYJITqstgdYO5tfAg6KJf1rFqFBdoqw=='
    //         },
    //         {
    //             Name: 'X-Google-Smtp-Source',
    //             Value: 'AGHT+IFL0ka2/svYHJyP1b3qAwi9S1aLyH4GHQCq0Se/IwZ/69dnEF24sXrIL0kEH/9U3/CCU4hIsjWbOXHYHVHsc0E='
    //         },
    //         {
    //             Name: 'X-Received',
    //             Value: 'by 2002:a17:90b:3d43:b0:2ee:a583:e616 with SMTP id 98e67ed59e1d1-2f452e17cb9mr59452353a91.9.1735620137898; Mon, 30 Dec 2024 20:42:17 -0800 (PST)'
    //         },
    //         { Name: 'MIME-Version', Value: '1.0' },
    //         {
    //             Name: 'Message-ID',
    //             Value: '<CAHrYmFErX5m8usARcz4uoNBatvdkkrLVXb4860dYF26cKGHTQA@mail.gmail.com>'
    //         }
    //     ],
    //     Attachments: [
    //         {
    //             Content: 'JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvTGFuZyhpZC1JRCkgL1N0cnVjdFRyZWVSb290IDMxMCAwIFIvTWFya0luZm88PC9NYXJrZWQgdHJ1ZT4+L01ldGFkYXRhIDI2MjUgMCBSL1ZpZXdlclByZWZlcmVuY2VzIDI2MjYgMCBSPj4NCmVuZG9iag0KMiAwIG9iag0KPDwvVHlwZS9QYWdlcy9Db3VudCA1MS9LaWRzWyAzIDAgUiAxMiAwIFIgMTggMCBSIDE5IDAgUiAyMCAwIFIgMjQgMCBSIDI2IDAgUiAzMSAwIFIgMzMgMCBSIDM2IDAgUiAzOSAwIFIgNDIgMCBSIDQ0IDAgUiA0NSAwIFIgNTEgMCBSIDU1IDAgUiA1OSAwIFIgNjQgMCBSIDY5IDAgUiA3NCAwIFIgNzggMCBSIDgxIDAgUiA4NCAwIFIgODkgMCBSIDkwIDAgUiA5MSAwIFIgOTQgMCBSIDk2IDAgUiAxMDEgMCBSIDEwNSAwIFIgMTA4IDAgUiAxMTEgMCBSIDExMiAwIFIgMTE0IDAgUiAxMTYgMCBSIDExOCAwIFIgMTIwIDAgUiAxMjIgMCBSIDEyNCAwIFIgMTI2IDAgUiAxMjggMCBSIDEzMCAwIFIgMTMyIDAgUiAxMzQgMCBSIDEzNiAwIFIgMTM4IDAgUiAxMzkgMCBSIDE0MSAwIFIgMTQyIDAgUiAxNDQgMCBSIDE0NiAwIFJdID4+DQplbmRvYmoNCjMgMCBvYmoNCjw8L1R5cGUvUGFnZS9QYXJlbnQgMiAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDUgMCBSL0YyIDkgMCBSPj4vRXh0R1N0YXRlPDwvR1M3IDcgMCBSL0dTOCA4IDAgUj4+L1hPYmplY3Q8PC9JbWFnZTExIDExIDAgUj4+L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXSA+Pi9NZWRpYUJveFsgMCAwIDU5NS4zMiA4NDEuOTJdIC9Db250ZW50cyA0IDAgUi9Hcm91cDw8L1R5cGUvR3JvdXAvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2aWNlUkdCPj4vVGFicy9TL1N0cnVjdFBhcmVudHMgMD4+DQplbmRvYmoNCjQgMCBvYmoNCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTExMz4+DQpzdHJlYW0NCnictVldb9s2FH034P/AR2moGH6K5FAUUGPFVW0rniV3GII9GJ1jGGjcLVmxv797lQyLLcmKZToGog9TuofnHpKH1+RqTt6/v5pdZyPCPnwgH0fX5K/hgFGGf9YaThjRTlMpiFWcOkEe18PBrz+R3XDwsRwOrm444Zq6mJT3wwG2ZoQToQ0VnBh8QpHyAdqNC0M2T/Bqsqmu7MvVeDi4C+Zpucw/h5EOlmEUB5NQBaRMw8hVp3lWhL+T8vNwkELEX4YDDwgVM9Tp1wgrYC94yH48ks6uCXlFFe9LleCHQHgsEYHhpgnIPM1/CyMVLItljsckJ6MkjGSQk3mKVOXLKbADN5L8TI7q0DTjVLZC6+JI+ONIWEu1JLETNBY1IMVkkc0LZCfzToE0MY1bI3dRIP2NKCkF1Y7ERvTJhfI4tJ2kSpNYK6ptPRflIikrOXofsVJbKkxb4Mh/PBiYurWj3H88wyk82hKvK8O6X4ZFExAGmoeOy5iKuua/rB8pOavzjTGlreTdHFP4j6eex3VzPOo/nmZH+scuEM8e6V+XmGKPYnqZt2ANMafPW8Y7EO0clacPL+sfiOWUnZ4a5x9IDAd+ugXqaRebkChEoivROnM6kp5u7AgnUinK3OlIenqeY0iEpkaejqSn9TiGBByz7JGdnt6jeWVylOnKDtp6dm6nKWwWPqEr/vkCEyrMpLItdCcJHpdnAUhglAjD0BMfIkket+snUrnh1fb+xx94st01wiv+XO3+RxhfTVe7DQnWuygbhR5zphy1rXDfEUjZDDd+FP9NvqN3fPCePcUs5a4NRHP29ukxF6IHs8lBV1pQfji4SARvlwpuf70LsprtqqvM4yoljMJ5pxEXqOzv1S6MRLDBdJHixxMet99WbyDSXUpnOCx0G2DQGSCcUVBbuttcQF8wMbWy1blT9riUCmiKeZOSxvV5arGtMvXP6hv5tNqt7nHMbbuTJvilkoYwTRvaS2wzDNrilnjF9hEJWeMKUil79fgOK1EzPKfF1r9sRLXFfFv367Lx7zYEfHO62RD+zQZ3ca+ak8dCB48t7hS4sU378fnidrxAtSQznAhJUS7DyASjrKpbype6ZRjZ52Jmhl/mN7ga38L1onooKeE2Z1UL//UShRS2we8ksqdhASD2YD6C5hLgwQJch3GTTJbTMilCDYiAkTKdAGnI3pls7INQHDxIK4hOLnpuh6Hz0Fzt08EEtRrsuW6qJz7XeLMwDr6kC6ChyMrQBEAPKmwOJCVwc7bERtPQVlf5+NyaZw2jgg2hVG0Y32CWhA+zVFeScFQAdVxRXUNVJjkMonG6eD6CmDgPihQImibl2aXxQzkBM463IOlUU0+T1lgy5FUVC54z9nCyJPDyuHKOgvE35MyHL2vEqBg1uhnjXRD7L6Mqi5aiJV5nxf6VFRO4FEkwlg5rAYLB252jzr2CgTfxg8f95l/xN6/sYbVZc05G38l/wf4FHCxOfg0KZW5kc3RyZWFtDQplbmRvYmoNCjUgMCBvYmoNCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1RydWVUeXBlL05hbWUvRjEvQmFzZUZvbnQvVGltZXNOZXdSb21hblBTLUJvbGRNVC9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRm9udERlc2NyaXB0b3IgNiAwIFIvRmlyc3RDaGFyIDMyL0xhc3RDaGFyIDEyMS9XaWR0aHMgMjU5NyAwIFI+Pg0KZW5kb2JqDQo2IDAgb2JqDQo8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL1RpbWVzTmV3Um9tYW5QUy1Cb2xkTVQvRmxhZ3MgMzIvSXRhbGljQW5nbGUgMC9Bc2NlbnQgODkxL0Rlc2NlbnQgLTIxNi9DYXBIZWlnaHQgNjc3L0F2Z1dpZHRoIDQyNy9NYXhXaWR0aCAyNTU4L0ZvbnRXZWlnaHQgNzAwL1hIZWlnaHQgMjUwL0xlYWRpbmcgNDIvU3RlbVYgNDIvRm9udEJCb3hbIC01NTggLTIxNiAyMDAwIDY3N10gPj4NCmVuZG9iag0KNyAwIG9iag0KPDwvVHlwZS9FeHRHU3RhdGUvQk0vTm9ybWFsL2NhIDE+Pg0KZW5kb2JqDQo4IDAgb2JqDQo8PC9UeXBlL0V4dEdTdGF0ZS9CTS9Ob3JtYWwvQ0EgMT4+DQplbmRvYmoNCjkgMCBvYmoNCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1RydWVUeXBlL05hbWUvRjIvQmFzZUZvbnQvVGltZXNOZXdSb21hblBTTVQvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL0ZvbnREZXNjcmlwdG9yIDEwIDAgUi9GaXJzdENoYXIgMzIvTGFzdENoYXIgMTc3L1dpZHRocyAyNjAxIDAgUj4+DQplbmRvYmoNCjEwIDAgb2JqDQo8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL1RpbWVzTmV3Um9tYW5QU01UL0ZsYWdzIDMyL0l0YWxpY0FuZ2xlIDAvQXNjZW50IDg5MS9EZXNjZW50IC0yMTYvQ2FwSGVpZ2h0IDY5My9BdmdXaWR0aCA0MDEvTWF4V2lkdGggMjYxNC9Gb250V2VpZ2h0IDQwMC9YSGVpZ2h0IDI1MC9MZWFkaW5nIDQyL1N0ZW1WIDQwL0ZvbnRCQm94WyAtNTY4IC0yMTYgMjA0NiA2OTNdID4+DQplbmRvYmoNCjExIDAgb2JqDQo8PC9UeXBlL1hPYmplY3QvU3VidHlwZS9JbWFnZS9XaWR0aCAyMDAvSGVpZ2h0IDIwMC9Db2xvclNwYWNlL0RldmljZVJHQi9CaXRzUGVyQ29tcG9uZW50IDgvRmlsdGVyL0RDVERlY29kZS9JbnRlcnBvbGF0ZSB0cnVlL0xlbmd0aCAxMjQyNj4+DQpzdHJlYW0NCv/Y/+AAEEpGSUYAAQEBAEgASAAA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAyADIAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9/ooooAKKKKACiimsQBknAoAO1ISFGSQBXJeI/H+j+Hw0TSG4uwOIYTkj6noPx/I15ZrXxC1/W5TFDKbSFjhY4M7j6At1J+mPpXNVxVOnuz1sFkuJxS5rcse7PZ9T8UaPpC5vb+KNuy7uT9B3/KuQv8A4waXDlbO1nuSOjEbFP4nn9K880/wVreqHzXiMKscmS4Ygn8OT+YrbHgvQtMAOr6wN45Kqyrn8Dkn8K8mtnMU+WP+Z7FPK8uoaVZucuyJbr4v6vKSLayt4R23Mzn9MVmyfE7xNITiWBPZYv8AEmrwvPAlh/qrN7ph/ss3/oXFPHinQFGLXw0WHr5Kj+Wa5XmdeWqi/wAjtjTwkV+7w1/Uyh8SfEwPNzGfrEKsw/FTxDERvS1cd8owP86vHxXppHz+FyB6+Up/pUZ8Q+EZztudDaI9yIVGPxBzUrMsR/K/wHJYaWksNp5NF+y+MMwYC803I7tFJn8gQP511Om/E7Qb/ask/wBnc/wzKVx+PT9a4f8As7wNqfywXrWjn1Ygf+PDFVbz4dTlTLpl9FdIRkBvlJ+h5B/St6ec2dp6eqOapgsrq6NOm/M9uttQtrtA8MyOrDIIIIP5VazxXzVjX/C9xlTc2Zz1HKMf1U12mgfFeWNlh1iLjgedEDj8V/qPyr1qOOp1Op52J4eqxj7TDyU4+R7F1HSg1maZrdnqlus1tOkisOGU5H/6/atIc98iu1NNXR8/OEoPlkrMfRRRTJCiiigAooooAKKKKAGdP6Cl/nQenA5rM1nWbTRNPkvLyQJGg9eSewx6n0pNpK7KhCU5KMdWyxf6hbabavdXUqRxIMs7HAArxvxZ8SrvU3e00dnt7XODL0dx7f3R+v06VieJPE+p+MdSWJQ4g34gtk5yexOOp/Qdu+d7TvD2l+FbJdT111kuuqQdcH0A7n+X614mOzJQ92G7PrsJldHAxVXErmm9omJoXgq/1ci5u2Nran5jI4+Zh1yAf5n9a3/7T8PeGnFvo9qb++6F1G4k+m7H6KKETXfG75JNhpOeAOrj/wBm/QD3Irr9H8OadosQW2twZMfNK3LN+Pb6DAr5nF42MX++ld/yr9WXi8a3/Gf/AG6tvmcstj4v8Rc3NwNMtm6InBx+Bz+ZH0rQs/h3pMHz3bS3ch5JdiBn6DH6k12GOOtHWvGqZnWelP3V5HmyxtVrlh7q8jOtdB0q0x5FjboR3EY/wpdUv7DRNLuNQu9sdvAhZiByewAHck4AHqRV/pxXgnxP8Zf29qn9mWUudNtGILKeJZBwW9wOQPxPcV7nC+TYjPMdGk2+Rbs87E4mUItyep2fgP4i/wDCR6vdadqUcUU0rmSzAAA294ye5AGQe/PoBXoU9lb3CbZYI3HoyAj9a+ToJ5ra4juIJGjliYPG6nBUg5BB9jX0l4H8WReK9CWclVvYcR3MY4w2OGA9D1H4jtX0/HnCbytxxeDT9n18jnweLlPRvUsXfg3Qr0HfYRxse8WV/lisGXwHdWDmXQ9VmgbrscnB+uP6g13vFB571+c0syxFP7V15nrQxlaCte68zzqTxDrGkn7N4k0v7TbN8pmVQQR79j9OKguPCmi+I4WutAukjl6tC2cA+hB5X+XtXpEkSTRtHLGrIwwVYZyPcGuN1fwOqz/btBmNldqchVJ2sfT2/l7V6eGzCnJ6e5L8Duw+NipXi+SX4P1RwMcuteENT4MlvKDkqeUkA/Qj3HT2r1bwl8QLbWlW2uCILsDmMnhvUqe/06j9a5iHW4NQJ0TxZaiK46LKwwCfUHsfcHB9ulcz4i8LXfh2dbmB3ktSwMc68FT2zjofQjg19Jg8ylCXJU/4D9Dur0aGYL2ddKNTo+jPoiOVZFypFSZryfwP4+a5aPT9ScC46JIeBJ7H0P8AOvU4JkmQMp7V9HTqxqRuj5DG4KrhKjp1ET0UUVocgUUUUAFFFNJAGSeBQBUvr2HT7OW5uJFjiiUs7E4AAFeAeKvEt54w1lViVxbhtttAO/bJHcn9Bx6k73xO8WNqF8dGtHP2aFv3xU/fcfw/Qfz+lJ4c0618L6K+vaon+kOv7mM9R6AD1P6D8a8PMsbyLkjqz7DK8JHBUViqivOXwr9SxaWlh4E0kXd4Fn1WYYRAeR7D0A7n/wCsKm0Xw1d65dDWfEGXLcxWxGAo7ZHp7d+9J4b0a417UP8AhIdYGQxzbwkcAdjj0Hb1613wXGMDGK+OxuMdJuMXeb3fbyRjisVKLet5vd/ohEVUUKowAMAAdKdRRXgOTbuzy73DrQTRWJ4o8RWvhjQ5tRuMMwG2GPODJIQcKPbuT2ANdOEwlTFVo0KSu5EykoptnJ/FLxl/Y+nf2NYS4v7pT5jKeYozwfoT0HoMnjivB6uajqN1quoz395IZLidyzsfXsB6ADAA7AAU630jU7wA2unXk4PQxQMw/QGv6f4XyjCZDgY05ySm92eHWnOtK6WhS71veE/Elx4W12LUIdzQn5LiIHiSM9R9R1B9R9arP4Z19F3NoepAeptJMfyrOmhmtn2TxPG3911IP5GvaxbwOY0JYec4tSVt0ZRU4Pmsz6wsb621GxgvLSUS286B43HcH+R7EdjxVr3rw34VeMhpd8NCvpcWdy37h2PEUh7Z7Bj+Rx6k17lX8wcT5BVybGyoy1i9n5HuUKqqRv1CiiivmjcyNc8PWWu2piuU+cA7JFHzKfY/5FcdZ3914cu/7C8QKJtPkG2Kdhldp4wc9vUdvpivR+azta0e21uwa2uUyCMhx1VuxBr1sHjuX91V1j+R1YfE8v7uprH8vNHlXivwu2hzreWhZrGRgY3Bz5Z7DPp6H+tdt4A8aNeoLC9cfaoxwxP+sUd/qO/51laPdSafcy+E9eUSQSDbA79GB6AH0Pb0Ix6Y5HWdMuvC2ur5TsNreZBLjqPf3HQj/Gvrsvxsqc+STv280e5KnHH0nhq3xJe6+59JRSLIgYHrT89eK47wZ4lj1nTY5MgP911z91h1H9R7EV2A7V9RGSkro+Hr0Z0ajpzVmh9FFFUZidq5Px34hHh/w9LMhxdS/u4R/tHv+AyfwrqjwOfSvA/iTrbav4na2jYtBZ/ulA5Bc4LfjnA/CufE1fZ02z1cmwSxWJSl8K1ZS8G6IdZ1j7Rc5a3gPmSludzHkA+uTkn6e9dEUbxr4q8oE/2VYnnBwHP/ANcj8h70XoPhXwVBYRAi/vuGx97Jxux9BhR9RXWeF9GTRNFgt8DzmG+Ujux6/lwPwr4XG4vljKt1ekf1Z7+Nxd26y9I+nc2I0VECqoVQAAAMAAU+jtRXyrk5O7PB31EPFQ/aoP8AnvD/AN9inTf6iT/dP8q+WdD0K71+/FrahVCqWlmc4SJB1Zj2A/U8V9hwzwzSzilVqVavIoHNWrODUYq7Z9TrcQu21JUY+gYE15r4l0T/AISrxGxvZ5ruG0ykOn2BGEHdpZWwqE45HJAAGeKdoehafounQCGO7S1uiVVoIi17qJAy20DmOIAZ6jjGTyCexkubLS5tPjWC1fwrqCCzmiMakW85OVMnXIbO0g5wQMnmvYynJ3gMQ61GenR9f+AVUnGMUpq7MDwt4VsLmSaPSpdJs/s+BI1nF9qkUnPBnfK54OQM4/KtbwxbaN4rguJYtT1mR4JNrx3FwYmKkZVwqYG1hkg98H0q2YY/C0+vQC7tbDTb5RPZEsB5M7KVdQg5xkKwA7kisPQ7XSdCurC60iLXbua3tRazPtYR3CADAxKQFAOSAuMZI5Br2a1SinetO782RGVaS9xWQvhz+zfEGqSWa2t3asockDWJDPEVbGJYiQVJ6gjcOxIq94k0yy0ZbaG51q9cXTMI4Lm0F4pCrliVC7sAdTnvzVfTkXTdWttRudP8R3JtEkjtVuHgk8pXxkZUh24GBuJwPfmrF7Pouv8Aia3vb/Vr3TjDamC2hJktZEkZgWYPwDkBRjJHB68YzhVwknaElf1G3iFq/wDM4/U/h9p+oWK6hHpyeRKu+O/0ViyEdi0Dc49QpyK7jwrd3D6FGt5fQXjwEx/aY2I8xRjBYHBVscEHPIznmsXxXf63oPh9tN0HT7nTNFtU8iK9jKSSSyEgIBliVRmblyCSeMLnNb3iay0a1urFJNQjsdaviIInC5F02MESIBhlJ4yQMEgA9q584wVXMKCpud7bXCnUp83vKzNT7Tb5z50X/fYpyTRyEiORHxyQrA4rwvxj4EaOW5uLCz+zXsCmS609TlSveWE919V6jp2xWh8EP+Qnq/8A1xj/APQjXk4rhDD08rnj6da7jurCdWcanI1ue0UUUV+fHUc34v8AD41nTt8IxeQZeFhxk91z74/A4rnYtvjPwnJbzADVbLgE8EsOmfQMOvuPavRPXNefazH/AMIt4yg1SIFbO9JScDoCcZP/ALN+Br3suxEpx9lf3o6r/I9LBVZSXIn70dV/kct4Q1iTQ9dWOUlIZWEcgPG1s4BP0PB+vtX0Bp10Lm3Ug5OK8H8e6QNP1kXcQxDdguMdAwxu/PIP516H8PddN9pkPmNmRf3cnPcd/wARg/jX3WWYlVaZWe0I16UMbBb7+p6JRSA5GaK9Y+VMrxBqC6Vol3et0iiZsepA4H58V4J4Tsn1nxVC02XAczyE98HPP1JH516b8WtQNt4ZS1U83MqqQPQZb+gH41x/gFFsNJ1XWHH+rTap/wB0ZP55FeDnNZxhZf1c+uyiHsMvqVvtS0RoIn/CRfEVj96105cD03D+uc/9816AOmPSuL+HVqV0qe/kyZbuYsWPcDj+e6u1r4PNJ/vVTW0dDix0l7RU1tHQOtHSjNZeta9pnh+yN3ql0kEfIUE5Zz6KByT9PxxXJh8NVxFRU6MXJvscUpKKuzQmGYmA7qQOfavL9N0m18N+HJX8j7RZW0qLcy4IS7uSQAHb',
    //             ContentLength: 577835,
    //             Name: 'PEDOMAN PENULISAN SKRIPSI 2018.pdf',
    //             ContentType: 'application/pdf',
    //             ContentID: 'f_m5bzejsv0'
    //         },
    //         {
    //             Content: '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',
    //             ContentLength: 955851,
    //             Name: 'Presentasi UAS Pemrograman Web 1.pptx',
    //             ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    //             ContentID: 'f_m5bzemc41'
    //         }
    //     ]
    // }

    const email = {
      FromName: 'Conrado Marin',
      MessageStream: 'inbound',
      From: 'conramarin@gmail.com',
      FromFull: {
        Email: 'conramarin@gmail.com',
        Name: 'Conrado Marin',
        MailboxHash: ''
      },
      To: 'soporte@todotelecom.com',
      ToFull: [{ Email: 'soporte@todotelecom.com', Name: '', MailboxHash: '' }],
      Cc: '',
      CcFull: [],
      Bcc: 'soporte.todotelecom@mailticketing.teamswork.app',
      BccFull: [
        {
          Email: 'soporte.todotelecom@mailticketing.teamswork.app',
          Name: '',
          MailboxHash: ''
        }
      ],
      OriginalRecipient: 'soporte.todotelecom@mailticketing.teamswork.app',
      Subject: 'recuperación de contraseña cámara ip',
      MessageID: '7ccf513e-252d-48cc-963f-2badaaa2c35f',
      ReplyTo: '',
      MailboxHash: '',
      Date: 'Thu, 26 Dec 2024 16:04:36 +0100',
      TextBody: 'buenas, pueden generar el archivo para recuperar la contraseña de una\n' +
        'cámara ip, gracias\n' +
        'ajunto archivo exportado\n' +
        '-- \n' +
        'Un saludo\n' +
        'Att. Conrado Marín.\n' +
        '\n' +
        '\n' +
        'NOTA:\n' +
        'Por favor, si vas a REENVIAR, asegurate de\n' +
        'BORRAR TODAS LAS DIRECCIONES DE EMAIL VISIBLES\n' +
        'y utilizá el campo "CCO" o "BCC" para escribir las direcciones de VARIOS\n' +
        'destinatarios.\n' +
        'De esta manera evitás que todos conozcan las direcciones del resto de la\n' +
        'lista.\n' +
        'Así no alimentamos a los spammers.\n' +
        'Gracias.\n',
      HtmlBody: '<div dir="ltr"><div><br clear="all"></div><div>buenas, pueden generar el archivo para recuperar la contraseña de una cámara ip, gracias</div><div>ajunto archivo exportado<br></div><div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><div>Un saludo<br>Att. Conrado Marín.<br><br><br>NOTA:<br>Por favor, si vas a REENVIAR, asegurate de<br>BORRAR TODAS LAS DIRECCIONES DE EMAIL VISIBLES<br>y utilizá el campo &quot;CCO&quot; o &quot;BCC&quot; para escribir las direcciones de VARIOS destinatarios.<br>De esta manera evitás que todos conozcan las direcciones del resto de la lista.<br>Así no alimentamos a los spammers.<br>Gracias.</div></div></div></div></div>\n',
      StrippedTextReply: '',
      Tag: '',
      Headers: [
        {
          Name: 'Return-Path',
          Value: '<SRS0=dMno=TT=gmail.com=conramarin@todotelecom.com>'
        },
        {
          Name: 'Received',
          Value: 'by p-pm-inboundg01c-aws-euwest1c.inbound.postmarkapp.com (Postfix, from userid 996)\tid B132D453CA4; Thu, 26 Dec 2024 15:04:52 +0000 (UTC)'
        },
        {
          Name: 'X-Spam-Checker-Version',
          Value: 'SpamAssassin 3.4.0 (2014-02-07) on\tp-pm-inboundg01c-aws-euwest1c'
        },
        { Name: 'X-Spam-Status', Value: 'No' },
        { Name: 'X-Spam-Score', Value: '-0.1' },
        {
          Name: 'X-Spam-Tests',
          Value: 'DKIM_SIGNED,DKIM_VALID,DKIM_VALID_AU,FREEMAIL_FROM,HTML_MESSAGE,\tRCVD_IN_VALIDITY_RPBL_BLOCKED,RCVD_IN_VALIDITY_SAFE_BLOCKED,\tRCVD_IN_ZEN_BLOCKED_OPENDNS,SPF_HELO_NONE,SPF_PASS'
        },
        {
          Name: 'Received-SPF',
          Value: `pass (todotelecom.com: 82.223.17.138 is authorized to use 'SRS0=dMno=TT=gmail.com=conramarin@todotelecom.com' in 'mfrom' identity (mechanism 'a' matched)) receiver=p-pm-inboundg01c-aws-euwest1c; identity=mailfrom; envelope-from="SRS0=dMno=TT=gmail.com=conramarin@todotelecom.com"; helo=serverarsys-todotelecom.addisnetwork.es; client-ip=82.223.17.138`
        },
        {
          Name: 'Received',
          Value: 'from serverarsys-todotelecom.addisnetwork.es (todotelecom.com [82.223.17.138])\t(using TLSv1.2 with cipher ECDHE-RSA-AES128-GCM-SHA256 (128/128 bits))\t(No client certificate requested)\tby p-pm-inboundg01c-aws-euwest1c.inbound.postmarkapp.com (Postfix) with ESMTPS id 2A5CA405458\tfor <soporte.todotelecom@mailticketing.teamswork.app>; Thu, 26 Dec 2024 15:04:51 +0000 (UTC)'
        },
        {
          Name: 'Received',
          Value: 'by serverarsys-todotelecom.addisnetwork.es (Postfix, from userid 30)\tid AD01920E24B8; Thu, 26 Dec 2024 16:04:50 +0100 (CET)'
        },
        {
          Name: 'DKIM-Signature',
          Value: 'v=1; a=rsa-sha256; c=relaxed/relaxed; d=todotelecom.com;\ts=default; t=1735225490;\tbh=UD7r/Tay/m7aOx4mAQhl/K7X9WO9S75Un18pBOWM8N8=;\th=Received:Received:From:Subject:To;\tb=lqSQ3DTtGgxTJ0jOBYoX47XHmpGLl5DA/fbqsXGpfrpJU7Vx+PCcCK5XeApuvy3LS\t 4z2lyodqMhF6DADEL1mgUrz/lOGuz47P1gB57HnSScT10m54B3trpW34Lqixyu/8gf\t BxZXHZK09fmBB92ehPSvBQJl5u8CxjOF6bnQHLUdX5QIGR3/89tPzdT09KprFgFADa\t R68FqWApaYAimgpLA3mkPToucbFNEPElpmG/i2KA2Eoy1+8W1HlvgHwOejQX5fcf5y\t p4sm/wIyyiCLc3sugV5oxbqvbiciPSNeTp9+WIsCcNh+/rvY7PLAK2aHxe1LNZp5zG\t +BuwNHjiaSH1g=='
        },
        {
          Name: 'ARC-Seal',
          Value: 'i=1; cv=none; a=rsa-sha256; d=todotelecom.com; s=default; t=1735225490; b=a92Id+ziWue1Gc/gr4o5Elj64gAG9DgQOtGVpgNhkvUwIxCOsb4TzxuQXnkWp009n8Ikn NIZWthepOb0zlKnip04sKU0V3JsXIQUXZb9EaX0O4T/3VlNcD6q4G/Dlntv63LUyaTjP7gR NrAXC3M3iq1M9HRoT0yDXGJOmgTvpiVIXNZuDzBaPEGBAgz4qYUPZizZrbpVZ0d6WrP4XHE DVXpCmrXB//kMR9bgLCxCut6JQRwNWOjjkip4MjBvJ8010Y2W+JQCM8KFV3Oi5CTNrXMNbd ivcxQ1ZGgR0eDSf6OlyEKPdHeZkrsHi9BwNvVv09aNZXu07JLUB0jl5bYVjw=='
        },
        {
          Name: 'ARC-Message-Signature',
          Value: 'i=1; a=rsa-sha256; c=relaxed/relaxed; d=todotelecom.com; s=default; t=1735225490; h=mime-version : from : date : message-id : subject : to : content-type : from; bh=UD7r/Tay/m7aOx4mAQhl/K7X9WO9S75Un18pBOWM8N8=; b=MvfqYDYSuKcNi4ez/WXUXTjRh+CbOAVute6wj0Sx5nZU8D+pfpwVbP7SZW7eB7d+4VoW6 TS/1U+YjkZWkBze2CBBjwFZRQIywUpSLc5lJCXqWw/ZdGeLsAJVrQNjF2B2zOb0BSQF6PJ/ cIfT8lRvL/Le+riswJFsszHJuxq6iN59WfW11PReGfOCXIMiTUEcO0WbCBofMQl5D/4ltXo erIYF4tiAyDVXLzopIfOpGQD/Ajx9tJwmvGbkUj/xPpqEH6L3UBjRCPI+vnOn4qSREhvc9T yKgZ3Kb2b/9Do9NBSb9jcsszCdaXmlDN5JG6pk/KUEjSwgWzaXU2GYiyByFA=='
        },
        {
          Name: 'ARC-Authentication-Results',
          Value: 'i=1; serverarsys-todotelecom.addisnetwork.es;  dmarc=pass smtp.from=gmail.com header.from=gmail.com;  dkim=pass header.d=gmail.com;  spf=pass smtp.mailfrom=conramarin@gmail.com smtp.helo=mail-qk1-f178.google.com'
        },
        { Name: 'X-Original-To', Value: 'soporte@todotelecom.com' },
        { Name: 'Delivered-To', Value: 'soporte@todotelecom.com' },
        {
          Name: 'Received',
          Value: 'from mail-qk1-f178.google.com (mail-qk1-f178.google.com [209.85.222.178])\tby serverarsys-todotelecom.addisnetwork.es (Postfix) with ESMTPS id E6E2920E0399\tfor <soporte@todotelecom.com>; Thu, 26 Dec 2024 16:04:49 +0100 (CET)'
        },
        {
          Name: 'Authentication-Results',
          Value: 'serverarsys-todotelecom.addisnetwork.es;\tdmarc=pass (p=NONE sp=QUARANTINE) smtp.from=gmail.com header.from=gmail.com;\tdkim=pass header.d=gmail.com;        spf=pass (sender IP is 209.85.222.178) smtp.mailfrom=conramarin@gmail.com smtp.helo=mail-qk1-f178.google.com'
        },
        {
          Name: 'Received-SPF',
          Value: 'pass (serverarsys-todotelecom.addisnetwork.es: domain of gmail.com designates 209.85.222.178 as permitted sender) client-ip=209.85.222.178; envelope-from=conramarin@gmail.com; helo=mail-qk1-f178.google.com;'
        },
        {
          Name: 'Received',
          Value: 'by mail-qk1-f178.google.com with SMTP id af79cd13be357-7b6e9317a2aso628816885a.0        for <soporte@todotelecom.com>; Thu, 26 Dec 2024 07:04:49 -0800 (PST)'
        },
        {
          Name: 'DKIM-Signature',
          Value: 'v=1; a=rsa-sha256; c=relaxed/relaxed;        d=gmail.com; s=20230601; t=1735225488; x=1735830288; darn=todotelecom.com;        h=to:subject:message-id:date:from:mime-version:from:to:cc:subject         :date:message-id:reply-to;        bh=UD7r/Tay/m7aOx4mAQhl/K7X9WO9S75Un18pBOWM8N8=;        b=R6K8CHs0Nijzsx3RAMIqcmNvni9yJwqTe4+1QIjTwOrh2y8tIqDUuu5W21wmE2hSzX         GJwXktuHFTkBfkN8A5i1zlO0IEaWorTpAl8zg4faWhd5V2xJbbuyBWnIhkctbxZpF1Eb         fVTI3+3CGA3egovbnrp1ZdrlQIQUxTzbWedg0cGZnyvQSmr/TiB2C+LXaWBVydZCXvKF         8mOQdsLv7pitrJk75YS5d6lKVP9JMnw0W0GJmf9eJWDC70QCtoL9O9xbBmgrdjhjagwV         GcvczMwyRKReW8kwGCihlm0lOl/Wh97XjJdHt8vBQnhhBItOLwyTcchR+yAIN9Rugueo         0f1Q=='
        },
        {
          Name: 'X-Google-DKIM-Signature',
          Value: 'v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20230601; t=1735225488; x=1735830288;        h=to:subject:message-id:date:from:mime-version:x-gm-message-state         :from:to:cc:subject:date:message-id:reply-to;        bh=UD7r/Tay/m7aOx4mAQhl/K7X9WO9S75Un18pBOWM8N8=;        b=BxFvBsi8C2YkW9LMdjYrKfZtnYNxB0J8zrkadMmGyVbb3PpACPl/8GjFXHNsNCHN+7         Go+685eEzqW2exfBksTGni1nJk0rJjAn75Jj0/WP1MI4ONe60ZT/QVCEfcPqkUFD440G         se7bVRqcE27IgYDN9bx6yCJgsiByjDjwIST8lJTa4nLKJTnTNlVuxhxlnzbjQtpGjyPT         PY8ImT63ajDql9vABZkqxd5sMiO0oGm1+qDNUkr18IOaigbRnO9HFZ2nhWn6GmmdljB0         aWFtIUQ+KwKugfVWlg0zl5ayTKgzlztXv4asqVWtoZy5Vu2z1r/cuiwW9PAdZZKnOWUb         j07A=='
        },
        {
          Name: 'X-Gm-Message-State',
          Value: 'AOJu0YwAOy0p5aOb6gO01x6M/cdxA2PeLarbRGD7vJa56l/JEpY0pDsU\tCdhx5iPAX1x/8jM0Cb38PVAhXjsO62BP13niuMOKTZ3yoKzrTbp4lPdZBTaxh3Nos/7svg9/eE/\tigVLN7WtI3zaf4cOdHOQmw0q/xfsHrsST3KE84+ma'
        },
        {
          Name: 'X-Gm-Gg',
          Value: 'ASbGncvLl2F4EFdHV0NmPCjapj3q0LXpvWV2oVSatNwhwjj1Dk61okCujDdub81JoNu\t87a0K4/J+oSdMNnxBmiaBPOcVXTZar7mmFpHi'
        },
        {
          Name: 'X-Google-Smtp-Source',
          Value: 'AGHT+IEMAHpQ0Zw47mHF7DX02jFIwbFwEx/ixmu7JvCNEynsJas7B2f9s8QmFOWj+OFgvVrFYNuJdl9WNtTGMzHlDaI='
        },
        {
          Name: 'X-Received',
          Value: 'by 2002:a05:620a:4726:b0:7b6:d241:3f0b with SMTP id af79cd13be357-7b9aa99f4famr4822948185a.14.1735225488245; Thu, 26 Dec 2024 07:04:48 -0800 (PST)'
        },
        { Name: 'MIME-Version', Value: '1.0' },
        {
          Name: 'Message-ID',
          Value: '<CAJjQL8dEwkZxx18doubVwsvcP+XZi9AgGFmpbyO=ke6iimER_A@mail.gmail.com>'
        },
        {
          Name: 'X-PPP-Message-ID',
          Value: '<173522549066.1453543.3046667229312284476@serverarsys-todotelecom.addisnetwork.es>'
        },
        { Name: 'X-PPP-Vhost', Value: 'todotelecom.com' }
      ],
      Attachments: [
        {
          Content: 'QkFBQUFKQU9DNXljU2ZwOG0wZk9sTUN2UWoya3Z2L0NXVFBRNGVSeEovTEpwQzkvRG5qRkMxMUU5NE9tVmpSd2kyT3Y0akp1TzE4TW0wRmZPaTVrc2NISTkrU1FOZDJQdTVaTDdYRlZLby9nbHJFNC9nZnBDU21FZFBFcklGWWtGb1QrdVRKN1pROUZ0c1ZJUmdNZk42R3VWZXNDVGkzV3BLOEJ2RkJTeFdZcDZQZXFTRi1JUERNOTQzV0hHLTQyMDIwMDczMUFBV1IyNDQ5Mjc4NDA=',
          ContentLength: 212,
          Name: 'SF-IPDM943WHG-420200731AAWR244927840.xml',
          ContentType: 'text/xml',
          ContentID: 'f_m55gg1430'
        }
      ]
    }
    const sender = email.FromFull; // Sender should never be empty
    /**
* X-Google-DKIM-Signature is indicator that the email is sent from gmail (google service)
*/
    const emailIdentityFromGmail = "X-Google-DKIM-Signature";
    const isEmailFromGmail = email?.Headers?.find((item) => item.Name == emailIdentityFromGmail);




    let ticketToPush: ICase = {
      // title: `Ticket ${trackingId}: ${parseResult.subject}`,
      title: `${email.Subject} - TrackingID#${""}`,
      department: "",
      requestorEmail: "adam",
      requestorName: "adam",
      requestorId: "adam",
      category: "",
      customFields: {},
      status: 'Open',
      instanceId: "adam",
      expectedDate: undefined,
      assigneeName: "",
      assigneeId: "",
      priority: "",
      attachments: [],
      description: email.HtmlBody || email.TextBody,
      createdDateTime: now.toISOString(),
      tags: [],
      // lastInteraction: now.toISOString(),
      firstTimeResponse: "",
      timeResolution: "",
      isFrtEscalated: false,
      isRtEscalated: false,
      trackingId: "",
      // trackingId: Math.round(Date.now() + (Math.random() * Math.pow(10, 13))).toString()
      mailbox: "",
      messageId: "",
      // messageIds: [""]

      // createdBy: user,
      // lastUpdatedBy: user,
      // cc: cc
    }

    /**
      * Handle attachment in inline html and is uploaded in gmail and outlook different, because the all attachment from gmail it has Content ID, so we need to check attachment from inline html first before handle attachments are uploaded. Attachment from outlook easier to handle because the attachment in inline html has Content ID while uploaded attachment doesn't have
      */
    const attachmentsContentIds = {};
    // This variabel for collect attachment url's on inline html by ContentID
    let contentIds = {};
    // Save attachment to blob if there's any
    if (email.Attachments?.length > 0) {
      for (let attachment of email.Attachments) {
        const newAttachment: IAttachmentFiles = {
          filename: !!!isEmailFromGmail ? attachment.Name : attachment.Name.replace(/ /g, ""),
          type: attachment.ContentType,
          // data: Buffer.from(attachment.Content, "base64")
          data: Buffer.from(attachment.Content, "base64")
        }

        const newAttachmentData: IAttachment = await uploadAttachment(newAttachment, sender.Name || sender.Email);

        console.log(newAttachmentData);

        if (!!!isEmailFromGmail) {
          /**
           * We need to collect url's with contentId as key & value pair, so we can use the src in inline html,
           * so we don't put the inline attachment on attachment list in ticket
           */
          if (attachment?.ContentID) contentIds[attachment.ContentID] = newAttachmentData.src;
          else ticketToPush.attachments.push(newAttachmentData);
        } else {
          /**
           * The inline/file attachments in email from gmail the both is has content id,
           * so we need to handle it below
           */
          contentIds[attachment.ContentID] = newAttachmentData.src;
          attachmentsContentIds[attachment.ContentID] = newAttachmentData;
        }
      }
    }
    console.log(contentIds);
    console.log(attachmentsContentIds);
    /**
     * This part replace value of src with url that we have collected before
     */
    if (Object.keys(contentIds).length > 0) {

      /**
       * htmlString is content of description
       * collectionContentIds are content id is used in html string
       */
      const { htmlString, collectionContentIds } = replaceImageSrc(ticketToPush.description, contentIds);

      ticketToPush.description = htmlString;

      console.log(isEmailFromGmail);
      console.log(collectionContentIds);

      if (isEmailFromGmail && (collectionContentIds?.length > 0)) {

        /**
         * For email from gmail
         * 
         * We need to remove attachments that has been in htmlString, the rest attachments are uploaded, so the attachments are uploaded need to push into ticket attachments 
         */
        collectionContentIds?.forEach((id) => {
          if (attachmentsContentIds[id]) {
            delete attachmentsContentIds[id];
          }
        });
        console.log(attachmentsContentIds);
        const attachments: IAttachment[] = Object.values(attachmentsContentIds);
        console.log(attachments);
        ticketToPush.attachments = attachments;
      }

    }

    console.log(ticketToPush);
  }
  useEffect(() => {
    loadData();
  }, []);
  return (<></>)
}
export default ParseMail;
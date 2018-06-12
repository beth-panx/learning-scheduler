/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// The contents of the outbound email message that will be sent to the user
const emailContent = `<html><head> <meta http-equiv='Content-Type' content='text/html; charset=us-ascii'> <title></title>
  <script type="application/adaptivecard+json">{"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","type":"AdaptiveCard","version":"1.0","body":[{"type":"ColumnSet","columns":[{"width":"auto","items":[{"type":"Image","width":"200px","url":"https://api.prod.mlxma.microsoft.com/content/artificial-intelligence-v1/course_thumb_dat263x.jpg"}]},{"width":"stretch","spacing":"padding","items":[{"type":"Container","height":"stretch","items":[{"type":"TextBlock","size":"large","text":"**Introduction to AI**"},{"type":"TextBlock","spacing":"none","text":"Provider: [Microsoft](xupa@microsoft.com)"},{"type":"TextBlock","spacing":"default","color":"attention","text":"Some text that asks the relevency... I am bad at English."}]},{"type":"ActionSet","actions":[{"type":"Action.OpenUrl","title":"Cool, I like it!","url":"/something"},{"type":"Action.OpenUrl","title":"Schedule time now","url":"/somethingelse"},{"type":"Action.OpenUrl","title":"Nope...","url":"http://hyperfish.com"}]}]}]}]}</script> </head>
  <body style='font-family:calibri'>   </body> </html>`;

/**
 * Returns the outbound email message content with the supplied name populated in the text.
 * @param {string} name The proper noun to use when addressing the email.
 * @param {string} sharingLink The sharing link to the file to embed in the email.
 * @return {string} the formatted email body
 */
function getEmailContent(name, sharingLink) {
  let bodyContent = emailContent.replace('{{name}}', name);
  bodyContent = bodyContent.replace('{{sharingLink}}', sharingLink);
  return bodyContent;
}

/**
 * Wraps the email's message content in the expected [soon-to-deserialized JSON] format.
 * @param {string} content The message body of the email message.
 * @param {string} recipient The email address to whom this message will be sent.
 * @return the message object to send over the wire
 */
function wrapEmail(content, recipient, file) {
  const attachments = [{
    '@odata.type': '#microsoft.graph.fileAttachment',
    ContentBytes: file.toString('base64'),
    Name: 'mypic.jpg'
  }];
  const emailAsPayload = {
    Message: {
      Subject: 'Learning Scheduler',
      Body: {
        ContentType: 'HTML',
        Content: content
      },
      ToRecipients: [
        {
          EmailAddress: {
            Address: recipient
          }
        }
      ],
      Attachments: attachments
    },
    SaveToSentItems: true,
  };
  return emailAsPayload;
}

/**
 * Delegating method to wrap the formatted email message into a POST-able object
 * @param {string} name the name used to address the recipient
 * @param {string} recipient the email address to which the connect email will be sent
 */
function generateMailBody(name, recipient, sharingLink, file) {
  return wrapEmail(getEmailContent(name, sharingLink), recipient, file);
}

exports.generateMailBody = generateMailBody;

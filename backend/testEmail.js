import SibApiV3Sdk from 'sib-api-v3-sdk';

// Instantiate the client
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = ''; // Replace with your Brevo API key

// Create an instance of the TransactionalEmailsApi
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Define the email details
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
sendSmtpEmail.sender = { name: 'Test Sender', email: 'myfromemail@mycompany.com' }; // Sender details
sendSmtpEmail.to = [{ email: 'receiver@example.com', name: 'Receiver Name' }]; // Recipient details
sendSmtpEmail.subject = 'Test Email from Brevo API'; // Subject line
sendSmtpEmail.htmlContent = `
  <h1>Hello 👋</h1>
  <p>This is a <strong>test email</strong> sent via the <code>Brevo API</code>.</p>
`; // HTML content

// Send the email
apiInstance.sendTransacEmail(sendSmtpEmail).then(
  function (data) {
    console.log('✅ Email sent successfully. Returned data:', data);
  },
  function (error) {
    console.error('❌ Error sending email:', error);
  }
);
 




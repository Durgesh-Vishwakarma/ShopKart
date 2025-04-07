import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure Brevo API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY; // Set your Brevo API key from .env

// Export transactional email instance
const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
export default transactionalEmailApi;




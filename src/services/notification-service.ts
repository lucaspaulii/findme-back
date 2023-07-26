import { SMSError } from "@/errors/sms-error";
import * as zenvia from '@zenvia/sdk';
import twilio from "twilio";

async function sendSMSviaZenvia(phone: string, url: string) {
  const client = new zenvia.Client(process.env.ZENVIA_API_TOKEN);
  const sms = client.getChannel('sms');
  const content = new zenvia.TextContent(
    ("Confirme sua localização através do link: " + url)
  );

  try {
    await sms.sendMessage(
      process.env.ZENVIA_FROM,
      phone.replace("+", ""),
      content
    );
  } catch (error) {
    console.log(error);
    throw SMSError();
  }
}

async function sendSMSviaTwilio(phone: string, url: string, lang: string) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  const body =
    lang == "es"
      ? `Por favor confirma tu ubicación a través de este enlace: ${url}`
      : `Please confirm your location through this link: ${url}`;

  try {
    const sms = await client.messages.create({
      body,
      from: process.env.TWILIO_FROM,
      to: phone,
    });
  } catch (error) {
    throw SMSError();
  }
}

const notificationService = {
  sendSMSviaTwilio,
  sendSMSviaZenvia,
};

export default notificationService;

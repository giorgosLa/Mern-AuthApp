import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailsTamplate.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your Email!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log(response);
    console.log("Email sent Successfully");
  } catch (err) {
    console.error("email", err);
    throw new Error("Email: ", err);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "ecf9db2e-e47f-4d64-b307-89c2ed921a6d",
      template_variables: { company_info_name: "Auth App", name: name },
    });

    console.log("Welcome Email sent succesfully", response);
  } catch (err) {
    console.error("email:", err);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your Password!",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Reset Password",
    });
  } catch (err) {
    console.error("Error sending password reset email", err);
    throw new Error(`Error sending password reset email: ${err}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset was Successful!",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password Success",
    });
  } catch (err) {
    console.error("Error success password reset email", err);
    throw new Error(`Error success password reset email: ${err}`);
  }
};

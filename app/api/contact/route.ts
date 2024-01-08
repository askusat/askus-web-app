import { NextRequest, NextResponse } from "next/server";
import NodeMailer from "nodemailer";

export async function GET() {
  return NextResponse.json({ name: "Paul Innocent" });
}

console.log("process.env.SMTP_LOGIN");
console.log(process.env.STRIPE_SECRET_KEY);
console.log(process.env.SMTP_LOGIN);
console.log(process.env.SMTP_KEY);

const transporter = NodeMailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  debug: true,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_KEY,
    // user: "askusat1@gmail.com",
    // pass: "xsmtpsib-2feda7f3b8b25d08eac0e06e2c6b31aa48bc4acac5e44e023e921a29d60d3397-8b9cS70ZEYCHFhG2",
  },
});

// const send_email = async (from, to, subject, content) => {
//     var res;
//     while (!res) {

//     }
//     await transporter.sendMail(
//         { from: from, to, subject, html: content, sender: { name: "Aralingual", email: "contact@aralingual.com" }, },
//         (error, info) => {
//             if (error) {
//                 console.log(error);
//                 res = { success: false, message: error }
//             } else {
//                 // console.log("email sent to: " + info.accepted[0]);
//                 res ={ success: true, message: info.response }
//             }
//         }
//     )
//     return res
// }

const send_email = async (
  from: string,
  to: string,
  subject: string,
  content: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html: content,
        // sender: { name: 'Aralingual', email: 'contact@aralingual.com' },
      });

      // If sending email is successful, resolve the promise with success message
      resolve({ success: true, message: info.response });
    } catch (error: any) {
      // If there's an error sending the email, reject the promise with the error
      reject({ success: false, message: error.message });
    }
  });
};

export async function POST(request: NextRequest) {
  const { from, subject, content } = await request.json();
  // const to = "contact@askusat.co.uk";
  const to = "paulinnocent05@gmail.com";
  // console.log({ from, subject, content, to });

  try {
    const re: any = await send_email(from, to, subject, content).catch(
      (err) => {
        if (!err.success) {
          console.log(err);

          return NextResponse.json(
            { status: "error", message: err },
            { status: 500 }
          );
        }
      }
    );

    if (!re.success) {
      return NextResponse.json(
        { status: "error", message: re.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ status: "success" }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

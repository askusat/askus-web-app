import { NextRequest, NextResponse } from "next/server";
// import NodeMailer from "nodemailer";

export async function GET() {
  return NextResponse.json({ name: "Paul Innocent" });
}

// const transporter = NodeMailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   debug: true,
//   auth: {
//     user: process.env.SMTP_LOGIN,
//     pass: process.env.SMTP_KEY,
//   },
// });

// // const send_email = async (from, to, subject, content) => {
// //     var res;
// //     while (!res) {

// //     }
// //     await transporter.sendMail(
// //         { from: from, to, subject, html: content, sender: { name: "Aralingual", email: "contact@aralingual.com" }, },
// //         (error, info) => {
// //             if (error) {
// //                 console.log(error);
// //                 res = { success: false, message: error }
// //             } else {
// //                 // console.log("email sent to: " + info.accepted[0]);
// //                 res ={ success: true, message: info.response }
// //             }
// //         }
// //     )
// //     return res
// // }

// const send_email = async (
//   from: string,
//   to: string,
//   subject: string,
//   content: string
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const info = await transporter.sendMail({
//         from: from,
//         to: to,
//         subject: subject,
//         html: content,
//         // sender: { name: 'Aralingual', email: 'contact@aralingual.com' },
//       });

//       // If sending email is successful, resolve the promise with success message
//       resolve({ success: true, message: info.response });
//     } catch (error: any) {
//       // If there's an error sending the email, reject the promise with the error
//       reject({ success: false, message: error.message });
//     }
//   });
// };

// export async function POST(request: NextRequest) {
//   const { from, to, subject, content } = await request.json();
//   try {
//     const re: any = await send_email(from, to, subject, content).catch(
//       (err) => {
//         if (!err.success) {
//           return { status: "error", message: err.message };
//         }
//       }
//     );
//     if (!re.success) {
//       return NextResponse.json(
//         { status: "error", message: re.message },
//         { status: 500 }
//       );
//     } else {
//       return NextResponse.json({ status: "success" });
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       { status: "error", message: error.message },
//       { status: 500 }
//     );
//   }
// }

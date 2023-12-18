import { SignUpParam } from "@/app/context/AuthProvider";
import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { Button, Image} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

export const SignupStepOne = ({
  fullName,
  setFullName,
  username,
  setUsername,
  setEmail,
  email,
  password,
  setPassword,
}: any) => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    message: '',
  });
  const [processingSignUp, setProcessingSignUp] = useState<boolean>(false);

  const handleSignUpStep1 = async () => {
    // check if user already has an account with same email
    const { error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);
    // if yes, take them to login
    if (error) {
      //   navigate("/login");
    } else {
      // sign up then continue to payment
      if (processingSignUp) return;
      auth.signup({ email, password, fullName, username } as SignUpParam, (error) => {
        // console.log('signupError', error);
        setErrorMsg({
          title: "Failed to register",
          message: error.message,
        });
      }, setProcessingSignUp);
    }
  };

  return (
    <div className="">
      <Link href="/">
        <Image src="/logo-2.svg" alt="logo" width={200} height={40} />
      </Link>

      <h5 className="font-bold font-PlusJakartaSansBold text-black/80 text-[18px] md:text-[25px] mt-4 mb-1 -ml-2">
        ⚡ Setup & Start 3-Day Free Trial
      </h5>

      <p className="mb-4 text-[17px]">
        Try 3 days for just £5. Then £50/month. Cancel anytime. Start getting
        answers to your questions.
      </p>

      {errorMsg?.message && (
        <div className="bg-red-300 py-3 px-4 rounded-lg mb-3 text-gray-900">
          <div className="font-bold">{errorMsg.title}</div>
          <div className="">{errorMsg.message}</div>
        </div>
      )}

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email || !password) return;
          if (password.length < 6) {
            setErrorMsg({
              title: "Alert",
              message: "Password must be at least 6 characters long.",
            });
            return;
          }
          email && password && handleSignUpStep1();
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="flex flex-col w-full">
          <label
            htmlFor="full_name"
            className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
          >
            Full Name (First name first)
          </label>
          <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)] w-full">
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="w-full py-3 outline-none border-none"
              placeholder="Enter your full name"
              required
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="full_name"
            className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
          >
            username
          </label>
          <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)] w-full">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full py-3 outline-none border-none"
              placeholder="Choose a username"
              required
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
          >
            Email Address
          </label>
          <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-3 outline-none border-none"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
          >
            Password
          </label>
          <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="password"
              className="w-full py-3 outline-none border-none"
              placeholder="Enter your password"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <div className="flex items-center justify-center h-[50px]">
              {showPassword && (
                <FaEyeSlash
                  color="#8094AE"
                  className={`${
                    showPassword
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none max-w-0 min-w-0 w-0 h-0"
                  } transition-all duration-300 min-w-[20px] h-auto cursor-pointer`}
                  width={25}
                  height={25}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
              {!showPassword && (
                <FaEye
                  color="#8094AE"
                  className={`${
                    !showPassword
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none max-w-0 min-w-0 w-0 h-0"
                  } transition-all duration-300 min-w-[20px] h-auto cursor-pointer`}
                  width={25}
                  height={25}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          onClick={() => {}}
          className={`bg-primary w-full flex items-center gap-3 justify-center text-white`}
          isLoading={processingSignUp}
        >
          {processingSignUp ? `processing...` : `Continue`}
          <FaArrowRight />
        </Button>
        <p className="text-center text-[#8091A7] italic text-xs">
          I agree to Askusat’s{" "}
          <Link
            href="/terms-of-service"
            target="_blank"
            className="text-primary"
          >
            Terms of Service
          </Link>
        </p>
      </form>

      <div className=" min-w-[70%] my-4 border"></div>

      <div className="text-center">
        <p className="text-center text-[#8091A7] italic text-xs">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// export const StepTwo = ({ handleSetStep, step, userResults }: any) => {
//   const navigate = useNavigate();
//   const [processingPayment, setProcessingPayment] = useState(false);
//   // const [billingAddress, setBillingAddress] = useState(null);
//   const [user, setUser] = useState(null);
//   const [errorMsg, setErrorMsg] = useState({
//     title: "Alert",
//     message: "something went wrong",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const addCard = false;
//   // const [ready, setReady] = useState(true);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [confirmingSetUpIntent, setConfirmingSetUpIntent] = useState(true);
//   const [clientSecret, setClientSecret] = useState(null);
//   const [addressElementState, setAddressElementState] = useState(null);
//   const [paymentElementState, setPaymentElementState] = useState(null);

//   useEffect(() => {
//     const addressEl = document.querySelector("#address-element");
//     if (!elements || !addressEl || addressElementState || paymentElementState)
//       return;
//     const options = { mode: "billing" };
//     const paymentElementOptions = {
//       layout: "tabs",
//       // layout: 'accordion',
//     };
//     // const addressElement = elements.create("address", options);
//     // console.log();
//     // addressElement.
//     const paymentElement = elements.create("payment", paymentElementOptions);
//     // setAddressElementState(addressElement);
//     setPaymentElementState(paymentElement);
//     // addressElement.mount("#address-element");
//     paymentElement.mount("#payment-element");
//   }, [addressElementState, elements, clientSecret, paymentElementState]);

//   // useEffect(() => {
//   //   if (!paymentElementState) return;
//   //   paymentElementState.on("change", (e) => {
//   //     // console.log(e);
//   //     if (e.value.type !== "card") {
//   //       document.getElementById("address-element").style.display = "none"
//   //       addressElementState.unmount();
//   //       addressElementState.destroy()
//   //       // addressElementState
//   //     } else {
//   //       // window.location.reload();
//   //       addressElementState.mount("#address-element");
//   //     }
//   //   });
//   // }, [addressElementState, paymentElementState]);

//   // get current user

//   useEffect(() => {
//     if (step !== 2) return;

//     const getData = async () => {
//       const {
//         data: { user: authUser },
//         error,
//       } = await supabase.auth.getUser();
//       if (error) {
//         // window.location.reload();
//         // window.location.hash = '';
//         // handleSetStep(1);
//         alert("You have to login first");
//         navigate("/login");
//       }

//       const { data } = await supabase
//         .from("users")
//         .select()
//         .eq("userId", authUser?.id);
//       setUser(data?.[0]);
//       if (data?.length > 1) {
//         console.log("you have more than one account");
//       }
//     };
//     getData();
//   }, [navigate, step]);

//   // confirm setup_intent_client_secret;
//   useEffect(() => {
//     const fetch = async () => {
//       if (!stripe) {
//         return;
//       }

//       const clientSecret = new URLSearchParams(window.location.search).get(
//         "setup_intent_client_secret"
//       );

//       if (!clientSecret) {
//         return setConfirmingSetUpIntent(false);
//       }

//       console.log("setup_intent_client_secret suc!");
//       const paymentIntent = await stripe.retrieveSetupIntent(clientSecret);
//       // .then(({ paymentIntent }) => {
//       // console.log(paymentIntent?.setupIntent?.status);
//       switch (paymentIntent?.setupIntent?.status) {
//         case "succeeded":
//           console.log("Payment succeeded!");
//           // let contCreateSubscription = await axios
//           //   .post(`${BACKEND_URL}/api/stripe/cont_create_subscription`, {
//           //     customer_id: user?.chargebee_customer_id,
//           //     payment_method: paymentIntent?.setupIntent?.payment_method,
//           //   })
//           //   .catch((err) => {
//           //     console.error(err);
//           //     return err;
//           //   });
//           // if (contCreateSubscription?.status === 200) {
//           const payment_method = paymentIntent.setupIntent.payment_method;
//           console.log("payment_method");
//           console.log(payment_method);

//           var profile_pic_url = "";
//           try {
//             // create customer and subscription
//             let createSubscription = await axios.post(
//               `${BACKEND_URL}/api/stripe/create_subscription`,
//               {
//                 name: user?.full_name, // 'nameOnCard',
//                 email: user?.email,
//                 price: STRIPE_PRICE_ID, // 'selectedPlan.planId',
//                 customer_id: user?.chargebee_customer_id,
//                 payment_method, //attach_payment_method_to_customer
//                 billing_details: user?.billing_details,
//               }
//             );
//             // .catch((err) => {
//             //   console.error(err);
//             //   return err;
//             // });

//             const d = {
//               chargebee_subscription: createSubscription?.data?.subscription,
//               chargebee_customer: createSubscription?.data?.customer,
//               chargebee_subscription_id:
//                 createSubscription?.data?.subscription?.id,
//               chargebee_customer_id: createSubscription?.data?.customer?.id,
//               clientIntentSecret: clientSecret,
//             };
//             if (!createSubscription?.data?.customer?.id) {
//               delete d.chargebee_customer;
//               delete d.chargebee_customer_id;
//             }
//             await supabase.from("users").update(d).eq("userId", user?.userId);
//             // .match({ userId: user?.userId });
//             // // attach payment_method to customer
//             // let attach_payment_method_to_customer = await axios
//             //   .post(
//             //     `${BACKEND_URL}/api/stripe/attach_payment_method_to_customer`,
//             //     {
//             //       customer_id: user?.chargebee_customer_id,
//             //       payment_method: paymentIntent?.setupIntent?.payment_method,
//             //     }
//             //   )
//             //   .catch((err) => {
//             //     console.error(err);
//             //     return err;
//             //   });

//             // // console.log('attach_payment_method_to_customer: ');
//             // // console.log(attach_payment_method_to_customer);

//             const uploadImageFromURLRes = await uploadImageFromURL(
//               user?.username
//             );

//             if (uploadImageFromURLRes?.status === "success") {
//               profile_pic_url = uploadImageFromURLRes?.data ?? "";
//             }
//           } catch (error) {
//             alert(error?.message);
//             return setConfirmingSetUpIntent(false);
//           }
//           const d = {
//             subscribed: true,
//             clientIntentSecret: "",
//             profile_pic_url,
//           };
//           await supabase.from("users").update(d).eq("userId", user?.userId);

//           try {
//             process.env.NODE_ENV === "production" &&
//               (await slackSubNotify(user?.username || user?.email));

//             let sendEmail = await axios
//               .post(`${BACKEND_URL}/api/send_email`, {
//                 email: user?.email,
//                 subject: "Your account is not connected",
//                 htmlContent: NOT_CONNECTED_TEMPLATE(
//                   user?.full_name || user?.username
//                 ),
//               })
//               .catch((err) => err);
//             if (sendEmail.status !== 200) {
//               console.log(sendEmail);
//             }
//           } catch (error) {
//             console.log(error);
//           }
//           const progressbarEl = document.querySelector("#progressbar");
//           if (progressbarEl) {
//             progressbarEl.style.width = "100%";
//           }
//           const { key, ref } = getRefCode();
//           if (ref) {
//             navigate(`/thankyou?${key}=${ref}`);
//           } else {
//             navigate(`/thankyou`);
//           }

//           // } else {
//           //   console.log('contCreateSubscription: ');
//           //   console.log(contCreateSubscription);
//           //   console.log(contCreateSubscription?.response?.data?.message);
//           //   setConfirmingSetUpIntent(false);
//           // }
//           setConfirmingSetUpIntent(false);
//           break;
//         case "processing":
//           console.log("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           console.log("Your payment was not successful, please try again.");
//           break;
//         default:
//           console.log("Something went wrong.");
//           break;
//       }
//       // });
//     };
//     if (!user) return;
//     fetch();
//   }, [navigate, stripe, user]);

//   useEffect(() => {
//     const fetch = async () => {
//       if (!user) return;
//       const setup_intent_client_secret = new URLSearchParams(
//         window.location.search
//       ).get("setup_intent_client_secret");
//       if (setup_intent_client_secret) return;

//       let createIntentRes = await axios
//         .post(`${BACKEND_URL}/api/stripe/create_intent`, {
//           name: user?.full_name || user?.username,
//           email: user?.email,
//         })
//         .then((response) => response.data)
//         .catch((err) => {
//           console.log(err);
//         });
//       if (createIntentRes?.clientSecret) {
//         var clientSecret = createIntentRes.clientSecret;
//         var customer = createIntentRes?.customer;
//         setClientSecret(clientSecret);
//         if (customer) {
//           const d = {
//             chargebee_customer_id: customer.id,
//           };
//           await supabase.from("users").update(d).eq("userId", user?.userId);
//         }
//       }
//     };
//     const confirm__SetUp = new URLSearchParams(window.location.search).get(
//       "setup_intent_client_secret"
//     );
//     if (confirm__SetUp) return;
//     fetch();
//   }, [user]);

//   const handleSubmit = async () => {
//     if (!stripe || !elements) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       console.log("submitError:", submitError);
//       alert(submitError.type + ": " + submitError.message);
//       return;
//     }
//     // elements.getElement(PaymentElement).update({
//     //   defaultValues: billingAddress,
//     // });

//     const addressElement = elements.getElement("address");
//     var value = null;
//     if (addressElement) {
//       var aeobj = await addressElement.getValue();
//       value = aeobj.value;
//     }
//     await supabase
//       .from("users")
//       .update({
//         billing_details: value,
//         full_name: value?.name || user?.username,
//       })
//       .eq("userId", user?.userId);

//     setProcessingPayment(true);

//     const { error } = await stripe.confirmSetup({
//       elements,
//       clientSecret,
//       confirmParams: {
//         // return_url: 'https://app.sproutysocial.com/signup-new#payment',
//         return_url:
//           process.env.NODE_ENV === "production"
//             ? "https://app.sproutysocial.com/signup#payment"
//             : "http://localhost:3000/signup#payment",
//       },
//     });

//     if (error) {
//       setIsModalOpen(true);
//       setErrorMsg({
//         title: "Failed",
//         message: error?.type + ": " + error?.message,
//       });
//     }

//     setProcessingPayment(false);
//   };

//   // const paymentElementOptions = {
//   //   layout: "tabs",
//   //   // layout: 'accordion',
//   // };

//   if (confirmingSetUpIntent) {
//     return (
//       <div className="">
//         <div className="skeleton-container">
//           <div className="skeleton-item"></div>
//           <div className="skeleton-item"></div>
//           <div className="skeleton-item"></div>
//         </div>
//         <p className="text-center text-lg mt-3 animate-pulse">
//           Please be patient while we processes your subscription...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <AlertModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//         }}
//         title={errorMsg?.title}
//         message={errorMsg?.message}
//       />
//       {processingPayment && (
//         <div className="fixed z-[99] top-0 left-0 w-full h-screen grid place-items-center bg-white/70">
//           <div className="animate-pulse duration-200">
//             <img
//               src="/logo-2.svg"
//               alt="logo"
//               width={200}
//               height={40}
//             />
//             <div className="text-center">Processing...</div>
//           </div>
//         </div>
//       )}

//       {/* {!ready && (
//           <div className="skeleton-container">
//             <div className="skeleton-item"></div>
//             <div className="skeleton-item"></div>
//             <div className="skeleton-item"></div>
//           </div>
//         )} */}

//       <form
//         className="flex flex-col gap-4 w-full max-w-[600px] mx-auto"
//         id="cardForm"
//         onSubmit={async (e) => {
//           e.preventDefault();
//           if (processingPayment) {
//             // alert('Please wait');
//             setIsModalOpen(true);
//             setErrorMsg({
//               title: "processing...",
//               message: "Please wait",
//             });
//             return;
//           }
//           await handleSubmit();
//         }}
//       >
//         {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
//         {/* <AddressElement
//             options={{
//               mode: "billing",
//             }}
//             onChange={(e) => {
//               setBillingAddress(e.value);
//             }}
//           /> */}
//         <div id="payment-element"></div>
//         <div id="address-element"></div>
//         <div>
//           <Button
//             className={`${
//               processingPayment ? "cursor-wait" : "cursor-pointer"
//             } bg-primary text-white font-MontserratSemiBold text-[.8rem] xl:text-[1.125rem] ${
//               addCard ? "mt-[65px]" : "mt-5"
//             } w-full py-4 rounded-[10px] font-[600] mb-4`}
//             type="submit"
//           >
//             <span>
//               {" "}
//               {processingPayment
//                 ? `Processing...`
//                 : `${addCard ? "Add Payment Method" : "Continue"}`}{" "}
//             </span>
//           </Button>
//           {processingPayment && (
//             <div className="flex items-center justify-center gap-2 py-3">
//               <AiOutlineLoading3Quarters className="animate-spin" />
//               <p className="font-[500] text-xs md:text-sm font-MontserratSemiBold text-[#757575] animate-pulse">
//                 "We're processing your request, please wait..."
//               </p>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

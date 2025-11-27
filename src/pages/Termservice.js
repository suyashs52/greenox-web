import React from "react";

const Termservice = () => {
  return (
    <>
      <section
        className="relative flex min-h-[300px] items-center justify-center px-6 py-16 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(6,95,70,0.60), rgba(16,185,129,0.60)), url('/img/Termservices.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="banner"
      >
        <div className="max-w-7xl">
          <h1 className="pt-20 text-3xl font-extrabold leading-[70px] leading-tight sm:text-4xl md:text-5xl">
            Clear, Transparent & Fair Policies:
            <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text leading-[70px] text-transparent">
              Greenox Terms of Service
            </span>
          </h1>

          <div className="mx-auto mt-6 max-w-5xl text-base text-white/90 sm:text-lg">
            <p>
              Welcome to Greenox Pvt Ltd. These Terms & Conditions outline the
              rules, responsibilities, and standards that govern your use of our
              platform. By accessing or using our services, you agree to follow
              these terms, which are designed to ensure a safe, reliable, and
              seamless experience for every customer and partner across our
              ecosystem.
            </p>
          </div>
        </div>
      </section>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl bg-white p-8">
          <div className="prose prose-sm prose-slate max-w-none text-slate-900">
            <div className="mb-2 font-semibold">
              <strong>Cancellation and Refund Policy</strong>
            </div>

            <ol className="ml-6 list-decimal space-y-4">
              <li>
                <strong>
                  No replacement or refund without partner approval:
                </strong>
                No replacement, refund, or any other form of resolution shall be
                provided without the explicit authorization of the respective
                Restaurant Partner or Merchant Partner.
              </li>

              <li>
                <strong>No refund for Platform Service Charges:</strong>
                Notwithstanding anything stated in these Terms, refunds for
                charges related to Greenox Platform Services shall not be issued
                unless the order cancellation qualifies under the exceptional
                scenarios outlined in clause (m)(ii) below.
              </li>

              <li>
                <strong>Proof required for complaints:</strong>
                Any complaint regarding the order—including but not limited to
                food spillage, wrong order delivery, foreign objects, poor
                quality, or incorrect items—must be supported with valid proof
                (photo/video) before Greenox or the Restaurant Partner can
                initiate any resolution.
              </li>

              <li>
                <strong>Instructions not guaranteed:</strong>
                You shall not be eligible for a refund in cases where special
                instructions (e.g., “less spicy”, “no onion”, “extra napkins”)
                are not followed exactly as intended. Restaurant Partners follow
                instructions on a best-effort basis only.
              </li>

              <li>
                <strong>Refund processing:</strong>
                All approved refunds will be processed through the original
                payment method, unless refunded through Greenox credits. The
                time taken for the refund to reflect in your account depends on
                the respective bank or payment provider.
              </li>
            </ol>

            <br />

            <p className="mb-2">
              <strong>Liquidated Damages</strong>
            </p>

            <p className="mb-2">
              You acknowledge that (1) your cancellation, attempted
              cancellation, or purported cancellation of an order, or (2)
              cancellation due to reasons not attributable to Greenox—such as
              incorrect delivery details, wrong contact number,
              unresponsiveness, or being unavailable at the time of
              delivery—shall constitute a breach of the irrevocable
              authorization granted by you to Greenox to place orders with
              Restaurant Partners on your behalf (“Authorization Breach”).
            </p>

            <p className="mb-2">
              In the event of such an Authorization Breach, you agree to pay
              liquidated damages equivalent to each component of the order value
              attributable to the Restaurant Partner, Delivery Partner, and any
              other involved parties (except Greenox). You hereby authorize
              Greenox to recover such liquidated damages through methods
              determined at Greenox’s discretion, including but not limited to
              deduction from payments made toward your next order.
            </p>

            <p className="mb-2">
              However, there may be situations where Greenox is unable to accept
              or must cancel your order due to factors including but not limited
              to technical issues, item unavailability, operational challenges,
              or other reasons attributable to Greenox, the Restaurant Partner,
              or the Delivery Partner. In such cases, no liquidated damages
              shall be charged.
            </p>

            <p className="mb-2">
              If the order is cancelled after payment has been collected and you
              are deemed eligible for a refund for the order amount or a portion
              of it, such amount shall be reversed to you in accordance with the
              refund timelines governed by your respective bank or payment
              provider.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Termservice;

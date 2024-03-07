import React from "react";
import Accordian from "./Accordian";

export default function FAQ() {
  const questions = [
    {
      id: 1,
      questions: "How do I place an order?",
      answer:
        "To place an order, simply browse through our website, select the cake you'd like, choose the size, flavor, and any additional customizations, then proceed to checkout.",
    },
    {
      id: 2,
      questions: "What payment methods do you accept?",
      answer:
        " We accept various payment methods including credit/debit cards, UPI, and other secure online payment option.",
    },
    {
      id: 3,
      questions: "Do you offer same-day delivery?",
      answer:
        "Yes, we offer same-day delivery for orders placed before 11:00 P.M. Please check our delivery information for more details.",
    },
    {
      id: 4,
      questions: "Can I schedule a specific delivery time?",
      answer:
        "Yes, you can message a preferred delivery time on our WhatsApp no. attached order ID. We'll do our best to accommodate your request, although exact delivery times cannot always be guaranteed.",
    },
    {
      id: 5,
      questions: "Do you deliver to my area?",
      answer:
        "We strive to reach as many areas as possible. You can enter your delivery address during checkout to see if we deliver to your location",
    },
    {
      id: 6,
      questions: "Is there a delivery fee?",
      answer: "No, There is no delivery fees. We offer free delivery",
    },
    {
      id: 7,
      questions: "What if no one is home to receive the delivery?",
      answer:
        "If no one is available to receive the delivery, we'll attempt to leave it in a safe place or with a neighbor, depending on the delivery instructions provided. Alternatively, we'll arrange for redelivery at a convenient time.",
    },
    {
      id: 8,
      questions: "Can I cancel or modify my order?",
      answer:
        "Orders can typically be canceled or modified up to a certain point before the scheduled delivery time. Please contact our customer service team for assistance with cancellations or modifications.",
    },
    {
      id: 9,
      questions: "What if there's an issue with my order?",
      answer:
        "If you encounter any issues with your order, such as damaged or incorrect items, please contact us immediately, and we'll do our best to resolve the problem.",
    },
    {
      id: 10,
      questions: "Do you offer corporate or bulk orders?",
      answer:
        "Yes, we cater to corporate and bulk orders. Contact our corporate sales team for personalized assistance and special pricing options.",
    },
    {
      id: 11,
      questions: "How do I track my order?",
      answer:
        " Once you place the order, you can track the status of your delivery in My-Order page in real-time.",
    },
    {
      id: 12,
      questions: "Can I include a personalized message with my order?",
      answer:
        " Yes, you can include a personalized message with your order.Simply send your message along with Order ID on our WhatsApp Number we'll include it with the delivery.",
    },
    {
      id: 13,
      questions: "Do you offer refunds or exchanges?",
      answer:
        "Refunds or exchanges may be provided in certain circumstances, such as for damaged or defective items. Please refer to our refund policy for more information or contact our customer service team for assistance.",
    },
  ];
  return (
    <>
      <h2 className="text-center font-black text-2xl">
        Frequently Asked <p>Questions</p>
      </h2>
      <div className="pt-2 pl-6 pr-6">
        <Accordian
          title={questions[0].questions}
          answer={questions[0].answer}
        />
        <Accordian
          title={questions[1].questions}
          answer={questions[1].answer}
        />
        <Accordian
          title={questions[2].questions}
          answer={questions[2].answer}
        />
        <Accordian
          title={questions[3].questions}
          answer={questions[3].answer}
        />
        <Accordian
          title={questions[4].questions}
          answer={questions[4].answer}
        />
        <Accordian
          title={questions[5].questions}
          answer={questions[5].answer}
        />{" "}
        <Accordian
          title={questions[6].questions}
          answer={questions[6].answer}
        />{" "}
        <Accordian
          title={questions[7].questions}
          answer={questions[7].answer}
        />{" "}
        <Accordian
          title={questions[8].questions}
          answer={questions[8].answer}
        />{" "}
        <Accordian
          title={questions[9].questions}
          answer={questions[9].answer}
        />{" "}
        <Accordian
          title={questions[10].questions}
          answer={questions[10].answer}
        />{" "}
        <Accordian
          title={questions[11].questions}
          answer={questions[11].answer}
        />{" "}
        <Accordian
          title={questions[12].questions}
          answer={questions[12].answer}
        />
      </div>
    </>
  );
}

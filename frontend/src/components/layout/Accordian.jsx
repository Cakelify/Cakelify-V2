import React, { useState } from "react";

export default function Accordian({ title, answer }) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        {accordionOpen ? (
          <span className="font-semibold text-xl text-red-600 font-extrabold">
            {title}
          </span>
        ) : (
          <span className="font-semibold text">{title}</span>
        )}

        {accordionOpen ? (
          <span className="h-0.5 w-0.5 text-2xl pl-3">-</span>
        ) : (
          <span className="h-0.5 w-0.5 text-2xl pl-2 ">+</span>
        )}
      </button>
      <div
        className={`grid overflow-hidden transitio duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100 "
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden pt-2 pb-1 text-lg text-center">
          {answer}
        </div>
      </div>
      <hr />
    </div>
  );
}

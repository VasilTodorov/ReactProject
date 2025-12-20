import { useState } from "react";

export default function FAQItem({
    question,
    answer
}) {
    const [isOpen, setIsOpen] = useState(false);
    const onClickHandler = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <div className="mb-4 rounded-lg border bg-white">
          <button
            onClick={onClickHandler}
            className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
          >
            <span className="text-lg font-semibold">
              {question}
            </span>
            <span>{isOpen ? "−" : "+"}</span>
          </button>

          {isOpen && (
            <div className="px-6 pb-4 transition-all duration-200">
              <p className="text-gray-600">
                {answer}
              </p>
            </div>
          )}
        </div>
    );
}
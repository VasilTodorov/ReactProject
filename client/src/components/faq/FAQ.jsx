import FAQItem from "./FAQItem";

export default function FAQ() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="mt-24 mx-auto w-full max-w-2xl px-2">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h1>
        {/* FAQ Item 1 */}
        <FAQItem 
            question={"What is SkillSwap?"} 
            answer={"SkillSwap is a community-driven platform where users can share their skills and learn from others."}
        />
               

        {/* FAQ Item 2 */}
        <FAQItem 
            question={"Do I need an account to view skills?"} 
            answer={"No. You don't need to be logged in to view skill offers on the platform.But you do need to be logged in to view others profiles"}
        />        

        {/* FAQ Item 3 */}
        <FAQItem 
            question={"Can I create my own skill offer?"} 
            answer={"Yes. Sign UP users can create, edit, and delete their own skill offers."}
        />
        
      </div>
    </div>
  );
}

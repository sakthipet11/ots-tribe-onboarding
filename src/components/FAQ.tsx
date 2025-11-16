import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Is OTS Tribe really free?",
      answer: "Yes! OTS Tribe is completely free. There are no hidden costs, subscription fees, or charges. We believe in making music accessible to everyone.",
    },
    {
      question: "What if I miss a day of practice?",
      answer: "Life happens! While we encourage daily practice, we understand that some days are harder than others. The community is here to support you, not judge you. Just get back on track the next day.",
    },
    {
      question: "Do I need to be a professional musician to join?",
      answer: "Not at all! OTS Tribe welcomes musicians of all levels - from complete beginners to professionals. What matters is your commitment to daily practice and growth.",
    },
    {
      question: "How do I get added to the WhatsApp group?",
      answer: "After you submit your application, our crew will manually review it and add you to the WhatsApp group within 24-48 hours. We don't use automated join links to maintain the quality of our community.",
    },
    {
      question: "What's the difference between Tribe and Circle?",
      answer: "OTS Tribe is our free community focused on daily practice and skill development. OTS Circle (coming soon) is a paid tier that offers performance opportunities, professional mentorship, and monetization support.",
    },
    {
      question: "When are the monthly meetups?",
      answer: "Meetup schedules are shared in the WhatsApp group. They're typically held once a month at various locations. All members are welcome to attend!",
    },
    {
      question: "What instrument should I focus on?",
      answer: "Focus on whatever instrument you're most passionate about! We have members playing guitar, vocals, drums, keyboards, and many other instruments. Diversity makes our community stronger.",
    },
    {
      question: "Can I join if I'm not in India?",
      answer: "Currently, OTS Tribe is focused on building a strong community in India, particularly for our in-person meetups. However, we welcome applications from anywhere and will consider how to best include you in our virtual activities.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors duration-300"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a 
              href="mailto:tribe@onthestreets.in" 
              className="text-primary hover:underline font-semibold"
            >
              Reach out to us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
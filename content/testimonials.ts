// Testimonials. The section is HIDDEN when `testimonials` is empty.
// Only add quotes you have written permission to publish.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

export const testimonials: Testimonial[] = [];

// Quotes from the previous site, kept here for REVIEW ONLY. They are not rendered.
// They contain specific results (40% bookings, tripled inquiries). Confirm each
// person, quote, result and consent before moving one into `testimonials`.
export const pendingReview: Testimonial[] = [
  {
    quote:
      "CloudNest completely transformed how patients find our clinic online. Our appointment bookings increased by 40% within two months of launching. The AWS hosting means it's always fast and never goes down.",
    name: "Dr. Ramesh Iyer",
    role: "General Physician, Bangalore",
  },
  {
    quote:
      "We were skeptical at first, but the CloudNest team delivered beyond our expectations. Our restaurant's online ordering is seamless and the website loads instantly even during busy weekend rushes.",
    name: "Priya Sharma",
    role: "Restaurant Owner, Mumbai",
  },
  {
    quote:
      "As a real estate agency, a fast and professional website is critical. CloudNest built us a stunning property listing platform on AWS — our inquiry volume has tripled and the ongoing support is exceptional.",
    name: "Arjun Kapoor",
    role: "Real Estate Agent, Pune",
  },
];

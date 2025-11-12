const defaultTicket = new Ticket(100, 3, new DefaultPricingStrategy());
defaultTicket.handleTicketOnExit(); // uses normal pricing

const weekendTicket = new Ticket(100, 3, new WeekendPricingStrategy());
weekendTicket.handleTicketOnExit(); // weekend surge applied

const goldTicket = new Ticket(100, 3, new MembershipPricingStrategy("GOLD"));
goldTicket.handleTicketOnExit(); // discount applied

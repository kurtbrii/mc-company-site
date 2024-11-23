import { type ROLE } from "@prisma/client"

export const userColor = (role: ROLE) => {
  switch (role) {
    case "CEO":
      return "text-ceo bg-ceo_bg"
    case "VIDEO_EDITOR":
      return "text-video_editor bg-video_editor_bg"
    case "CUSTOMER_SERVICE":
      return "text-customer_service bg-customer_service_bg"
    case "FUNNEL_BUILDER":
      return "text-funnel_builders bg-funnel_builders_bg"
    case "STRIPE_MANAGER":
      return "text-stripe_manager bg-stripe_manager_bg"
    case "PROOFREADER":
      return "text-proofreader bg-proofreader_bg"
    case "EMAIL_MARKETING":
      return "text-email_marketing bg-email_marketing_bg"
    case "FACEBOOK_MARKETING":
      return "text-facebook_marketing bg-facebook_marketing_bg"
    case "USER":
      return "text-everyone bg-everyone_bg"
  }
}

export const userRole = (role: ROLE) => {
  switch (role) {
    case "CEO":
      return "CEO"
    case "VIDEO_EDITOR":
      return "Video Editor"
    case "CUSTOMER_SERVICE":
      return "Customer Service"
    case "FUNNEL_BUILDER":
      return "Funnel Builder"
    case "STRIPE_MANAGER":
      return "Stripe Manager"
    case "PROOFREADER":
      return "Proofreader"
    case "EMAIL_MARKETING":
      return "Email Marketing"
    case "FACEBOOK_MARKETING":
      return "Facebook Marketing"
    case "USER":
      return "No Role Yet"
  }
}

export const getRole = (role: ROLE) => {
  switch (role) {
    case "VIDEO_EDITOR":
      return "video-editor";
    case "FUNNEL_BUILDER":
      return "funnel-builder";
    case "CUSTOMER_SERVICE":
      return "customer-service";
    case "FACEBOOK_MARKETING":
      return "facebook-marketing";
  }
};

export const buttonActive = (role: ROLE) => {
  if (role === "USER") {
    return "bg-button_disabled text-white_disabled cursor-not-allowed"
  } else {
    return "bg-discord_button text-white"
  }
}

export const getTime = (date1: Date, date2: Date) => {
  const start = date1.getTime();
  const end = date2.getTime();

  const diff = end - start;
  const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(diff / (1000 * 60) % 60);
  const seconds = Math.floor(diff / 1000 % 60);

  return `${hours ? hours : "00"}:${minutes ? minutes : "00"}:${seconds ? seconds : "00"}`;
};

export const getCurrentMonday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const distanceToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

  // Set the date to the most recent Monday
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + distanceToMonday);

  // Return the date as a string in 'YYYY-MM-DD' format
  return currentMonday;
};

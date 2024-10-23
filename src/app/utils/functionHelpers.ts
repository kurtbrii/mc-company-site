export const userColor = (role: string) => {
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

export const userRole = (role: string) => {
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

export const buttonActive = (role: string | undefined) => {
  if (role === "USER") {
    return "bg-button_disabled text-white_disabled cursor-not-allowed"
  } else {
    return "bg-discord_button text-white"
  }
}



export const userColor = (role: string) => {
  switch (role) {
    case "CEO":
      return "text-ceo bg-ceo_bg"
    case "VIDEO_EDITOR":
      return "text-video_editor bg-video_editor_bg"
    case "CUSTOMER_SERVICE":
      return "text-customer_service bg-customer_service_bg"
    case "FUNNEL_BUILDERS":
      return "text-funnel_builders bg-funnel_builders_bg"
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
    case "FUNNEL_BUILDERS":
      return "Funnel Builder"
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



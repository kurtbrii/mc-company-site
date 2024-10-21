const userColor = (role: string) => {
  switch (role) {
    case "CEO":
      return "ceo ceo_bg"
    case "VIDEO_EDITOR":
      return "video_editor video_editor_bg"
    case "CUSTOMER_SERVICE":
      return "customer_service customer_service_bg"
    case "FUNNEL_BUILDER":
      return "funnel_builders funnel_builders_bg"
    default:
      return "text-everyone bg-everyone_bg"
  }
}

const buttonColors = (role: string) => {
  if (role === "USER") {
    return " "
  }
}

export { userColor }


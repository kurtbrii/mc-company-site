import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans]
			},
			colors: {
				discord_black: '#313338',
				discord_left: '#1E1F22',
				discord_button: '#5863F8',
				button_disabled: 'rgba(88, 99, 248, 0.25)',
				white: '#FFFFFF',
				white_disabled: 'rgba(255, 255, 255, 0.50)',
				everyone: '#C9CDFB',
				everyone_bg: '#4A4B72',
				ceo: '#F1C40F',
				ceo_bg: '#4C483F',
				video_editor: '#3498DB',
				video_editor_bg: '#43484A',
				customer_service: '#E91E63',
				customer_service_bg: '#563E3D',
				funnel_builders: '#2FCC71',
				funnel_builders_bg: '#444E3F',
				stripe_manager: '#546E7A',
				stripe_manager_bg: '#3A3F45',
				proofreader: '#9B59B6',
				proofreader_bg: '#423D4C',
				email_marketing: '#71368A',
				email_marketing_bg: '#3F3A47',
				facebook_marketing: '#206694',
				facebook_marketing_bg: '#373E48'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
		screens: {
			tablet: '600px',
			laptop: '1024px',
			desktop: '1280px'
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	// plugins: [require("tailwindcss-animate")],
} satisfies Config;

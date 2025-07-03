# iPhone 15 Pro Max Web Viewer

A modern, responsive web application that displays websites inside a realistic iPhone 15 Pro Max device mockup. Built with React and Vite.

## Features

- **Realistic iPhone 15 Pro Max Design**: Complete with Dynamic Island, Action Button, titanium bezels, and modern iOS styling
- **Interactive URL Input**: Enter any website URL to display inside the phone
- **Quick Preset Links**: One-click access to popular websites (Apple, Google, GitHub, YouTube)
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Non-scrollable Background**: Main website remains fixed while phone content is scrollable
- **Error Handling**: Graceful handling of blocked or failed website loads
- **Loading States**: Visual feedback during website loading

## Design Highlights

- **iPhone 15 Pro Max Specific Elements**:
  - Dynamic Island with camera and sensor indicators
  - Action Button (orange) on the left side
  - Volume buttons and power button
  - Titanium bezels with realistic gradients
  - Home indicator bar
  - Live status bar with time and battery

- **Layout**:
  - Controls positioned on the left side of the device
  - Side-by-side responsive layout
  - Modern iOS Safari-style address bar
  - Proper scaling across all screen sizes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd phone-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Usage

1. **Enter a URL**: Type any website URL in the input field and click "Load Website"
2. **Use Quick Links**: Click on preset buttons for popular websites
3. **View in Phone**: Website appears inside the realistic iPhone mockup
4. **Scroll Content**: Scroll within the phone screen to navigate the website

## Technical Details

- **Framework**: React 18 with Vite
- **Styling**: Pure CSS with modern features
- **Responsive Design**: Mobile-first approach with multiple breakpoints
- **Error Handling**: iframe sandboxing and error states
- **Performance**: Optimized loading and smooth animations

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Note: Some websites may block iframe embedding for security reasons.

## Project Structure

```
src/
├── components/
│   ├── IPhoneDevice.jsx      # Main iPhone device component
│   └── IPhoneDevice.css      # iPhone styling and responsive design
├── App.jsx                   # Main application component
├── App.css                   # Application layout and controls
├── index.css                 # Global styles and reset
└── main.jsx                  # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.te

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

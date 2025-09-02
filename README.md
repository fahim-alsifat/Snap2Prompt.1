# AI Prompt Generator

A modern, responsive web application that integrates with Google AI Studio Flash 2.0 API to generate structured prompts for image generation. Built with HTML, CSS (Tailwind), and JavaScript.

## Features

### ✨ Core Functionality
- **Smart Prompt Generation**: Uses Google AI Studio Flash 2.0 API to create detailed, structured prompts
- **Image Analysis**: Upload images for context-aware prompt generation
- **Structured Output**: Organized prompt format with sections for subject, clothing, lighting, etc.
- **Real-time Preview**: Instant feedback and preview of generated content

### 🎨 User Interface
- **Modern Design**: Clean, minimal UI with soft colors and gradients
- **Responsive Layout**: Flexible grid/flex layout that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Engaging transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader friendly

### 📱 Advanced Features
- **Drag & Drop Upload**: Intuitive image upload with preview
- **Prompt History**: Save and manage up to 10 recent prompts
- **Edit Mode**: Manually edit generated prompts
- **Copy to Clipboard**: One-click prompt copying
- **Local Storage**: Persistent settings and history
- **Offline Support**: Service worker for basic offline functionality

## Setup Instructions

### Prerequisites
1. **Google AI Studio API Key**: Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Web Server**: Use a local development server (Live Server, Python's http.server, etc.)

### Installation
1. **Clone or download** the project files to your local machine
2. **Open the project** in VS Code or your preferred editor
3. **Start a local server**:
   - Using VS Code Live Server extension
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx serve .`
4. **Open your browser** and navigate to `http://localhost:8000` (or your server's URL)

### Configuration
1. **Enter API Key**: On first use, enter your Google AI Studio API key in the sidebar
2. **The key is saved locally** and will be remembered for future sessions

## Usage Guide

### Basic Workflow
1. **Select Options**: Choose relevant categories from the sidebar checkboxes
2. **Upload Image** (optional): Drag and drop or click to upload an image for analysis
3. **Generate Prompt**: Click "Generate Prompt" to create your structured prompt
4. **Copy or Edit**: Use the generated prompt directly or edit it to your needs

### Available Options
- **Subject Face / Identity**: Focus on facial features and character identity
- **Hairstyle & Color**: Hair styling and color specifications
- **Dress / Clothing**: Clothing descriptions and fashion details
- **Accessories**: Hats, jewelry, watches, shoes, and other accessories
- **Skin Tone & Body Shape**: Physical appearance details
- **Pose / Gesture**: Body positioning and gestures
- **Lighting**: Lighting setup and mood
- **Background**: Scene and environment settings
- **Colors**: Color schemes and palettes
- **Objects / Props**: Additional objects in the scene
- **Environment**: Location and setting details
- **Mood / Emotion**: Emotional tone and atmosphere
- **Art Style**: Artistic style and technique
- **Camera Angle**: Photography and composition details
- **Resolution / Quality**: Technical specifications

### Prompt Structure
Generated prompts follow a dynamic structure based on your selected options. The output will only include sections for the categories you've selected:

**Example with all options selected:**
```
Subject Face / Identity: [detailed description]
Hairstyle & Color: [detailed description]
Clothing / Dress: [detailed description]
Accessories: [detailed description]
Skin Tone & Body Shape: [detailed description]
Pose / Gesture: [detailed description]
Lighting: [detailed description]
Background: [detailed description]
Colors: [detailed description]
Objects / Props: [detailed description]
Environment: [detailed description]
Mood / Emotion: [detailed description]
Art Style: [detailed description]
Camera Angle: [detailed description]
Resolution / Quality: [detailed description]
```

**Example with only "Lighting", "Background", and "Art Style" selected:**
```
Lighting: [detailed description]
Background: [detailed description]
Art Style: [detailed description]
```

The structure is completely dynamic - you'll only get sections for the options you actually select, making the output clean and focused on your specific needs.

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript features
- **Google AI Studio API**: Gemini 2.0 Flash Exp model
- **Service Worker**: Offline functionality
- **Local Storage**: Data persistence

### API Integration
The application uses Google's Generative Language API:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent
```

### File Structure
```
📁 AI Prompt Generator/
├── 📄 index.html          # Main HTML file
├── 📄 script.js           # JavaScript functionality
├── 📄 sw.js              # Service worker
└── 📄 README.md          # This documentation
```

### Browser Compatibility
- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile browsers**: Responsive design works on all mobile devices

## Security & Privacy

### Data Handling
- **API Key**: Stored locally in browser's localStorage
- **Images**: Processed locally, sent to Google AI only when generating prompts
- **Prompts**: Stored locally, never transmitted to external servers
- **No Analytics**: No tracking or data collection

### API Key Security
- API key is stored in browser's localStorage
- Never transmitted except to Google's official API endpoints
- Consider using environment variables for production deployments

## Customization

### Styling
The application uses Tailwind CSS with custom configurations:
- **Primary Color**: `#4f46e5` (Indigo)
- **Accent Colors**: Purple gradients
- **Typography**: Inter font family
- **Dark Mode**: Automatic system preference detection

### Adding New Options
To add new checkbox options:
1. Add the checkbox HTML in the sidebar section
2. Update the `getSelectedOptions()` method in script.js
3. Modify the API prompt template to handle new options

### Customizing Prompts
The prompt structure can be modified in the `callGoogleAIAPI()` method:
```javascript
let systemPrompt = `Your custom prompt template here...`;
```

## Troubleshooting

### Common Issues

**"Please enter your Google AI Studio API key"**
- Ensure you've entered a valid API key in the sidebar
- Check that the API key has proper permissions

**"Error generating prompt"**
- Verify your internet connection
- Check if the API key is correct and active
- Ensure you've selected at least one option or uploaded an image

**Images not uploading**
- Verify the file is a valid image format (JPEG, PNG, GIF, WebP)
- Check file size (Google AI has limits on image size)
- Try a different image format

**Prompts not saving to history**
- Check if localStorage is enabled in your browser
- Clear browser data if storage is full

### Performance Tips
- **Image Size**: Resize large images before upload for faster processing
- **API Limits**: Be aware of Google AI Studio rate limits
- **Browser Cache**: Clear cache if experiencing issues

## Contributing

### Development Setup
1. Clone the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit pull requests with clear descriptions

### Coding Standards
- Use ES6+ JavaScript features
- Follow consistent indentation (2 spaces)
- Add comments for complex functionality
- Maintain responsive design principles

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Verify API key and internet connectivity

## Version History

- **v1.0.0**: Initial release with full functionality
  - Google AI Studio integration
  - Responsive design
  - Dark mode support
  - Prompt history
  - Image upload and analysis

---

## 🧑‍💻 Developer Information

**👤 Name:** Fahim Al Sifat  
**📍 Location:** Bangladesh  
**💼 Role:** Student | Developer | Designer | AI Enthusiast  
**📧 Email:** [kingsifatbd27@gmail.com](mailto:kingsifatbd27@gmail.com)

### 🔗 Social Links:
- **🌐 Facebook:** [facebook.com/fahimalsifat](https://facebook.com/fahimalsifat)
- **🐦 Twitter (X):** [x.com/fahim_al_sifat](https://x.com/fahim_al_sifat)
- **📸 Instagram:** [instagram.com/fahim_alsifat](https://instagram.com/fahim_alsifat)
- **💼 LinkedIn:** [linkedin.com/in/fahimalsifat](https://linkedin.com/in/fahimalsifat)
- **💻 GitHub:** [github.com/fahim-alsifat](https://github.com/fahim-alsifat)

---

Built with ❤️ for the AI community by **Fahim Al Sifat**

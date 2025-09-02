/*!
 * AI Prompt Generator
 * 
 * A modern web application that integrates with Google AI Studio Flash 2.0 API 
 * to generate structured prompts for image generation.
 * 
 * @author Fahim Al Sifat <kingsifatbd27@gmail.com>
 * @version 1.0.0
 * @license MIT
 * @website h        // Build dynamic structure based on selected options
        let structureInstructions = '';
        if (selectedOptions.length > 0) {
            structureInstructions = 'REQUIRED OUTPUT STRUCTURE - Include ONLY the selected categories with ULTRA-DETAILED specifications:\n\n';
            selectedOptions.forEach(option => {
                if (optionMapping[option]) {
                    const sectionName = optionMapping[option];
                    structureInstructions += `${sectionName}: [ULTRA-PRECISE technical description with measurements, specifications, and quantifiable details]\n`;
                    
                    // Add specific guidance for each category
                    switch(option) {
                        case 'subject-face':
                            structureInstructions += `   → Include: facial structure, proportions, expression intensity (0-100%), eye gaze angle, micro-expressions\n`;
                            break;
                        case 'lighting':
                            structureInstructions += `   → Include: light direction (degrees), intensity (%), color temperature (K), shadow characteristics, contrast ratio\n`;
                            break;
                        case 'colors':
                            structureInstructions += `   → Include: hex codes, HSL values, color temperature, saturation levels, color relationships\n`;
                            break;
                        case 'clothing':
                            structureInstructions += `   → Include: fabric type, weave pattern, fit measurements, color codes, texture details, styling specifics\n`;
                            break;
                        case 'background':
                            structureInstructions += `   → Include: depth measurements, focus levels, element positioning, atmospheric conditions, perspective\n`;
                            break;
                        case 'pose':
                            structureInstructions += `   → Include: body angles, weight distribution, limb positioning, gesture specifics, balance points\n`;
                            break;
                        case 'camera-angle':
                            structureInstructions += `   → Include: focal length (mm), aperture (f-stop), viewpoint height, angle of view, perspective type\n`;
                            break;
                        case 'art-style':
                            structureInstructions += `   → Include: technique specifics, brushwork details, artistic medium, style percentage influence, historical references\n`;
                            break;
                        case 'quality':
                            structureInstructions += `   → Include: resolution specs, pixel density, compression quality, color space, bit depth requirements\n`;
                            break;
                    }
                }
            });
            structureInstructions += '\nEach section must contain measurable, technical specifications that enable exact reproduction.\n';
        } else {
            structureInstructions = 'Provide comprehensive technical analysis with quantifiable measurements and specifications.';
        }b.com/fahim-alsifat
 * 
 * Social Links:
 * - Facebook: https://facebook.com/fahimalsifat
 * - Twitter: https://x.com/fahim_al_sifat
 * - Instagram: https://instagram.com/fahim_alsifat
 * - LinkedIn: https://linkedin.com/in/fahimalsifat
 * - GitHub: https://github.com/fahim-alsifat
 * 
 * Developed with ❤️ in Bangladesh
 */

class PromptGenerator {
    constructor() {
        this.apiKey = '';
        this.uploadedImage = null;
        this.promptHistory = JSON.parse(localStorage.getItem('promptHistory')) || [];
        this.maxHistoryItems = 10;
        this.apiKeys = JSON.parse(localStorage.getItem('apiKeys')) || [];
        this.currentApiKeyId = localStorage.getItem('currentApiKeyId') || null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDarkModePreference();
        this.loadApiKeys();
        this.renderPromptHistory();
        this.renderApiKeyManager();
    }

    setupEventListeners() {
        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', this.toggleDarkMode.bind(this));
        
        // API key input
        document.getElementById('apiKey').addEventListener('input', this.saveApiKey.bind(this));
        document.getElementById('addApiKey').addEventListener('click', this.addNewApiKey.bind(this));
        document.getElementById('manageApiKeys').addEventListener('click', this.toggleApiKeyManager.bind(this));
        document.getElementById('exportApiKeys').addEventListener('click', this.exportApiKeys.bind(this));
        document.getElementById('importApiKeys').addEventListener('click', this.importApiKeys.bind(this));
        
        // File upload
        const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('fileInput');
        
        dropArea.addEventListener('click', () => fileInput.click());
        dropArea.addEventListener('dragover', this.handleDragOver.bind(this));
        dropArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        dropArea.addEventListener('drop', this.handleFileDrop.bind(this));
        
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        document.getElementById('removeImage').addEventListener('click', this.removeImage.bind(this));
        
        // Buttons
        document.getElementById('generatePrompt').addEventListener('click', this.generatePrompt.bind(this));
        document.getElementById('clearBtn').addEventListener('click', this.clearAll.bind(this));
        document.getElementById('copyPrompt').addEventListener('click', this.copyPrompt.bind(this));
        document.getElementById('editPrompt').addEventListener('click', this.toggleEditMode.bind(this));
    }

    toggleDarkMode() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        } else {
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        }
    }

    loadDarkModePreference() {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            document.documentElement.classList.add('dark');
        }
    }

    saveApiKey() {
        const apiKeyInput = document.getElementById('apiKey');
        const newApiKey = apiKeyInput.value.trim();
        
        if (newApiKey) {
            this.apiKey = newApiKey;
            
            // Update current API key if it exists in saved keys
            if (this.currentApiKeyId) {
                const existingKey = this.apiKeys.find(k => k.id === this.currentApiKeyId);
                if (existingKey) {
                    existingKey.key = newApiKey;
                    existingKey.lastUsed = new Date().toISOString();
                    this.saveApiKeysToStorage();
                }
            }
        }
    }

    loadApiKeys() {
        // Load current API key
        if (this.currentApiKeyId) {
            const currentKey = this.apiKeys.find(k => k.id === this.currentApiKeyId);
            if (currentKey) {
                this.apiKey = currentKey.key;
                document.getElementById('apiKey').value = currentKey.key;
            }
        } else {
            // Fallback to legacy single API key
            const legacyApiKey = localStorage.getItem('googleAiApiKey');
            if (legacyApiKey) {
                this.apiKey = legacyApiKey;
                document.getElementById('apiKey').value = legacyApiKey;
            }
        }
    }

    addNewApiKey() {
        const apiKeyInput = document.getElementById('apiKey');
        const keyValue = apiKeyInput.value.trim();
        
        if (!keyValue) {
            this.showToast('Please enter an API key first', 'error');
            return;
        }

        // Check if key already exists
        const existingKey = this.apiKeys.find(k => k.key === keyValue);
        if (existingKey) {
            this.showToast('This API key is already saved', 'error');
            return;
        }

        // Prompt for key name
        const keyName = prompt('Enter a name for this API key (e.g., "Personal", "Work", "Project A"):');
        if (!keyName) return;

        const newApiKey = {
            id: Date.now().toString(),
            name: keyName.trim(),
            key: keyValue,
            createdAt: new Date().toISOString(),
            lastUsed: new Date().toISOString(),
            usageCount: 0
        };

        this.apiKeys.push(newApiKey);
        this.currentApiKeyId = newApiKey.id;
        this.apiKey = keyValue;

        this.saveApiKeysToStorage();
        this.renderApiKeyManager();
        this.showToast(`API key "${keyName}" saved successfully!`, 'success');
    }

    saveApiKeysToStorage() {
        localStorage.setItem('apiKeys', JSON.stringify(this.apiKeys));
        localStorage.setItem('currentApiKeyId', this.currentApiKeyId);
    }

    loadApiKey(keyId) {
        const apiKeyObj = this.apiKeys.find(k => k.id === keyId);
        if (apiKeyObj) {
            this.apiKey = apiKeyObj.key;
            this.currentApiKeyId = keyId;
            
            // Update last used
            apiKeyObj.lastUsed = new Date().toISOString();
            apiKeyObj.usageCount++;
            
            document.getElementById('apiKey').value = apiKeyObj.key;
            this.saveApiKeysToStorage();
            this.renderApiKeyManager();
            this.showToast(`Switched to API key: ${apiKeyObj.name}`, 'success');
        }
    }

    deleteApiKey(keyId) {
        const apiKeyObj = this.apiKeys.find(k => k.id === keyId);
        if (!apiKeyObj) return;

        if (confirm(`Are you sure you want to delete the API key "${apiKeyObj.name}"?`)) {
            this.apiKeys = this.apiKeys.filter(k => k.id !== keyId);
            
            // If this was the current key, clear it
            if (this.currentApiKeyId === keyId) {
                this.currentApiKeyId = null;
                this.apiKey = '';
                document.getElementById('apiKey').value = '';
            }

            this.saveApiKeysToStorage();
            this.renderApiKeyManager();
            this.showToast(`API key "${apiKeyObj.name}" deleted`, 'info');
        }
    }

    editApiKeyName(keyId) {
        const apiKeyObj = this.apiKeys.find(k => k.id === keyId);
        if (!apiKeyObj) return;

        const newName = prompt('Enter new name for this API key:', apiKeyObj.name);
        if (newName && newName.trim() !== apiKeyObj.name) {
            apiKeyObj.name = newName.trim();
            this.saveApiKeysToStorage();
            this.renderApiKeyManager();
            this.showToast('API key name updated', 'success');
        }
    }

    toggleApiKeyManager() {
        const manager = document.getElementById('apiKeyManager');
        const isHidden = manager.classList.contains('hidden');
        
        if (isHidden) {
            manager.classList.remove('hidden');
            this.renderApiKeyManager();
        } else {
            manager.classList.add('hidden');
        }
    }

    renderApiKeyManager() {
        const container = document.getElementById('apiKeyList');
        
        if (this.apiKeys.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                    No saved API keys. Add one using the button above.
                </div>
            `;
            return;
        }

        container.innerHTML = this.apiKeys.map(apiKey => `
            <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3 ${this.currentApiKeyId === apiKey.id ? 'bg-primary/10 border-primary' : ''}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2">
                            <h4 class="font-medium text-gray-900 dark:text-white text-sm">${apiKey.name}</h4>
                            ${this.currentApiKeyId === apiKey.id ? '<span class="px-2 py-1 bg-primary text-white text-xs rounded-full">Active</span>' : ''}
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Key: ${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            Used ${apiKey.usageCount} times • Last used: ${new Date(apiKey.lastUsed).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                
                <div class="flex space-x-2 mt-2">
                    ${this.currentApiKeyId !== apiKey.id ? `
                        <button onclick="promptGenerator.loadApiKey('${apiKey.id}')" class="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark transition-colors">
                            Use
                        </button>
                    ` : ''}
                    <button onclick="promptGenerator.editApiKeyName('${apiKey.id}')" class="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors">
                        Rename
                    </button>
                    <button onclick="promptGenerator.deleteApiKey('${apiKey.id}')" class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    exportApiKeys() {
        if (this.apiKeys.length === 0) {
            this.showToast('No API keys to export', 'error');
            return;
        }

        const exportData = {
            apiKeys: this.apiKeys.map(key => ({
                id: key.id,
                name: key.name,
                key: key.key,
                createdAt: key.createdAt,
                usageCount: key.usageCount
            })),
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ai-prompt-generator-api-keys-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showToast('API keys exported successfully!', 'success');
    }

    importApiKeys() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    if (!importData.apiKeys || !Array.isArray(importData.apiKeys)) {
                        throw new Error('Invalid file format');
                    }

                    let importedCount = 0;
                    let skippedCount = 0;

                    importData.apiKeys.forEach(importKey => {
                        // Check if key already exists
                        const exists = this.apiKeys.some(k => k.key === importKey.key);
                        if (!exists) {
                            const newKey = {
                                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                                name: importKey.name || 'Imported Key',
                                key: importKey.key,
                                createdAt: importKey.createdAt || new Date().toISOString(),
                                lastUsed: new Date().toISOString(),
                                usageCount: importKey.usageCount || 0
                            };
                            this.apiKeys.push(newKey);
                            importedCount++;
                        } else {
                            skippedCount++;
                        }
                    });

                    this.saveApiKeysToStorage();
                    this.renderApiKeyManager();

                    let message = `Imported ${importedCount} API key(s)`;
                    if (skippedCount > 0) {
                        message += `, skipped ${skippedCount} duplicate(s)`;
                    }
                    this.showToast(message, 'success');

                } catch (error) {
                    this.showToast('Failed to import API keys. Invalid file format.', 'error');
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('dropArea').classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('dropArea').classList.remove('drag-over');
    }

    handleFileDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('dropArea').classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showToast('Please upload an image file', 'error');
            return;
        }

        // Check file size (limit to 20MB for ultra-detailed analysis)
        if (file.size > 20 * 1024 * 1024) {
            this.showToast('Image size should be less than 20MB for optimal ultra-detailed analysis', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            // Compress image if needed for better API processing
            this.compressImage(e.target.result, file.type, (compressedImage) => {
                this.uploadedImage = {
                    data: compressedImage,
                    type: file.type,
                    name: file.name,
                    size: file.size
                };
                this.showImagePreview(compressedImage);
            });
        };
        reader.readAsDataURL(file);
    }

    compressImage(dataUrl, type, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            // Calculate optimal dimensions (max 1536px for ultra-detailed analysis)
            const maxSize = 1536; // Increased for better detail preservation
            let { width, height } = img;
            
            // Preserve aspect ratio while optimizing for analysis
            if (width > height && width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
            } else if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Use highest quality settings for maximum detail preservation
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert with maximum quality for detailed analysis
            const compressedDataUrl = canvas.toDataURL(type, 0.95); // Higher quality
            callback(compressedDataUrl);
        };
        
        img.src = dataUrl;
    }

    showImagePreview(imageSrc) {
        document.getElementById('uploadPrompt').classList.add('hidden');
        document.getElementById('imagePreview').classList.remove('hidden');
        document.getElementById('previewImg').src = imageSrc;
        
        // Add image analysis indicator
        const previewDiv = document.getElementById('imagePreview');
        const existingIndicator = previewDiv.querySelector('.analysis-indicator');
        if (!existingIndicator) {
            const analysisIndicator = document.createElement('div');
            analysisIndicator.className = 'analysis-indicator mt-2 text-center';
            analysisIndicator.innerHTML = `
                <div class="inline-flex items-center text-green-600 dark:text-green-400">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium">Image ready for analysis</span>
                </div>
            `;
            previewDiv.appendChild(analysisIndicator);
        }
    }

    removeImage() {
        this.uploadedImage = null;
        document.getElementById('uploadPrompt').classList.remove('hidden');
        document.getElementById('imagePreview').classList.add('hidden');
        document.getElementById('fileInput').value = '';
        
        // Remove analysis indicator
        const analysisIndicator = document.querySelector('.analysis-indicator');
        if (analysisIndicator) {
            analysisIndicator.remove();
        }
    }

    getSelectedOptions() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    async generatePrompt() {
        if (!this.apiKey.trim()) {
            this.showToast('Please enter your Google AI Studio API key', 'error');
            return;
        }

        const selectedOptions = this.getSelectedOptions();
        if (selectedOptions.length === 0 && !this.uploadedImage) {
            this.showToast('Please select at least one option or upload an image', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const prompt = await this.callGoogleAIAPI(selectedOptions);
            
            // Update API key usage count
            if (this.currentApiKeyId) {
                const currentKey = this.apiKeys.find(k => k.id === this.currentApiKeyId);
                if (currentKey) {
                    currentKey.usageCount++;
                    currentKey.lastUsed = new Date().toISOString();
                    this.saveApiKeysToStorage();
                }
            }
            
            this.displayPrompt(prompt);
            this.addToHistory(prompt);
            this.showToast('Ultra-precise technical prompt generated successfully!', 'success');
        } catch (error) {
            console.error('Error generating prompt:', error);
            this.showToast('Error generating prompt. Please check your API key and try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async callGoogleAIAPI(selectedOptions) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;
        
        // Create dynamic prompt structure based on selected options
        const optionMapping = {
            'subject-face': 'Subject Face / Identity',
            'hairstyle': 'Hairstyle & Color',
            'clothing': 'Clothing / Dress',
            'accessories': 'Accessories',
            'skin-tone': 'Skin Tone & Body Shape',
            'pose': 'Pose / Gesture',
            'lighting': 'Lighting',
            'background': 'Background',
            'colors': 'Colors',
            'objects': 'Objects / Props',
            'environment': 'Environment',
            'mood': 'Mood / Emotion',
            'art-style': 'Art Style',
            'camera-angle': 'Camera Angle',
            'quality': 'Resolution / Quality'
        };

        // Build dynamic structure based on selected options
        let structureInstructions = '';
        if (selectedOptions.length > 0) {
            structureInstructions = 'Please structure your response in the following format with ONLY the selected categories:\n\n';
            selectedOptions.forEach(option => {
                if (optionMapping[option]) {
                    structureInstructions += `${optionMapping[option]}: [detailed description]\n`;
                }
            });
        } else {
            structureInstructions = 'Please provide a general detailed description for image generation.';
        }
        
        // Create the base prompt with enhanced image analysis
        let systemPrompt = `You are a world-class AI prompt engineer and professional image analyst with expertise in photography, digital art, and computer vision. Your task is to create ULTRA-PRECISE, MEASURABLE, and REPRODUCTION-READY prompts.

${this.uploadedImage ? `
CRITICAL IMAGE ANALYSIS INSTRUCTIONS:
- EXAMINE EVERY PIXEL AND DETAIL with forensic precision
- MEASURE angles, proportions, distances, and spatial relationships
- IDENTIFY exact colors using color theory (HSL, RGB, hex codes when possible)
- ANALYZE lighting direction, intensity, color temperature (in Kelvin)
- DOCUMENT exact materials, textures, surface properties, and finishes
- DESCRIBE precise facial expressions, micro-expressions, and body language
- RECORD exact positioning, angles, and geometric relationships
- NOTE depth of field, focus points, and optical characteristics
` : ''}

Selected focus areas: ${selectedOptions.map(opt => optionMapping[opt] || opt).join(', ')}

${structureInstructions}

ULTRA-PRECISION REQUIREMENTS:
1. **MEASUREMENTS & DIMENSIONS**: Include specific measurements, angles, proportions (e.g., "head tilted 15 degrees to the right", "eyes positioned at 1/3 rule intersection")

2. **COLOR SPECIFICATION**: Use exact color descriptions with professional color names, temperature, and saturation levels (e.g., "warm ivory skin tone with subtle peach undertones", "deep emerald green #006A4E with 85% saturation")

3. **LIGHTING ANALYSIS**: Specify exact lighting conditions including:
   - Direction (e.g., "45-degree key light from upper left")
   - Quality (soft/hard, diffused/direct)
   - Color temperature (e.g., "5600K daylight balanced")
   - Shadow characteristics and contrast ratios

4. **MATERIAL & TEXTURE DETAILS**: Describe surfaces with tactile precision:
   - Fabric weave, thread count, texture patterns
   - Surface finish (matte, satin, glossy, metallic)
   - Material properties (translucent, opaque, reflective)

5. **COMPOSITIONAL ELEMENTS**: Include camera settings and framing:
   - Focal length equivalent (e.g., "85mm portrait lens equivalent")
   - Aperture for depth of field (e.g., "f/2.8 creating smooth bokeh")
   - Viewpoint and camera angle specifics

6. **FACIAL/BODY ANALYSIS** (if applicable):
   - Exact expression details and emotion intensity
   - Eye gaze direction and focus point
   - Lip position, eyebrow angle, facial muscle tension
   - Hand positions and finger placement
   - Posture alignment and weight distribution

7. **ENVIRONMENTAL CONTEXT**: Document surroundings with architectural precision:
   - Spatial relationships and distances
   - Atmospheric conditions and clarity
   - Background element positioning and scale

8. **TECHNICAL SPECIFICATIONS**: Include render-quality details:
   - Resolution requirements and pixel density
   - Compression and quality standards
   - Color space and bit depth considerations

CRITICAL SUCCESS CRITERIA:
- Every description must be so precise that two different artists could create nearly identical results
- Include quantifiable measurements wherever possible
- Use professional photography, art, and design terminology
- Prioritize ACCURACY and REPRODUCIBILITY over creative interpretation
- Focus on observable facts rather than artistic interpretation

Your goal: Create prompts that serve as technical blueprints for exact image recreation.`;

        const requestBody = {
            contents: [{
                parts: []
            }],
            generationConfig: {
                temperature: 0.05, // Even lower temperature for maximum precision
                topK: 10, // More focused token selection
                topP: 0.7, // Reduced for more deterministic output
                maxOutputTokens: 4096, // Increased for more detailed descriptions
                candidateCount: 1,
                stopSequences: []
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        // Add image first for better analysis if uploaded
        if (this.uploadedImage) {
            const base64Data = this.uploadedImage.data.split(',')[1];
            requestBody.contents[0].parts.push({
                inline_data: {
                    mime_type: this.uploadedImage.type,
                    data: base64Data
                }
            });
        }

        // Add text prompt after image
        requestBody.contents[0].parts.push({
            text: systemPrompt
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No content generated');
        }
    }

    displayPrompt(prompt) {
        const promptOutput = document.getElementById('promptOutput');
        promptOutput.value = prompt;
        
        // Enable buttons
        document.getElementById('copyPrompt').disabled = false;
        document.getElementById('editPrompt').disabled = false;
    }

    copyPrompt() {
        const promptOutput = document.getElementById('promptOutput');
        promptOutput.select();
        document.execCommand('copy');
        this.showToast('Ultra-precise technical prompt copied to clipboard!', 'success');
    }

    toggleEditMode() {
        const promptOutput = document.getElementById('promptOutput');
        const editBtn = document.getElementById('editPrompt');
        
        if (promptOutput.readOnly) {
            promptOutput.readOnly = false;
            promptOutput.classList.remove('bg-gray-50', 'dark:bg-gray-700');
            promptOutput.classList.add('bg-white', 'dark:bg-gray-800');
            editBtn.textContent = 'Save Changes';
            this.showToast('Edit mode enabled', 'info');
        } else {
            promptOutput.readOnly = true;
            promptOutput.classList.add('bg-gray-50', 'dark:bg-gray-700');
            promptOutput.classList.remove('bg-white', 'dark:bg-gray-800');
            editBtn.textContent = 'Edit Prompt';
            this.showToast('Changes saved', 'success');
        }
    }

    clearAll() {
        // Clear checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        // Clear image
        this.removeImage();
        
        // Clear prompt output
        document.getElementById('promptOutput').value = '';
        document.getElementById('copyPrompt').disabled = true;
        document.getElementById('editPrompt').disabled = true;
        
        this.showToast('All fields cleared', 'info');
    }

    addToHistory(prompt) {
        const historyItem = {
            id: Date.now(),
            prompt: prompt.substring(0, 200) + (prompt.length > 200 ? '...' : ''),
            fullPrompt: prompt,
            timestamp: new Date().toISOString(),
            options: this.getSelectedOptions()
        };

        this.promptHistory.unshift(historyItem);
        
        // Keep only the last 10 items
        if (this.promptHistory.length > this.maxHistoryItems) {
            this.promptHistory = this.promptHistory.slice(0, this.maxHistoryItems);
        }

        localStorage.setItem('promptHistory', JSON.stringify(this.promptHistory));
        this.renderPromptHistory();
    }

    renderPromptHistory() {
        const historyContainer = document.getElementById('promptHistory');
        
        if (this.promptHistory.length === 0) {
            historyContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-8">No recent prompts</p>';
            return;
        }

        historyContainer.innerHTML = this.promptHistory.map(item => `
            <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        ${new Date(item.timestamp).toLocaleDateString()} ${new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                    <div class="flex space-x-2">
                        <button onclick="promptGenerator.loadHistoryItem(${item.id})" class="text-primary hover:text-primary-dark text-xs font-medium">
                            Load
                        </button>
                        <button onclick="promptGenerator.deleteHistoryItem(${item.id})" class="text-red-500 hover:text-red-700 text-xs font-medium">
                            Delete
                        </button>
                    </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">${item.prompt}</p>
                ${item.options.length > 0 ? `
                    <div class="flex flex-wrap gap-1">
                        ${item.options.map(option => `
                            <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                ${option.replace('-', ' ')}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    loadHistoryItem(id) {
        const item = this.promptHistory.find(h => h.id === id);
        if (item) {
            document.getElementById('promptOutput').value = item.fullPrompt;
            document.getElementById('copyPrompt').disabled = false;
            document.getElementById('editPrompt').disabled = false;
            this.showToast('Prompt loaded from history', 'success');
        }
    }

    deleteHistoryItem(id) {
        this.promptHistory = this.promptHistory.filter(h => h.id !== id);
        localStorage.setItem('promptHistory', JSON.stringify(this.promptHistory));
        this.renderPromptHistory();
        this.showToast('Prompt deleted from history', 'info');
    }

    showLoading(show) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const generateBtn = document.getElementById('generatePrompt');
        
        if (show) {
            loadingIndicator.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
            loadingIndicator.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ${this.uploadedImage ? 'Performing ultra-detailed image analysis and generating precision prompt...' : 'Generating ultra-precise technical prompt...'}
            `;
        } else {
            loadingIndicator.classList.add('hidden');
            generateBtn.disabled = false;
            generateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        // Remove existing classes
        toast.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 fade-in';
        
        // Add type-specific classes
        switch (type) {
            case 'success':
                toast.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                toast.classList.add('bg-red-500', 'text-white');
                break;
            case 'info':
                toast.classList.add('bg-blue-500', 'text-white');
                break;
            default:
                toast.classList.add('bg-green-500', 'text-white');
        }
        
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.promptGenerator = new PromptGenerator();
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.promptGenerator) {
        window.promptGenerator.showToast('An unexpected error occurred', 'error');
    }
});

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

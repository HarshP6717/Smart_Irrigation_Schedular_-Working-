// Voice Guidance Service using Web Speech API
class VoiceGuidanceService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.enabled = localStorage.getItem('voiceGuidanceEnabled') !== 'false';
    this.language = localStorage.getItem('selectedLanguage') || 'en-US';
    this.rate = 0.9; // Slightly slower for better comprehension
    this.pitch = 1.0;
    this.volume = 1.0;
  }

  // Check if speech synthesis is supported
  isSupported() {
    return 'speechSynthesis' in window;
  }

  // Speak text
  speak(text, options = {}) {
    if (!this.isSupported() || !this.enabled || !text) {
      return;
    }

    // Cancel any ongoing speech
    this.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || this.language;
    utterance.rate = options.rate || this.rate;
    utterance.pitch = options.pitch || this.pitch;
    utterance.volume = options.volume || this.volume;

    // Handle events
    utterance.onend = () => {
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      if (options.onError) options.onError(event);
    };

    this.synth.speak(utterance);
  }

  // Cancel current speech
  cancel() {
    if (this.isSupported()) {
      this.synth.cancel();
    }
  }

  // Pause speech
  pause() {
    if (this.isSupported() && this.synth.speaking) {
      this.synth.pause();
    }
  }

  // Resume speech
  resume() {
    if (this.isSupported() && this.synth.paused) {
      this.synth.resume();
    }
  }

  // Enable/disable voice guidance
  setEnabled(enabled) {
    this.enabled = enabled;
    localStorage.setItem('voiceGuidanceEnabled', enabled.toString());
  }

  // Check if enabled
  isEnabled() {
    return this.enabled;
  }

  // Set language
  setLanguage(lang) {
    this.language = lang;
    localStorage.setItem('selectedLanguage', lang);
  }

  // Get available voices
  getVoices() {
    if (!this.isSupported()) return [];
    return this.synth.getVoices();
  }

  // Speak page instructions
  speakPageInstructions(pageName) {
    const instructions = {
      'farm-setup': 'Welcome to farm setup. Please enter your farm details. You can use the location button to automatically detect your location.',
      'crop-selection': 'Select your crop type. Choose the crop you are growing on your farm.',
      'soil-selection': 'Select your soil type. This helps us calculate the right amount of water.',
      'pump-selection': 'Select your water pump size. This determines irrigation duration.',
      'dashboard': 'Welcome to your dashboard. Here you can see weather information and irrigation schedule.',
      'schedule': 'This is your irrigation schedule. You can see when to water your crops.',
      'help': 'Help and support. Find answers to common questions or contact support.'
    };

    const text = instructions[pageName] || 'Welcome';
    this.speak(text);
  }

  // Speak button action
  speakAction(action) {
    const actions = {
      'detect-location': 'Detecting your location',
      'save': 'Saving your information',
      'next': 'Moving to next step',
      'back': 'Going back',
      'generate-schedule': 'Generating irrigation schedule',
      'help': 'Opening help',
      'confirm': 'Confirmed',
      'cancel': 'Cancelled'
    };

    const text = actions[action] || action;
    this.speak(text);
  }
}

// Create singleton instance
const voiceGuidance = new VoiceGuidanceService();

export default voiceGuidance;

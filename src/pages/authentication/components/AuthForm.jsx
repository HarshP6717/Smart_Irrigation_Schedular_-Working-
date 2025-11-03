import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuthForm = ({ 
  mode = 'login', 
  onModeChange, 
  onSuccess,
  className = "" 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    farmer: { email: "farmer@example.com", password: "farmer123" },
    admin: { email: "admin@irrigation.com", password: "admin123" },
    demo: { email: "demo@test.com", password: "demo123" }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData?.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Registration specific validations
    if (mode === 'register') {
      if (!formData?.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      // Voice guidance for errors
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Please correct the form errors");
        window.speechSynthesis?.speak(utterance);
      }
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'login') {
        // Check mock credentials
        const isValidCredential = Object.values(mockCredentials)?.some(
          cred => cred?.email === formData?.email && cred?.password === formData?.password
        );

        if (!isValidCredential) {
          setErrors({ 
            general: `Invalid credentials. Try: ${mockCredentials?.farmer?.email} / ${mockCredentials?.farmer?.password}` 
          });
          setIsLoading(false);
          return;
        }

        // Store user session
        localStorage.setItem('userAuth', JSON.stringify({
          email: formData?.email,
          loginTime: new Date()?.toISOString(),
          isAuthenticated: true
        }));

        // Voice guidance for success
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Login successful");
          window.speechSynthesis?.speak(utterance);
        }

        // Check if user has completed setup
        const hasCompletedSetup = localStorage.getItem('farmSetupComplete');
        if (hasCompletedSetup) {
          navigate('/main-dashboard');
        } else {
          navigate('/farm-setup');
        }
      } else {
        // Registration success
        localStorage.setItem('userAuth', JSON.stringify({
          email: formData?.email,
          phoneNumber: formData?.phoneNumber,
          registrationTime: new Date()?.toISOString(),
          isAuthenticated: true
        }));

        // Voice guidance for success
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Registration successful");
          window.speechSynthesis?.speak(utterance);
        }

        navigate('/farm-setup');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Voice guidance
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Password reset feature coming soon");
      window.speechSynthesis?.speak(utterance);
    }
    
    alert("Password reset functionality will be available soon. Please contact support if needed.");
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={18} color="var(--color-error)" />
              <p className="text-sm font-body text-error">
                {errors?.general}
              </p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
          className="touch-target"
        />

        {/* Phone Number (Registration only) */}
        {mode === 'register' && (
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData?.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
            error={errors?.phoneNumber}
            required
            disabled={isLoading}
            className="touch-target"
          />
        )}

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
            className="touch-target pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-foreground transition-colors touch-target"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {/* Confirm Password (Registration only) */}
        {mode === 'register' && (
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
              disabled={isLoading}
              className="touch-target pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-foreground transition-colors touch-target"
              disabled={isLoading}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
        )}

        {/* Forgot Password Link (Login only) */}
        {mode === 'login' && (
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-body text-primary hover:text-primary/80 transition-colors touch-target"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
          iconName={mode === 'login' ? "LogIn" : "UserPlus"}
          iconPosition="left"
          className="touch-target"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>

        {/* Mode Switch */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm font-body text-muted-foreground mb-2">
            {mode === 'login' ? "Don't have an account?" :"Already have an account?"
            }
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
            disabled={isLoading}
            className="touch-target"
          >
            {mode === 'login' ? 'Create Account' : 'Sign In'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;